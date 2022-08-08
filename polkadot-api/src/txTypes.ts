import type {Hash} from '@polkadot/types/interfaces';
import {HexString} from './messages';

export type TxHash = Hash;

type BNHexString = HexString;

export type IdentityPayload = {
  display: {raw: string} | {none: null};
  legal: {raw: string} | {none: null};
  email: {raw: string} | {none: null};
  riot: {raw: string} | {none: null};
  twitter: {raw: string} | {none: null};
  web: {raw: string} | {none: null};
};

export type SubIdentityPayload = [address: string, display: {raw: string}];

type IdentitySetIdentityTx = {
  method: 'identity.setIdentity';
  params: [IdentityPayload];
};

type IdentityRequestJudgementTx = {
  method: 'identity.requestJudgement';
  params: [id: string, fee: string];
};

type IdentityClearIdentityTx = {
  method: 'identity.clearIdentity';
  params: [];
};

type IdentitySetSubsTx = {
  method: 'identity.setSubs';
  params: Array<SubIdentityPayload>;
};

type DemocracyVoteTx = {
  method: 'democracy.vote';
  params: [referendumIndex: string, vote: {balance: BNHexString; vote: {aye: boolean; conviction: number}}];
};

type DemocracySecondTx = {
  method: 'democracy.second';
  params: [proposalIndex: string, secondsCount: number] | [proposalIdex: string];
};

type DemocracyProposeTx = {
  method: 'democracy.propose';
  params: [preImageHash: string, balance: BNHexString];
};

type TipsReportAwesomeTx = {
  method: 'tips.reportAwesome';
  params: [reason: string, beneficiary: string];
};

type CrowdloanContributeTx = {
  method: 'crowdloan.contribute';
  params: [parachainId: string, balance: BNHexString, signature: string | null];
};

type CouncilVoteTx = {
  method: 'council.vote';
  params: [proposalHash: string, proposalIndex: string, vote: boolean];
};

type CouncilCloseTx = {
  method: 'council.close';
  params:
    | [proposalHash: string, proposalIndex: string]
    | [proposalHash: string, proposalIndex: string, WEIGHT_BOUND: number, LENGTH_BOUND: number];
};

type CouncilModuleElectionVoteTx = {
  method: `${string}.vote`;
  params: [selectedCandidates: string[], amount: string];
};

type CouncilModuleElectionSubmitCandidacyTx = {
  method: `${string}.submitCandidacy`;
  params: [[candidatesCount: number] | []];
};

type BountiesProposeBountyTx = {
  method: 'bounties.proposeBounty';
  params: [bountyAllocation: BNHexString, title: string];
};

type BalancesTransferTx = {
  method: 'balances.transferKeepAlive' | 'balances.transfer';
  params: [address: string, amount: BNHexString];
};

type DelegateVotingTx = {
  method: 'democracy.delegate';
  params: [toAddress: string, conviction: number, balance: BNHexString];
};

export type TxConfig =
  | IdentitySetIdentityTx
  | IdentityRequestJudgementTx
  | IdentityClearIdentityTx
  | IdentitySetSubsTx
  | DemocracyVoteTx
  | DemocracySecondTx
  | DemocracyProposeTx
  | TipsReportAwesomeTx
  | CrowdloanContributeTx
  | CouncilVoteTx
  | CouncilCloseTx
  | CouncilModuleElectionVoteTx
  | CouncilModuleElectionSubmitCandidacyTx
  | BountiesProposeBountyTx
  | BalancesTransferTx
  | DelegateVotingTx;
