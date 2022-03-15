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

export enum GalaxyCredentialCampaignStatus {
  Active = 'Active',
  Deleted = 'Deleted',
  Draft = 'Draft',
  Expired = 'Expired',
  PrivateActive = 'PrivateActive',
  PublicActive = 'PublicActive',
}

export enum GalaxyCredentialChain {
  Arbitrum = 'ARBITRUM',
  ArbitrumTestnet = 'ARBITRUM_TESTNET',
  Avalanche = 'AVALANCHE',
  AvalancheTestnet = 'AVALANCHE_TESTNET',
  Bsc = 'BSC',
  BscTestnet = 'BSC_TESTNET',
  Ethereum = 'ETHEREUM',
  Fantom = 'FANTOM',
  FantomTestnet = 'FANTOM_TESTNET',
  Goerli = 'GOERLI',
  Heco = 'HECO',
  HecoTestnet = 'HECO_TESTNET',
  Kovan = 'KOVAN',
  Matic = 'MATIC',
  Mumbai = 'MUMBAI',
  Rinkeby = 'RINKEBY',
  Ropsten = 'ROPSTEN',
  Solana = 'SOLANA',
  SolanaDevnet = 'SOLANA_DEVNET',
  Xdai = 'XDAI',
}

export type GalaxyCredentialEligibleCredentials = {
  __typename?: 'GalaxyCredentialEligibleCredentials';
  list: Array<GalaxyCredentialEligibleCredentialsList>;
  totalCount: Scalars['Int'];
};

export type GalaxyCredentialEligibleCredentialsItems = {
  __typename?: 'GalaxyCredentialEligibleCredentialsItems';
  list: Array<Scalars['String']>;
};

export type GalaxyCredentialEligibleCredentialsList = {
  __typename?: 'GalaxyCredentialEligibleCredentialsList';
  description: Scalars['String'];
  id: Scalars['String'];
  itemCount: Scalars['Int'];
  items: GalaxyCredentialEligibleCredentialsItems;
  name: Scalars['String'];
};

export enum GalaxyCredentialListNftOrderBy {
  CreateTime = 'CreateTime',
}

export enum GalaxyCredentialListOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum GalaxyCredentialNftStatus {
  Alive = 'Alive',
  Burned = 'Burned',
}

export type GalaxyCredentialNfts = {
  __typename?: 'GalaxyCredentialNfts';
  list: Array<GalaxyCredentialNftsList>;
  totalCount: Scalars['Int'];
};

export type GalaxyCredentialNftsList = {
  __typename?: 'GalaxyCredentialNftsList';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  ipfsImage?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status: GalaxyCredentialNftStatus;
};

export enum GalaxyCredentialParticipationStatus {
  Failed = 'Failed',
  Generated = 'Generated',
  Pending = 'Pending',
  Queueing = 'Queueing',
  Success = 'Success',
}

export type GalaxyCredentialRecentParticipation = {
  __typename?: 'GalaxyCredentialRecentParticipation';
  list: Array<GalaxyCredentialRecentParticipationList>;
  totalCount: Scalars['Int'];
};

export type GalaxyCredentialRecentParticipationList = {
  __typename?: 'GalaxyCredentialRecentParticipationList';
  address: GalaxyCredentialRecentParticipationListAddress;
  campaign: GalaxyCredentialRecentParticipationListCampaign;
  id?: Maybe<Scalars['ID']>;
  status: GalaxyCredentialParticipationStatus;
  tx: Scalars['String'];
};

export type GalaxyCredentialRecentParticipationListAddress = {
  __typename?: 'GalaxyCredentialRecentParticipationListAddress';
  email: Scalars['String'];
  id: Scalars['String'];
  twitterUserID: Scalars['String'];
  twitterUserName: Scalars['String'];
};

export type GalaxyCredentialRecentParticipationListCampaign = {
  __typename?: 'GalaxyCredentialRecentParticipationListCampaign';
  description: Scalars['String'];
  id: Scalars['ID'];
  info: Scalars['String'];
  name: Scalars['String'];
  status: GalaxyCredentialCampaignStatus;
  thumbnail: Scalars['String'];
};

