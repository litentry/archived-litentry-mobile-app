import type {Option, StorageKey} from '@polkadot/types';
import type {
  AccountId,
  BalanceOf,
  FundInfo,
  HrmpChannel,
  HrmpChannelId,
  BlockNumber,
  ParaId,
} from '@polkadot/types/interfaces';
import type {ITuple} from '@polkadot/types/types';
import {BN_ZERO, BN, stringToU8a, u8aConcat} from '@polkadot/util';
import {encodeAddress} from '@polkadot/util-crypto';
import {useApi} from 'context/ChainApiContext';
import {useEffect, useState} from 'react';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useEventTrigger} from 'src/api/hooks/useEventTrigger';
import {useMapKeys} from 'src/api/hooks/useMapKeys';

export const CROWD_PREFIX = stringToU8a('modlpy/cfund');

export type ChannelMap = Record<string, [HrmpChannelId, HrmpChannel][]>;

const EMPTY: Campaigns = {
  activeCap: BN_ZERO,
  activeRaised: BN_ZERO,
  funds: null,
  totalCap: BN_ZERO,
  totalRaised: BN_ZERO,
};

export default function useFunds(): Campaigns {
  const {api} = useApi();
  const bestNumber = useBestNumber();
  const trigger = useEventTrigger([api?.events.crowdloan?.Created]);
  const paraIds = useMapKeys(api?.query.crowdloan?.funds, {at: trigger.blockHash, transform: extractFundIds}) ?? [];

  const {data: campaigns} = useApiQuery('campaings', async (api) => {
    const r: [[ParaId[]], Option<FundInfo>[]] | undefined = (await api.query.crowdloan?.funds?.multi(paraIds)) as any;
    if (r) {
      return optFundMulti.transform(r);
    }
    return [];
  });

  const {data: leases} = useApiQuery('leases', async (api) => {
    const r: [[ParaId[]], Option<ITuple<[AccountId, BalanceOf]>>[][]] = (await api.query.slots?.leases?.multi(
      paraIds,
    )) as any;

    if (r) {
      return optLeaseMulti.transform(r);
    }
  });
  const [result, setResult] = useState<Campaigns>(EMPTY);

  //here we manually add the actual ending status and calculate the totals
  useEffect((): void => {
    bestNumber &&
      campaigns &&
      leases &&
      setResult((prev) =>
        createResult(bestNumber, api?.consts.crowdloan?.minContribution as BlockNumber, campaigns, leases, prev),
      );
  }, [api, bestNumber, campaigns, leases]);

  return result;
}

function extractFundIds(keys: StorageKey<[ParaId]>[]): ParaId[] {
  return keys.map(({args: [paraId]}) => paraId);
}
const EMPTY_U8A = new Uint8Array(32);
function createAddress(paraId: ParaId): Uint8Array {
  return u8aConcat(CROWD_PREFIX, paraId.toU8a(), EMPTY_U8A).subarray(0, 32);
}

const optFundMulti = {
  transform: ([[paraIds], optFunds]: [[ParaId[]], Option<FundInfo>[]]): Campaign[] =>
    paraIds
      .map((paraId, i): [ParaId, FundInfo | null] => [paraId, optFunds?.[i]?.unwrapOr(null) ?? null])
      .filter((v): v is [ParaId, FundInfo] => !!v[1])
      .map(
        ([paraId, info]): Campaign => ({
          accountId: encodeAddress(createAddress(paraId)),
          firstSlot: info.firstPeriod,
          info,
          isCrowdloan: true,
          key: paraId.toString(),
          lastSlot: info.lastPeriod,
          paraId,
          value: info.raised,
        }),
      )
      .sort(
        (a, b) =>
          a.info.end.cmp(b.info.end) ||
          a.info.firstPeriod.cmp(b.info.firstPeriod) ||
          a.info.lastPeriod.cmp(b.info.lastPeriod) ||
          a.paraId.cmp(b.paraId),
      ),
  withParamsTransform: true,
};

function isCrowdloadAccount(paraId: ParaId, accountId: AccountId): boolean {
  return accountId.eq(createAddress(paraId));
}

