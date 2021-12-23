import {ApiPromise} from '@polkadot/api';
import {BountyIndex, AccountId} from '@polkadot/types/interfaces';
import type {PalletBountiesBountyStatus, PalletBountiesBounty} from '@polkadot/types/lookup';
import type {u32} from '@polkadot/types';
import {DeriveCollectiveProposal} from '@polkadot/api-derive/types';

import useApiQuery from 'src/api/hooks/useApiQuery';

export type StatusName = 'Active' | 'Approved' | 'CuratorProposed' | 'Funded' | 'PendingPayout' | 'Proposed';

export interface BountyStatusInfo {
  beneficiary: AccountId | undefined;
  status: StatusName;
  curator: AccountId | undefined;
  unlockAt: u32 | undefined;
  updateDue: u32 | undefined;
}

export type BountyData = {
  index: BountyIndex;
  bounty: PalletBountiesBounty;
  bountyStatus: BountyStatusInfo;
  description: string;
  proposals?: DeriveCollectiveProposal[];
};

export function useBounties() {
  return useApiQuery('bounties', async (api: ApiPromise) => {
    const deriveBounties = await api.derive.bounties.bounties();
    const bounties = deriveBounties.reduce((_bounties, {bounty, description, index, proposals}) => {
      const _bounty = {
        index,
        bounty,
        bountyStatus: getBountyStatus(bounty.status),
        description,
        proposals,
      };
      return {..._bounties, [index.toString()]: _bounty};
    }, {} as Record<string, BountyData>);

    return bounties;
  });
}

const getBountyStatus = (status: PalletBountiesBountyStatus): BountyStatusInfo => {
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
      updateDue: status.asActive.updateDue as unknown as u32,
    };
  }

  if (status.isPendingPayout) {
    result = {
      ...result,
      beneficiary: status.asPendingPayout.beneficiary,
      status: 'PendingPayout',
      curator: status.asPendingPayout.curator,
      unlockAt: status.asPendingPayout.unlockAt as unknown as u32,
    };
  }

  return result;
};
