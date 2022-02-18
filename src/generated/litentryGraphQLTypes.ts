import {gql} from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  substrateChainAccount?: Maybe<SubstrateChainAccount>;
  substrateChainActiveCrowdloans: Array<SubstrateChainCrowdloan>;
  substrateChainAuctionsSummary: SubstrateChainAuctionsSummary;
  substrateChainBalance: SubstrateChainBalance;
  substrateChainBounties: Array<SubstrateChainBounty>;
  substrateChainBountiesSummary: SubstrateChainBountiesSummary;
  substrateChainBounty?: Maybe<SubstrateChainBounty>;
  substrateChainChainInfo: SubstrateChainChainInfo;
  substrateChainConvictions?: Maybe<Array<SubstrateChainConviction>>;
  substrateChainCouncil: SubstrateChainCouncil;
  substrateChainCouncilMotions: Array<SubstrateChainCouncilMotion>;
  substrateChainCrowdloan?: Maybe<SubstrateChainCrowdloan>;
  substrateChainCrowdloanContribution: SubstrateChainCrowdloanContribution;
  substrateChainCrowdloanSummary: SubstrateChainCrowdloanSummary;
  substrateChainDemocracyProposal?: Maybe<SubstrateChainProposal>;
  substrateChainDemocracyProposals: Array<SubstrateChainProposal>;
  substrateChainDemocracyReferendum?: Maybe<SubstrateChainReferendum>;
  substrateChainDemocracyReferendums: Array<SubstrateChainReferendum>;
  substrateChainDemocracySummary: SubstrateChainDemocracySummary;
  substrateChainEndedCrowdloans: Array<SubstrateChainCrowdloan>;
  substrateChainEvents: Array<SubstrateChainEvent>;
  substrateChainModuleElection: SubstrateChainModuleElection;
  substrateChainParachain?: Maybe<SubstrateChainParachain>;
  substrateChainParachains?: Maybe<Array<SubstrateChainParachain>>;
  substrateChainParachainsInfo: SubstrateChainParachainsInfo;
  substrateChainRegistrarsSummary: SubstrateChainRegistrarsSummary;
  substrateChainTip?: Maybe<SubstrateChainTip>;
  substrateChainTips?: Maybe<Array<SubstrateChainTip>>;
  substrateChainTreasury: SubstrateChainTreasury;
  substrateChainTreasurySummary: SubstrateChainTreasurySummary;
};

export type QuerySubstrateChainAccountArgs = {
  address: Scalars['String'];
};

export type QuerySubstrateChainBalanceArgs = {
  address: Scalars['String'];
  blockNumber?: InputMaybe<Scalars['Int']>;
};

export type QuerySubstrateChainBountyArgs = {
  index: Scalars['String'];
};

export type QuerySubstrateChainCrowdloanArgs = {
  paraId: Scalars['String'];
};

export type QuerySubstrateChainCrowdloanContributionArgs = {
  paraId: Scalars['String'];
};

export type QuerySubstrateChainDemocracyProposalArgs = {
  index: Scalars['String'];
};

export type QuerySubstrateChainDemocracyReferendumArgs = {
  index: Scalars['String'];
};

export type QuerySubstrateChainParachainArgs = {
  id: Scalars['String'];
};

export type QuerySubstrateChainTipArgs = {
  id: Scalars['String'];
};

export type SubstrateChainAccount = {
  __typename?: 'SubstrateChainAccount';
  address: Scalars['String'];
  display: Scalars['String'];
  registration: SubstrateChainDeriveAccountRegistration;
};

