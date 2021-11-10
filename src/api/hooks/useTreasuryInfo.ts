import {AccountId} from '@polkadot/types/interfaces';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {getAccountsIdentityInfo} from 'src/api/queryFunctions/getAccountsIdentityInfo';

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

    return {
      proposals: proposals.proposals,
      approvals: proposals.approvals,
      accountInfos: accountInfos,
    };
  });
}