export type GalaxyCredentialUserData = {
  __typename?: 'GalaxyCredentialUserData';
  address: Scalars['String'];
  avatar: Scalars['String'];
  eligibleCredentials: GalaxyCredentialEligibleCredentials;
  email: Scalars['String'];
  hasEmail: Scalars['Boolean'];
  id: Scalars['String'];
  nfts: GalaxyCredentialNfts;
  recentParticipation: GalaxyCredentialRecentParticipation;
  username: Scalars['String'];
};

export type PoapCredentialEvent = {
  __typename?: 'PoapCredentialEvent';
  id: Scalars['String'];
};

export type PoapCredentialTokenData = {
  __typename?: 'PoapCredentialTokenData';
  id: Scalars['String'];
  tokens: Array<Maybe<PoapCredentialTokens>>;
  tokensOwned: Scalars['String'];
};

export type PoapCredentialTokens = {
  __typename?: 'PoapCredentialTokens';
  created: Scalars['String'];
  event: PoapCredentialEvent;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  GalaxyCredentialDataByAddress: GalaxyCredentialUserData;
  PoapCredentialTokensByAddress: PoapCredentialTokenData;
  substrateChainAccount?: Maybe<SubstrateChainAccount>;
  substrateChainActiveCrowdloans: Array<SubstrateChainCrowdloan>;
  substrateChainAuctionsSummary: SubstrateChainAuctionsSummary;
  substrateChainBalance: SubstrateChainBalance;
  substrateChainBounties: Array<SubstrateChainBounty>;
  substrateChainBountiesSummary: SubstrateChainBountiesSummary;
  substrateChainBounty?: Maybe<SubstrateChainBounty>;
  substrateChainCalendarEvents: Array<SubstrateChainCalendarEvent>;
  substrateChainChainInfo: SubstrateChainChainInfo;
  substrateChainConvictions?: Maybe<Array<SubstrateChainConviction>>;
  substrateChainCouncil: SubstrateChainCouncil;
  substrateChainCouncilMotionDetail?: Maybe<SubstrateChainCouncilMotion>;
  substrateChainCouncilMotions: Array<SubstrateChainCouncilMotion>;
  substrateChainCouncilVote: SubstrateChainCouncilVote;
  substrateChainCrowdloan?: Maybe<SubstrateChainCrowdloan>;
  substrateChainCrowdloanContribution: SubstrateChainCrowdloanContribution;
  substrateChainCrowdloanSummary: SubstrateChainCrowdloanSummary;
  substrateChainDemocracyProposal?: Maybe<SubstrateChainDemocracyProposal>;
  substrateChainDemocracyProposals: Array<SubstrateChainDemocracyProposal>;
  substrateChainDemocracyReferendum?: Maybe<SubstrateChainDemocracyReferendum>;
  substrateChainDemocracyReferendums: Array<SubstrateChainDemocracyReferendum>;
  substrateChainDemocracySummary: SubstrateChainDemocracySummary;
  substrateChainEndedCrowdloans: Array<SubstrateChainCrowdloan>;
  substrateChainModuleElection: SubstrateChainModuleElection;
  substrateChainParachain?: Maybe<SubstrateChainParachain>;
  substrateChainParachains?: Maybe<Array<SubstrateChainParachain>>;
  substrateChainParachainsInfo: SubstrateChainParachainsInfo;
  substrateChainParathreads: Array<SubstrateChainParathread>;
  substrateChainRegistrarsSummary: SubstrateChainRegistrarsSummary;
  substrateChainTechnicalCommitteeSummary: SubstrateChainTechnicalCommitteeSummary;
  substrateChainTip?: Maybe<SubstrateChainTip>;
  substrateChainTips?: Maybe<Array<SubstrateChainTip>>;
  substrateChainTreasury: SubstrateChainTreasury;
  substrateChainTreasurySummary: SubstrateChainTreasurySummary;
};

export type QueryGalaxyCredentialDataByAddressArgs = {
  address: Scalars['String'];
  chain: GalaxyCredentialChain;
};

