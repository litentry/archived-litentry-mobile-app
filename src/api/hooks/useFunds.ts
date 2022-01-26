import {ApiPromise} from '@polkadot/api';
import type {Option, StorageKey} from '@polkadot/types';
import type {
  AccountId,
  BalanceOf,
  BlockNumber,
  FundInfo,
  HrmpChannel,
  HrmpChannelId,
  ParaId,
} from '@polkadot/types/interfaces';
import type {ITuple} from '@polkadot/types/types';
import {BN, stringToU8a, u8aConcat} from '@polkadot/util';
import {encodeAddress} from '@polkadot/util-crypto';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {useBestNumber} from 'src/api/hooks/useBestNumber';

export const CROWD_PREFIX = stringToU8a('modlpy/cfund');

export type ChannelMap = Record<string, [HrmpChannelId, HrmpChannel][]>;

export function useFunds() {
  const bestNumber = useBestNumber();

  return useApiQuery(
    ['parachain_crowdloan_funds'],
    async (api) => {
      const paraIdKeys = await api.query.crowdloan?.funds?.keys<[ParaId]>();
      const paraIds = paraIdKeys ? extractFundIds(paraIdKeys) : [];

      if (bestNumber) {
        return await getFunds(paraIds, bestNumber, api);
      }
    },
    {enabled: !!bestNumber},
  );
}

export function useCrowdloanFundByParaId(key: ParaId) {
  const bestNumber = useBestNumber();

  return useApiQuery(
    ['parachain_crowdloan_funds', key],
    async (api) => {
      if (bestNumber) {
        const campaigns = await getFunds([key], bestNumber, api);
        return campaigns?.funds?.[0];
      }
    },
    {enabled: !!bestNumber},
  );
}

async function getFunds(paraIds: ParaId[], bestNumber: BlockNumber, api: ApiPromise): Promise<Campaigns | undefined> {
  const [rawFunds, rawLeases]: [
    Option<FundInfo>[] | undefined,
    Array<Option<ITuple<[AccountId, BalanceOf]>>>[] | undefined,
  ] = await Promise.all([
    api.query.crowdloan?.funds?.multi<Option<FundInfo>>(paraIds),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.query.slots?.leases?.multi<any>(paraIds),
  ]);

  const funds = rawFunds ? optFundMulti.transform(paraIds, rawFunds, api.runtimeChain.toString()) : [];
  const leases = optLeaseMulti.transform(paraIds, rawLeases ?? []);

  const minContribution = api?.consts.crowdloan?.minContribution as BlockNumber;

  if (bestNumber && funds && leases) {
    return createResult(bestNumber, minContribution, funds, leases);
  }
}

function extractFundIds(keys: StorageKey<[ParaId]>[]): ParaId[] {
  return keys.map(({args: [paraId]}) => paraId);
}

const EMPTY_U8A = new Uint8Array(32);
function createAddress(paraId: ParaId): Uint8Array {
  return u8aConcat(CROWD_PREFIX, paraId.toU8a(), EMPTY_U8A).subarray(0, 32);
}

const optFundMulti = {
  transform: (paraIds: ParaId[], optFunds: Option<FundInfo>[], network: string): Campaign[] =>
    paraIds
      .map((paraId, i): [ParaId, FundInfo | null] => [paraId, optFunds?.[i]?.unwrapOr(null) ?? null])
      .filter((v): v is [ParaId, FundInfo] => !!v[1])
      .map(([paraId, info]): Campaign => {
        const key = paraId.toString();
        const isLitentryParachain = network === 'Polkadot' && key === '2013';
        const isLitmusParachain = network === 'Kusama' && key === '2106';
        return {
          accountId: encodeAddress(createAddress(paraId)),
          firstSlot: info.firstPeriod,
          info,
          isCrowdloan: true,
          key,
          lastSlot: info.lastPeriod,
          paraId,
          value: info.raised,
          isSpecial: isLitentryParachain || isLitmusParachain,
        };
      })
      .sort((a, b) => {
        if (a.isSpecial || b.isSpecial) {
          return a.isSpecial && b.isSpecial ? 0 : b.isSpecial ? 1 : -1;
        }

        return (
          a.info.end.cmp(b.info.end) ||
          a.info.firstPeriod.cmp(b.info.firstPeriod) ||
          a.info.lastPeriod.cmp(b.info.lastPeriod) ||
          a.paraId.cmp(b.paraId)
        );
      }),
  withParamsTransform: true,
};

function isCrowdloanAccount(paraId: ParaId, accountId: AccountId): boolean {
  return accountId.eq(createAddress(paraId));
}

const optLeaseMulti = {
  transform: (paraIds: ParaId[], leases: Option<ITuple<[AccountId, BalanceOf]>>[][]): ParaId[] =>
    paraIds.filter(
      (paraId, i) =>
        (leases[i] ?? [])
          .map((o) => o.unwrapOr(null))
          .filter((v): v is ITuple<[AccountId, BalanceOf]> => !!v)
          .filter(([accountId]) => isCrowdloanAccount(paraId, accountId)).length !== 0,
    ),
  withParamsTransform: true,
};

// compare the current campaigns against the previous, manually adding ending and calculating the new totals
function createResult(bestNumber: BlockNumber, minContribution: BN, funds: Campaign[], leased: ParaId[]): Campaigns {
  const [totalRaised, totalCap] = funds.reduce(
    ([tr, tc], {info: {cap, raised}}) => [tr.iadd(raised), tc.iadd(cap)],
    [new BN(0), new BN(0)],
  );

  return {
    funds: funds.map((c) => updateFund(bestNumber, minContribution, c, leased)).sort(sortCampaigns),
    totalCap,
    totalRaised,
  };
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

interface Campaigns {
  funds: Campaign[] | null;
  totalCap: BN;
  totalRaised: BN;
}

export interface Campaign extends WinnerData {
  info: FundInfo;
  isCapped?: boolean;
  isEnded?: boolean;
  isWinner?: boolean;
  // should be sorted on top
  isSpecial?: boolean;
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
