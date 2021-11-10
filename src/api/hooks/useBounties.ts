import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {BN} from '@polkadot/util';

export function useBounties() {
  return useApiQuery('bounties', async (api: ApiPromise) => {
    const bounties = await api.derive.bounties.bounties();
    const bountyIndex = await (api.query.bounties || api.query.treasury).bountyCount();

    const activeBounties = bounties.length;
    const pastBounties = bountyIndex.subn(activeBounties);
    const totalValue = (bounties || []).reduce((total, {bounty: {value}}) => total.iadd(value), new BN(0));

    return {
      bounties,
      bountyIndex,
      activeBounties,
      pastBounties,
      totalValue,
      treasurySpendPeriod: api.consts.treasury.spendPeriod,
    };
  });
}
