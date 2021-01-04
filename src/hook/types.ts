// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {SubmittableExtrinsic} from '@polkadot/api/promise/types';
import type {
  DeriveAccountFlags,
  DeriveAccountRegistration,
} from '@polkadot/api-derive/types';
import type {
  AccountId,
  Balance,
  BlockNumber,
  Exposure,
  Hash,
  RewardDestination,
  SessionIndex,
  StakingLedger,
  ValidatorPrefs,
} from '@polkadot/types/interfaces';

export type CallParam = any;

export type CallParams = [] | CallParam[];

export interface CallOptions<T> {
  defaultValue?: T;
  isSingle?: boolean;
  paramMap?: (params: any) => CallParams;
  transform?: (value: any) => T;
  withParams?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface Inflation {
  inflation: number;
  stakedReturn: number;
}

export interface Slash {
  accountId: AccountId;
  amount: Balance;
}

export interface SessionRewards {
  blockHash: Hash;
  blockNumber: BlockNumber;
  isEventsEmpty: boolean;
  reward: Balance;
  sessionIndex: SessionIndex;
  slashes: Slash[];
}

export interface ExtrinsicAndSenders {
  extrinsic: SubmittableExtrinsic | null;
  isSubmittable: boolean;
  sendTx: () => void;
  sendUnsigned: () => void;
}

export interface UseSudo {
  allAccounts: string[];
  sudoKey?: string;
  isMine: boolean;
}

export interface AddressFlags extends DeriveAccountFlags {
  isDevelopment: boolean;
  isEditable: boolean;
  isExternal: boolean;
  isFavorite: boolean;
  isHardware: boolean;
  isInContacts: boolean;
  isInjected: boolean;
  isMultisig: boolean;
  isProxied: boolean;
  isOwned: boolean;
}

export interface AddressIdentity extends DeriveAccountRegistration {
  isGood: boolean;
  isBad: boolean;
  isKnownGood: boolean;
  isReasonable: boolean;
  isErroneous: boolean;
  isLowQuality: boolean;
  isExistent: boolean;
  waitCount: number;
}

export interface StakerState {
  controllerId: string | null;
  destination?: RewardDestination;
  exposure?: Exposure;
  hexSessionIdNext: string | null;
  hexSessionIdQueue: string | null;
  isLoading: boolean;
  isOwnController: boolean;
  isOwnStash: boolean;
  isStashNominating: boolean;
  isStashValidating: boolean;
  nominating?: string[];
  sessionIds: string[];
  stakingLedger?: StakingLedger;
  stashId: string;
  validatorPrefs?: ValidatorPrefs;
}