export type SubstrateChainAccountInfo = {
  __typename?: 'SubstrateChainAccountInfo';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainAuction = {
  __typename?: 'SubstrateChainAuction';
  endingPeriod?: Maybe<SubstrateChainAuctionEndingPeriod>;
  leasePeriod?: Maybe<SubstrateChainAuctionLeasePeriod>;
  raised: Scalars['String'];
  raisedPercent: Scalars['Float'];
  winningBid?: Maybe<SubstrateChainAuctionBid>;
};

export type SubstrateChainAuctionBid = {
  __typename?: 'SubstrateChainAuctionBid';
  amount: Scalars['String'];
  blockNumber: Scalars['String'];
  projectId: Scalars['String'];
  projectName: Scalars['String'];
};

export type SubstrateChainAuctionEndingPeriod = {
  __typename?: 'SubstrateChainAuctionEndingPeriod';
  endingIn: Scalars['String'];
  remaining: Scalars['String'];
  remainingPercent: Scalars['Float'];
};

export type SubstrateChainAuctionLeasePeriod = {
  __typename?: 'SubstrateChainAuctionLeasePeriod';
  first: Scalars['String'];
  last: Scalars['String'];
};

export type SubstrateChainAuctionsInfo = {
  __typename?: 'SubstrateChainAuctionsInfo';
  active: Scalars['Boolean'];
  numAuctions: Scalars['String'];
};

export type SubstrateChainAuctionsSummary = {
  __typename?: 'SubstrateChainAuctionsSummary';
  auctionsInfo: SubstrateChainAuctionsInfo;
  latestAuction: SubstrateChainAuction;
};

export type SubstrateChainBalance = {
  __typename?: 'SubstrateChainBalance';
  consumers: Scalars['Int'];
  data: SubstrateChainBalanceData;
  nonce: Scalars['Int'];
  providers: Scalars['Int'];
  sufficients: Scalars['Int'];
};

export type SubstrateChainBalanceData = {
  __typename?: 'SubstrateChainBalanceData';
  feeFrozen: Scalars['Float'];
  free: Scalars['Float'];
  miscFrozen: Scalars['Float'];
  reserved: Scalars['Float'];
};

export type SubstrateChainBeneficiary = {
  __typename?: 'SubstrateChainBeneficiary';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainBountiesSummary = {
  __typename?: 'SubstrateChainBountiesSummary';
  activeBounties: Scalars['String'];
  bountyCount: Scalars['String'];
  formattedTotalValue: Scalars['String'];
  pastBounties: Scalars['String'];
  progressPercent: Scalars['Int'];
  timeLeft: Array<Scalars['String']>;
  totalValue: Scalars['String'];
};

export type SubstrateChainBounty = {
  __typename?: 'SubstrateChainBounty';
  bond: Scalars['String'];
  bountyStatus: SubstrateChainBountyStatus;
  curatorDeposit: Scalars['String'];
  description: Scalars['String'];
  fee: Scalars['String'];
  formattedBond: Scalars['String'];
  formattedCuratorDeposit: Scalars['String'];
  formattedFee: Scalars['String'];
  formattedValue: Scalars['String'];
  index: Scalars['String'];
  proposer: SubstrateChainProposer;
  value: Scalars['String'];
};

export type SubstrateChainBountyStatus = {
  __typename?: 'SubstrateChainBountyStatus';
  beneficiary?: Maybe<SubstrateChainBeneficiary>;
  curator?: Maybe<SubstrateChainCurator>;
  status?: Maybe<Scalars['String']>;
  unlockAt?: Maybe<Scalars['String']>;
  unlockAtTime?: Maybe<Array<Scalars['String']>>;
  updateDue?: Maybe<Scalars['String']>;
  updateDueTime?: Maybe<Array<Scalars['String']>>;
};

export type SubstrateChainChainInfo = {
  __typename?: 'SubstrateChainChainInfo';
  chain: Scalars['String'];
  nodeName: Scalars['String'];
  nodeVersion: Scalars['String'];
};

export type SubstrateChainCollectiveProposal = {
  __typename?: 'SubstrateChainCollectiveProposal';
  callIndex: Scalars['String'];
  hash: Scalars['String'];
  votes: SubstrateChainProposalVotes;
};

export type SubstrateChainContribution = {
  __typename?: 'SubstrateChainContribution';
  contribution: SubstrateChainCrowdloanContribution;
  paraId: Scalars['String'];
};

export type SubstrateChainConviction = {
  __typename?: 'SubstrateChainConviction';
  text: Scalars['String'];
  value: Scalars['Int'];
};

export type SubstrateChainCouncil = {
  __typename?: 'SubstrateChainCouncil';
  candidates: Array<SubstrateChainCouncilCandidate>;
  desiredRunnersUp: Scalars['Int'];
  desiredSeats: Scalars['Int'];
  members: Array<SubstrateChainCouncilMember>;
  primeMember?: Maybe<SubstrateChainCouncilMember>;
  runnersUp: Array<SubstrateChainCouncilMember>;
  termProgress: SubstrateChainTermProgress;
  totalCandidates: Scalars['Int'];
  totalMembers: Scalars['Int'];
  totalRunnersUp: Scalars['Int'];
};

export type SubstrateChainCouncilCandidate = {
  __typename?: 'SubstrateChainCouncilCandidate';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainCouncilMember = {
  __typename?: 'SubstrateChainCouncilMember';
  account: SubstrateChainAccount;
  address: Scalars['String'];
  backing: Scalars['String'];
  formattedBacking: Scalars['String'];
  voters: Array<Scalars['String']>;
};

export type SubstrateChainCouncilMotion = {
  __typename?: 'SubstrateChainCouncilMotion';
  hash: Scalars['String'];
  proposal: SubstrateChainMotionProposal;
  votes?: Maybe<SubstrateChainMotionVotes>;
};

export type SubstrateChainCrowdloan = {
  __typename?: 'SubstrateChainCrowdloan';
  cap: Scalars['String'];
  contribution: SubstrateChainContribution;
  depositor: SubstrateChainDepositor;
  ending: Array<Scalars['String']>;
  firstPeriod: Scalars['String'];
  formattedCap: Scalars['String'];
  formattedRaised: Scalars['String'];
  lastPeriod: Scalars['String'];
  paraId: Scalars['String'];
  raised: Scalars['String'];
  status: Scalars['String'];
};

export type SubstrateChainCrowdloanContribution = {
  __typename?: 'SubstrateChainCrowdloanContribution';
  contributorsCount: Scalars['String'];
  paraId: Scalars['String'];
};

export type SubstrateChainCrowdloanSummary = {
  __typename?: 'SubstrateChainCrowdloanSummary';
  activeCap: Scalars['String'];
  activeProgress: Scalars['Float'];
  activeRaised: Scalars['String'];
  formattedActiveCap: Scalars['String'];
  formattedActiveRaised: Scalars['String'];
  formattedTotalCap: Scalars['String'];
  formattedTotalRaised: Scalars['String'];
  totalCap: Scalars['String'];
  totalFunds: Scalars['Int'];
  totalProgress: Scalars['Float'];
  totalRaised: Scalars['String'];
};

export type SubstrateChainCurator = {
  __typename?: 'SubstrateChainCurator';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainDemocracySummary = {
  __typename?: 'SubstrateChainDemocracySummary';
  activeProposals: Scalars['Int'];
  activeReferendums: Scalars['Int'];
  launchPeriodInfo?: Maybe<SubstrateChainLaunchPeriodInfo>;
  proposals: Scalars['String'];
  referendums: Scalars['String'];
};

export type SubstrateChainDepositor = {
  __typename?: 'SubstrateChainDepositor';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainDeriveAccountRegistration = {
  __typename?: 'SubstrateChainDeriveAccountRegistration';
  display?: Maybe<Scalars['String']>;
  displayParent?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  judgements?: Maybe<Array<Maybe<SubstrateChainRegistrationJudgement>>>;
  legal?: Maybe<Scalars['String']>;
  pgp?: Maybe<Scalars['String']>;
  riot?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

export type SubstrateChainEvent = {
  __typename?: 'SubstrateChainEvent';
  blockNumber: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type SubstrateChainFinder = {
  __typename?: 'SubstrateChainFinder';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainIdentityJudgement = {
  __typename?: 'SubstrateChainIdentityJudgement';
  isErroneous?: Maybe<Scalars['Boolean']>;
  isFeePaid?: Maybe<Scalars['Boolean']>;
  isKnownGood?: Maybe<Scalars['Boolean']>;
  isLowQuality?: Maybe<Scalars['Boolean']>;
  isOutOfDate?: Maybe<Scalars['Boolean']>;
  isReasonable?: Maybe<Scalars['Boolean']>;
  isUnknown?: Maybe<Scalars['Boolean']>;
};

export type SubstrateChainLaunchPeriodInfo = {
  __typename?: 'SubstrateChainLaunchPeriodInfo';
  progressPercent: Scalars['Int'];
  timeLeft: Scalars['String'];
  timeLeftParts: Array<Scalars['String']>;
};

export type SubstrateChainLease = {
  __typename?: 'SubstrateChainLease';
  blockTime?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
};

export type SubstrateChainLeasePeriod = {
  __typename?: 'SubstrateChainLeasePeriod';
  currentLease: Scalars['String'];
  progressPercent: Scalars['Int'];
  remainder: Scalars['String'];
  totalPeriod: Scalars['String'];
};

export type SubstrateChainModuleElection = {
  __typename?: 'SubstrateChainModuleElection';
  hasElections: Scalars['Boolean'];
  module?: Maybe<Scalars['String']>;
};

export type SubstrateChainMotionProposal = {
  __typename?: 'SubstrateChainMotionProposal';
  args: Array<SubstrateChainProposalArg>;
  hash: Scalars['String'];
  method: Scalars['String'];
  section: Scalars['String'];
};

export type SubstrateChainMotionVotes = {
  __typename?: 'SubstrateChainMotionVotes';
  ayes: Array<Scalars['String']>;
  end: Scalars['String'];
  index: Scalars['Int'];
  nays: Array<Scalars['String']>;
  threshold: Scalars['Int'];
};

export type SubstrateChainPalletProposal = {
  __typename?: 'SubstrateChainPalletProposal';
  beneficiary: SubstrateChainAccount;
  bond: Scalars['String'];
  proposer: SubstrateChainAccount;
  value: Scalars['String'];
};

export type SubstrateChainParachain = {
  __typename?: 'SubstrateChainParachain';
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastBackedBlock: Scalars['String'];
  lastIncludedBlock: Scalars['String'];
  lease?: Maybe<SubstrateChainLease>;
  lifecycle: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nonVoters?: Maybe<Array<SubstrateChainAccountInfo>>;
  validators?: Maybe<SubstrateChainValidatorsGroup>;
};

export type SubstrateChainParachainsInfo = {
  __typename?: 'SubstrateChainParachainsInfo';
  leasePeriod: SubstrateChainLeasePeriod;
  parachainsCount: Scalars['Int'];
  parathreadsCount: Scalars['Int'];
  proposalsCount: Scalars['Int'];
};

export type SubstrateChainProposal = {
  __typename?: 'SubstrateChainProposal';
  args: Array<SubstrateChainProposalArg>;
  balance?: Maybe<Scalars['String']>;
  hash: Scalars['String'];
  index: Scalars['String'];
  meta: Scalars['String'];
  method: Scalars['String'];
  proposer: SubstrateChainProposer;
  seconds: Array<SubstrateChainProposalSecond>;
  section: Scalars['String'];
};

export type SubstrateChainProposalArg = {
  __typename?: 'SubstrateChainProposalArg';
  name?: Maybe<Scalars['String']>;
  subCalls?: Maybe<Array<Maybe<SubstrateChainProposal>>>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SubstrateChainProposalSecond = {
  __typename?: 'SubstrateChainProposalSecond';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainProposalVotes = {
  __typename?: 'SubstrateChainProposalVotes';
  ayes?: Maybe<Array<Scalars['String']>>;
  end?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['String']>;
  nays?: Maybe<Array<Scalars['String']>>;
  threshold?: Maybe<Scalars['String']>;
};

export type SubstrateChainProposer = {
  __typename?: 'SubstrateChainProposer';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainReferendum = {
  __typename?: 'SubstrateChainReferendum';
  activatePeriod: Array<Scalars['String']>;
  args: Array<SubstrateChainProposalArg>;
  endPeriod: Array<Scalars['String']>;
  hash: Scalars['String'];
  index: Scalars['String'];
  meta: Scalars['String'];
  method: Scalars['String'];
  section: Scalars['String'];
  voteCountAye: Scalars['String'];
  voteCountNay: Scalars['String'];
  votedAye: Scalars['String'];
  votedNay: Scalars['String'];
};

export type SubstrateChainRegistrar = {
  __typename?: 'SubstrateChainRegistrar';
  account: SubstrateChainAccount;
  address: Scalars['String'];
  fee: Scalars['String'];
  formattedFee: Scalars['String'];
  /** id: Registrar index */
  id: Scalars['String'];
};

export type SubstrateChainRegistrarsSummary = {
  __typename?: 'SubstrateChainRegistrarsSummary';
  formattedHighestFee: Scalars['String'];
  formattedLowestFee: Scalars['String'];
  highestFee: Scalars['String'];
  list: Array<SubstrateChainRegistrar>;
  lowestFee: Scalars['String'];
  registrarsCount: Scalars['Int'];
};

export type SubstrateChainRegistrationJudgement = {
  __typename?: 'SubstrateChainRegistrationJudgement';
  index?: Maybe<Scalars['Int']>;
  judgement?: Maybe<SubstrateChainIdentityJudgement>;
};

export type SubstrateChainSpendPeriod = {
  __typename?: 'SubstrateChainSpendPeriod';
  percentage: Scalars['Int'];
  period: Scalars['String'];
  termLeft: Scalars['String'];
  termLeftParts: Array<Scalars['String']>;
};

export type SubstrateChainTermProgress = {
  __typename?: 'SubstrateChainTermProgress';
  percentage: Scalars['Int'];
  termDuration: Scalars['String'];
  termDurationParts: Array<Scalars['String']>;
  termLeft: Scalars['String'];
  termLeftParts?: Maybe<Array<Scalars['String']>>;
};

export type SubstrateChainTip = {
  __typename?: 'SubstrateChainTip';
  closes?: Maybe<Scalars['String']>;
  deposit?: Maybe<Scalars['String']>;
  finder?: Maybe<SubstrateChainFinder>;
  formattedMedian?: Maybe<Scalars['String']>;
  /** id: Tip Hash */
  id: Scalars['String'];
  median?: Maybe<Scalars['String']>;
  reason: Scalars['String'];
  tippers: Array<SubstrateChainTipper>;
  tippersCount: Scalars['Int'];
  who: SubstrateChainWho;
};

export type SubstrateChainTipper = {
  __typename?: 'SubstrateChainTipper';
  account: SubstrateChainAccount;
  address: Scalars['String'];
  balance: Scalars['String'];
  formattedBalance: Scalars['String'];
};

export type SubstrateChainTreasury = {
  __typename?: 'SubstrateChainTreasury';
  approvals: Array<SubstrateChainTreasuryProposal>;
  proposals: Array<SubstrateChainTreasuryProposal>;
};

export type SubstrateChainTreasuryBalance = {
  __typename?: 'SubstrateChainTreasuryBalance';
  accountId: Scalars['String'];
  accountNonce: Scalars['String'];
  freeBalance: Scalars['String'];
  frozenFee: Scalars['String'];
  frozenMisc: Scalars['String'];
  reservedBalance: Scalars['String'];
  votingBalance: Scalars['String'];
};

export type SubstrateChainTreasuryProposal = {
  __typename?: 'SubstrateChainTreasuryProposal';
  councils: Array<SubstrateChainCollectiveProposal>;
  id: Scalars['String'];
  proposal: SubstrateChainPalletProposal;
};

export type SubstrateChainTreasurySummary = {
  __typename?: 'SubstrateChainTreasurySummary';
  activeProposals: Scalars['Int'];
  approvedProposals: Scalars['Int'];
  nextBurn: Scalars['String'];
  spendPeriod: SubstrateChainSpendPeriod;
  totalProposals: Scalars['Int'];
  treasuryBalance: SubstrateChainTreasuryBalance;
};

export type SubstrateChainValidatorsGroup = {
  __typename?: 'SubstrateChainValidatorsGroup';
  groupIndex?: Maybe<Scalars['String']>;
  validators?: Maybe<Array<SubstrateChainAccountInfo>>;
};

export type SubstrateChainWho = {
  __typename?: 'SubstrateChainWho';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
