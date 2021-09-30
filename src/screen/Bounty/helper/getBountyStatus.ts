import {AccountId, BlockNumber} from '@polkadot/types/interfaces/runtime';
import {BountyStatus} from '@polkadot/types/interfaces';

export type StatusName = 'Active' | 'Approved' | 'CuratorProposed' | 'Funded' | 'PendingPayout' | 'Proposed';

export interface BountyStatusInfo {
  beneficiary: AccountId | undefined;
  status: StatusName;
  curator: AccountId | undefined;
  unlockAt: BlockNumber | undefined;
  updateDue: BlockNumber | undefined;
}

export const getBountyStatus = (status: BountyStatus): BountyStatusInfo => {
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
