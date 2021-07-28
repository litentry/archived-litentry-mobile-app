import {AccountId} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {getAccountsIdentityInfo} from 'src/api/queryFunctions/getAccountsIdentityInfo';
import {u8aConcat, BN_MILLION} from '@polkadot/util';

const EMPTY_U8A_32 = new Uint8Array(32);

export function useTreasuryInfo() {
  return useApiQuery(['treasury_info'], async (api) => {
    const proposals = await api.derive.treasury.proposals();
    const accountIds: AccountId[] = [];

    for (const p of proposals.proposals) {
      if (!accountIds.includes(p.proposal.proposer)) {
        accountIds.push(p.proposal.proposer);
      }
    }
    for (const p of proposals.approvals) {
      if (!accountIds.includes(p.proposal.proposer)) {
        accountIds.push(p.proposal.proposer);
      }
    }

    const accountInfos = await getAccountsIdentityInfo(api, accountIds);

    const treasuryAccount = u8aConcat(
      'modl',
      api.consts.treasury && api.consts.treasury.palletId ? api.consts.treasury.palletId.toU8a(true) : 'py/trsry',
      EMPTY_U8A_32,
    ).subarray(0, 32) as AccountId;

    const treasuryBalance = await api.derive.balances.account(treasuryAccount);

    const burn =
      treasuryBalance?.freeBalance.gtn(0) && !api?.consts.treasury.burn.isZero()
        ? api?.consts.treasury.burn.mul(treasuryBalance?.freeBalance).div(BN_MILLION)
        : null;

    return {
      proposals: proposals,
      accountInfos: accountInfos,
      spendPeriod: api.consts.treasury.spendPeriod,
      treasuryBalance,
      burn,
    };
  });
}
