import {ApiPromise} from '@polkadot/api';
import {BountyStatus, AccountId, BlockNumber} from '@polkadot/types/interfaces';

import useApiQuery from 'src/api/hooks/useApiQuery';

export type StatusName = 'Active' | 'Approved' | 'CuratorProposed' | 'Funded' | 'PendingPayout' | 'Proposed';

export interface BountyStatusInfo {
  beneficiary: AccountId | undefined;
  status: StatusName;
  curator: AccountId | undefined;
  unlockAt: BlockNumber | undefined;
  updateDue: BlockNumber | undefined;
}

export function useBounties() {
  return useApiQuery('bounties', async (api: ApiPromise) => {
    const deriveBounties = await api.derive.bounties.bounties();
    const bounties = deriveBounties
      .sort((a, b) => b.index.cmp(a.index))
      .map(({bounty, description, index, proposals}) => ({
        index,
        bounty,
        bountyStatus: getBountyStatus(bounty.status),
        description,
        proposals,
      }));

    return bounties;
  });
}

const getBountyStatus = (status: BountyStatus): BountyStatusInfo => {
  const statusAsString = status.type as StatusName;

  let result: BountyStatusInfo = {
    beneficiary: undefined,
    status: statusAsString,
    curator: undefined,
    unlockAt: undefined,
    updateDue: undefined,
  };

  if (status.isCuratorProposed) {
    result = {
      ...result,
      status: 'CuratorProposed',
      curator: status.asCuratorProposed.curator,
    };
  }

  if (status.isActive) {
    result = {
      ...result,
      curator: status.asActive.curator,
      updateDue: status.asActive.updateDue,
    };
  }

  if (status.isPendingPayout) {
    result = {
      ...result,
      beneficiary: status.asPendingPayout.beneficiary,
      status: 'PendingPayout',
      curator: status.asPendingPayout.curator,
      unlockAt: status.asPendingPayout.unlockAt,
    };
  }

  return result;
};
