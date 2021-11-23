// Copyright 2017-2021 @polkadot/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type {Option, StorageKey} from '@polkadot/types';
import type {AuctionIndex, BlockNumber, LeasePeriodOf, ParaId, WinningData} from '@polkadot/types/interfaces';
import {BN_ZERO, stringToU8a, u8aEq} from '@polkadot/util';
import BN from 'bn.js';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {useLeaseRanges} from './useLeaseRanges';

const CROWD_PREFIX = stringToU8a('modlpy/cfund');

function isNewWinners(a: WinnerData[], b: WinnerData[]): boolean {
  return JSON.stringify({w: a}) !== JSON.stringify({w: b});
}

function extractWinners(
  ranges: [number, number][],
  auctionInfo: AuctionInfo,
  optData: Option<WinningData>,
): WinnerData[] {
  return optData.isNone
    ? []
    : optData.unwrap().reduce<WinnerData[]>((winners, optEntry, index): WinnerData[] => {
        if (optEntry.isSome) {
          const [accountId, paraId, value] = optEntry.unwrap();
          const period = auctionInfo.leasePeriod || BN_ZERO;
          const [first, last] = ranges[index] ?? [0, 0];

          winners.push({
            accountId: accountId.toString(),
            firstSlot: period.addn(first),
            isCrowdloan: u8aEq(CROWD_PREFIX, accountId.subarray(0, CROWD_PREFIX.length)),
            key: paraId.toString(),
            lastSlot: period.addn(last),
            paraId,
            value,
          });
        }

        return winners;
      }, []);
}

function createWinning({endBlock}: AuctionInfo, blockOffset: BN | null | undefined, winners: WinnerData[]): Winning {
  return {
    blockNumber: endBlock && blockOffset ? blockOffset.add(endBlock) : blockOffset || BN_ZERO,
    blockOffset: blockOffset || BN_ZERO,
    total: winners.reduce((total, {value}) => total.iadd(value), new BN(0)),
    winners,
  };
}

function extractData(
  ranges: [number, number][],
  auctionInfo: AuctionInfo,
  values: [StorageKey<[BlockNumber]>, Option<WinningData>][],
): Winning[] {
  return values
    .sort(
      (
        [
          {
            args: [a],
          },
        ],
        [
          {
            args: [b],
          },
        ],
      ) => a.cmp(b),
    )
    .reduce(
      (
        all: Winning[],
        [
          {
            args: [blockOffset],
          },
          optData,
        ],
      ): Winning[] => {
        const winners = extractWinners(ranges, auctionInfo, optData);

        winners.length &&
          (all.length === 0 || isNewWinners(winners, all[all.length - 1]?.winners ?? [])) &&
          all.push(createWinning(auctionInfo, blockOffset, winners));

        return all;
      },
      [],
    )
    .reverse();
}

export function useWinningData(auctionInfo?: AuctionInfo) {
  const {data: ranges} = useLeaseRanges();

  return useApiQuery(
    'winning_data',
    async (api) => {
      const initialEntries: [StorageKey<[BlockNumber]>, Option<WinningData>][] | undefined =
        await api.query.auctions?.winning?.entries();

      if (initialEntries) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return extractData(ranges!, auctionInfo!, initialEntries);
      }
    },
    {enabled: Boolean(ranges) && Boolean(auctionInfo)},
  );
}

interface AuctionInfo {
  endBlock: BlockNumber | null;
  leasePeriod: LeasePeriodOf | null;
  numAuctions?: AuctionIndex;
}

interface WinnerData {
  accountId: string;
  firstSlot: BN;
  isCrowdloan: boolean;
  key: string;
  lastSlot: BN;
  paraId: ParaId;
  value: BN;
}

interface Winning {
  blockNumber: BN;
  blockOffset: BN;
  total: BN;
  winners: WinnerData[];
}
