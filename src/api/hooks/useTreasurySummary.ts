import {AccountId} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {u8aConcat, BN_MILLION} from '@polkadot/util';

const EMPTY_U8A_32 = new Uint8Array(32);

export function useTreasurySummary() {
  return useApiQuery(['treasury_summary'], async (api) => {
    const proposals = await api.derive.treasury.proposals();

    const treasuryAccount = u8aConcat(
      'modl',
      api.consts.treasury && api.consts.treasury.palletId ? api.consts.treasury.palletId.toU8a(true) : 'py/trsry',
      EMPTY_U8A_32,
    ).subarray(0, 32) as AccountId;

    const treasuryBalance = await api.derive.balances.account(treasuryAccount);

    const burn =
      treasuryBalance?.freeBalance.gtn(0) && !api.consts.treasury.burn.isZero()
        ? api.consts.treasury.burn.mul(treasuryBalance?.freeBalance).div(BN_MILLION)
        : null;

    return {
      activeProposals: proposals.proposals.length,
      proposalCount: proposals.proposalCount,
      approvedProposals: proposals.approvals.length,
      spendPeriod: api.consts.treasury.spendPeriod,
      treasuryBalance,
      burn,
    };
  });
}