export type QueryPoapCredentialTokensByAddressArgs = {
  address: Scalars['String'];
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

export type QuerySubstrateChainCouncilMotionDetailArgs = {
  hash: Scalars['String'];
};

export type QuerySubstrateChainCouncilVoteArgs = {
  address: Scalars['String'];
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
  balance: SubstrateChainAccountBalance;
  display: Scalars['String'];
  hasIdentity: Scalars['Boolean'];
  registration: SubstrateChainDeriveAccountRegistration;
  subAccounts?: Maybe<Array<SubstrateChainSubAccount>>;
};

export type SubstrateChainAccountBalance = {
  __typename?: 'SubstrateChainAccountBalance';
  formattedFree: Scalars['String'];
  formattedFreeFrozen: Scalars['String'];
  formattedReserved: Scalars['String'];
  formattedTotal: Scalars['String'];
  free: Scalars['String'];
  freeFrozen: Scalars['String'];
  reserved: Scalars['String'];
  total: Scalars['String'];
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
  firstSlot: Scalars['String'];
  isCrowdloan: Scalars['Boolean'];
  lastSlot: Scalars['String'];
  projectId: Scalars['String'];
  projectName: Scalars['String'];
};

export type SubstrateChainAuctionEndingPeriod = {
  __typename?: 'SubstrateChainAuctionEndingPeriod';
  endingIn: Array<Scalars['String']>;
  remaining: Array<Scalars['String']>;
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

export type SubstrateChainCalendarEvent = {
  __typename?: 'SubstrateChainCalendarEvent';
  blockNumber: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  via: Scalars['String'];
};

export type SubstrateChainChainInfo = {
  __typename?: 'SubstrateChainChainInfo';
  auctionsLeasePeriodSlot?: Maybe<Scalars['String']>;
  chain: Scalars['String'];
  crowdloanMinContribution?: Maybe<Scalars['String']>;
  democracyEnactmentPeriod?: Maybe<Scalars['String']>;
  democracyMinimumDeposit?: Maybe<Scalars['String']>;
  nodeName: Scalars['String'];
  nodeVersion: Scalars['String'];
  registry: SubstrateChainRegistry;
  slotsLeasePeriod?: Maybe<Scalars['String']>;
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
  proposal: SubstrateChainMotionProposal;
  votes?: Maybe<SubstrateChainMotionVotes>;
  votingStatus?: Maybe<SubstrateChainVotingStatus>;
};

export type SubstrateChainCouncilVote = {
  __typename?: 'SubstrateChainCouncilVote';
  formattedStake: Scalars['String'];
  stake: Scalars['String'];
  votes: Array<SubstrateChainVote>;
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
  homepage?: Maybe<Scalars['String']>;
  lastPeriod: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  paraId: Scalars['String'];
  raised: Scalars['String'];
  raisedPercentage: Scalars['String'];
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

export type SubstrateChainDemocracyProposal = {
  __typename?: 'SubstrateChainDemocracyProposal';
  args?: Maybe<Array<SubstrateChainProposalArg>>;
  balance?: Maybe<Scalars['String']>;
  formattedBalance?: Maybe<Scalars['String']>;
  hash: Scalars['String'];
  index: Scalars['String'];
  meta?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  proposer: SubstrateChainProposer;
  seconds: Array<SubstrateChainProposalSecond>;
  section?: Maybe<Scalars['String']>;
};

export type SubstrateChainDemocracyReferendum = {
  __typename?: 'SubstrateChainDemocracyReferendum';
  activatePeriod: Array<Scalars['String']>;
  args?: Maybe<Array<SubstrateChainProposalArg>>;
  ayePercent: Scalars['Float'];
  endPeriod: Array<Scalars['String']>;
  formattedVotedAye: Scalars['String'];
  formattedVotedNay: Scalars['String'];
  hash: Scalars['String'];
  index: Scalars['String'];
  meta?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  section?: Maybe<Scalars['String']>;
  voteCountAye: Scalars['String'];
  voteCountNay: Scalars['String'];
  votedAye: Scalars['String'];
  votedNay: Scalars['String'];
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
  blockTime: Array<Scalars['String']>;
  period?: Maybe<Scalars['String']>;
};

export type SubstrateChainLeasePeriod = {
  __typename?: 'SubstrateChainLeasePeriod';
  currentLease: Scalars['String'];
  progressPercent: Scalars['Int'];
  remainder: Scalars['String'];
  remainderBlockTime: Scalars['String'];
  totalPeriod: Scalars['String'];
};

export type SubstrateChainManager = {
  __typename?: 'SubstrateChainManager';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainModuleElection = {
  __typename?: 'SubstrateChainModuleElection';
  candidacyBond: Scalars['String'];
  formattedCandidacyBond: Scalars['String'];
  formattedVotingBondBase: Scalars['String'];
  formattedVotingBondFactor: Scalars['String'];
  hasElections: Scalars['Boolean'];
  module?: Maybe<Scalars['String']>;
  votingBondBase: Scalars['String'];
  votingBondFactor: Scalars['String'];
};

export type SubstrateChainMotionProposal = {
  __typename?: 'SubstrateChainMotionProposal';
  args: Array<SubstrateChainProposalArg>;
  beneficiary?: Maybe<SubstrateChainAccount>;
  hash: Scalars['String'];
  index?: Maybe<Scalars['String']>;
  meta: Scalars['String'];
  method: Scalars['String'];
  payout?: Maybe<Scalars['String']>;
  proposer?: Maybe<SubstrateChainAccount>;
  section: Scalars['String'];
};

export type SubstrateChainMotionVotes = {
  __typename?: 'SubstrateChainMotionVotes';
  ayes: Array<SubstrateChainAccount>;
  end: Scalars['String'];
  endTime: Array<Scalars['String']>;
  nays: Array<SubstrateChainAccount>;
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
  nonVoters: Array<SubstrateChainAccountInfo>;
  validators?: Maybe<SubstrateChainValidatorsGroup>;
};

export type SubstrateChainParachainsInfo = {
  __typename?: 'SubstrateChainParachainsInfo';
  leasePeriod: SubstrateChainLeasePeriod;
  parachainsCount: Scalars['Int'];
  parathreadsCount: Scalars['Int'];
  proposalsCount: Scalars['Int'];
};

export type SubstrateChainParathread = {
  __typename?: 'SubstrateChainParathread';
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lease?: Maybe<SubstrateChainLease>;
  manager?: Maybe<SubstrateChainManager>;
  name?: Maybe<Scalars['String']>;
};

export type SubstrateChainProposalArg = {
  __typename?: 'SubstrateChainProposalArg';
  name?: Maybe<Scalars['String']>;
  subCalls?: Maybe<Array<Maybe<SubstrateChainProposalSubCall>>>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SubstrateChainProposalSecond = {
  __typename?: 'SubstrateChainProposalSecond';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainProposalSubCall = {
  __typename?: 'SubstrateChainProposalSubCall';
  args?: Maybe<Array<Maybe<SubstrateChainProposalArg>>>;
  meta?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  section?: Maybe<Scalars['String']>;
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
  judgement?: Maybe<SubstrateChainIdentityJudgement>;
  registrarIndex?: Maybe<Scalars['Int']>;
};

export type SubstrateChainRegistry = {
  __typename?: 'SubstrateChainRegistry';
  decimals: Scalars['Int'];
  token: Scalars['String'];
};

export type SubstrateChainSpendPeriod = {
  __typename?: 'SubstrateChainSpendPeriod';
  percentage: Scalars['Int'];
  period: Scalars['String'];
  termLeft: Scalars['String'];
  termLeftParts: Array<Scalars['String']>;
};

export type SubstrateChainSubAccount = {
  __typename?: 'SubstrateChainSubAccount';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainTechnicalCommitteeSummary = {
  __typename?: 'SubstrateChainTechnicalCommitteeSummary';
  activeProposalCount: Scalars['Int'];
  memberCount: Scalars['Int'];
  members: Array<SubstrateChainAccount>;
  totalProposalCount: Scalars['String'];
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
  validators: Array<SubstrateChainAccountInfo>;
};

export type SubstrateChainVote = {
  __typename?: 'SubstrateChainVote';
  account: SubstrateChainAccount;
  address: Scalars['String'];
};

export type SubstrateChainVotingStatus = {
  __typename?: 'SubstrateChainVotingStatus';
  hasFailed: Scalars['Boolean'];
  hasPassed: Scalars['Boolean'];
  isCloseable: Scalars['Boolean'];
  isVoteable: Scalars['Boolean'];
  remainingBlocks?: Maybe<Scalars['String']>;
  remainingBlocksTime?: Maybe<Array<Scalars['String']>>;
  status: Scalars['String'];
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