const optLeaseMulti = {
  transform: ([[paraIds], leases]: [[ParaId[]], Option<ITuple<[AccountId, BalanceOf]>>[][]]): ParaId[] =>
    paraIds.filter(
      (paraId, i) =>
        (leases[i] ?? [])
          .map((o) => o.unwrapOr(null))
          .filter((v): v is ITuple<[AccountId, BalanceOf]> => !!v)
          .filter(([accountId]) => isCrowdloadAccount(paraId, accountId)).length !== 0,
    ),
  withParamsTransform: true,
};

// compare the current campaigns against the previous, manually adding ending and calculating the new totals
function createResult(
  bestNumber: BlockNumber,
  minContribution: BN,
  funds: Campaign[],
  leased: ParaId[],
  prev: Campaigns,
): Campaigns {
  const [activeRaised, activeCap, totalRaised, totalCap] = funds.reduce(
    ([ar, ac, tr, tc], {info: {cap, end, raised}, isWinner}) => [
      bestNumber.gt(end) || isWinner ? ar : ar.iadd(raised),
      bestNumber.gt(end) || isWinner ? ac : ac.iadd(cap),
      tr.iadd(raised),
      tc.iadd(cap),
    ],
    [new BN(0), new BN(0), new BN(0), new BN(0)],
  );
  const hasNewActiveCap = !prev.activeCap.eq(activeCap);
  const hasNewActiveRaised = !prev.activeRaised.eq(activeRaised);
  const hasNewTotalCap = !prev.totalCap.eq(totalCap);
  const hasNewTotalRaised = !prev.totalRaised.eq(totalRaised);
  const hasChanged =
    !prev.funds ||
    prev.funds.length !== funds.length ||
    hasNewActiveCap ||
    hasNewActiveRaised ||
    hasNewTotalCap ||
    hasNewTotalRaised ||
    funds.some((c) => isFundUpdated(bestNumber, minContribution, c, leased, prev));

  if (!hasChanged) {
    return prev;
  }

  return {
    activeCap: hasNewActiveCap ? activeCap : prev.activeCap,
    activeRaised: hasNewActiveRaised ? activeRaised : prev.activeRaised,
    funds: funds.map((c) => updateFund(bestNumber, minContribution, c, leased)).sort(sortCampaigns),
    totalCap: hasNewTotalCap ? totalCap : prev.totalCap,
    totalRaised: hasNewTotalRaised ? totalRaised : prev.totalRaised,
  };
}

function isFundUpdated(
  bestNumber: BlockNumber,
  minContribution: BN,
  {info: {cap, end, raised}, paraId}: Campaign,
  leased: ParaId[],
  allPrev: Campaigns,
): boolean {
  const prev = allPrev.funds?.find((p) => p.paraId.eq(paraId));

  return (
    !prev ||
    (!prev.isEnded && bestNumber.gt(end)) ||
    (!prev.isCapped && cap.sub(raised).lt(minContribution)) ||
    (!prev.isWinner && hasLease(paraId, leased))
  );
}

function hasLease(paraId: ParaId, leased: ParaId[]): boolean {
  return leased.some((l) => l.eq(paraId));
}

// map into a campaign
function updateFund(bestNumber: BN, minContribution: BN, data: Campaign, leased: ParaId[]): Campaign {
  data.isCapped = data.info.cap.sub(data.info.raised).lt(minContribution);
  data.isEnded = bestNumber.gt(data.info.end);
  data.isWinner = hasLease(data.paraId, leased);

  return data;
}

function sortCampaigns(a: Campaign, b: Campaign): number {
  return a.isWinner !== b.isWinner
    ? a.isWinner
      ? -1
      : 1
    : a.isCapped !== b.isCapped
    ? a.isCapped
      ? -1
      : 1
    : a.isEnded !== b.isEnded
    ? a.isEnded
      ? 1
      : -1
    : 0;
}
////////////////////////////////////////////////////////////////////////////////////////////

interface Campaigns {
  activeCap: BN;
  activeRaised: BN;
  funds: Campaign[] | null;
  totalCap: BN;
  totalRaised: BN;
}

export interface Campaign extends WinnerData {
  info: FundInfo;
  isCapped?: boolean;
  isEnded?: boolean;
  isWinner?: boolean;
}

export interface WinnerData {
  accountId: string;
  firstSlot: BN;
  isCrowdloan: boolean;
  key: string;
  lastSlot: BN;
  paraId: ParaId;
  value: BN;
}
