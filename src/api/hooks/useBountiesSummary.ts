import useApiQuery from 'src/api/hooks/useApiQuery';
import {BN} from '@polkadot/util';

export function useBountiesSummary() {
  return useApiQuery('bounties_summary', async (api) => {
    const deriveBounties = await api.derive.bounties.bounties();
    const bountyIndex = await (api.query.bounties || api.query.treasury).bountyCount();
    const activeBounties = deriveBounties.length;
    const pastBounties = bountyIndex.subn(activeBounties);
    const totalValue = (deriveBounties || []).reduce((total, {bounty: {value}}) => total.iadd(value), new BN(0));

    return {
      bountyIndex,
      activeBounties,
      pastBounties,
      totalValue,
      treasurySpendPeriod: api.consts.treasury.spendPeriod,
    };
  });
}
