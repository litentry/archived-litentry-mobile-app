import {gql, NetworkStatus, useQuery} from '@apollo/client';
import {
  SubstrateChainDemocracyProposal,
  SubstrateChainDemocracyProposalStatus,
  SubstrateChainDemocracyProposalOrderByInput,
} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type DemocracyProposal = SubstrateChainDemocracyProposal;
export const DemocracyProposalOrderByInput = SubstrateChainDemocracyProposalOrderByInput;

export const PROPOSALS_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getDemocracyProposals(
    $status: [SubstrateChainDemocracyProposalStatus!]
    $limit: Int
    $offset: Int
    $orderBy: SubstrateChainDemocracyProposalOrderByInput
  ) {
    substrateChainDemocracyProposals(status: $status, limit: $limit, offset: $offset, orderBy: $orderBy) {
      id
      proposer {
        ...AccountFields
      }
      blockNumber
      depositAmount
      formattedDepositAmount
      title
      proposalHash
      proposalIndex
      status
      tabledAtBlock
      date
      updatedAt
    }
  }
`;

type PROPOSAL_STATUS = keyof typeof SubstrateChainDemocracyProposalStatus;

type ProposalsQueryParams = {
  status?: PROPOSAL_STATUS[];
  limit?: number;
  offset?: number;
  orderBy?: typeof DemocracyProposalOrderByInput[keyof typeof DemocracyProposalOrderByInput];
};

export function useDemocracyProposals(queryParams?: ProposalsQueryParams) {
  const status = queryParams?.status ?? ['Cancelled', 'Proposed', 'Tabled'];
  const limit = queryParams?.limit ?? 20;
  const offset = queryParams?.offset ?? 0;
  const orderBy = queryParams?.orderBy ?? DemocracyProposalOrderByInput.DateDesc;

  const proposalStatus = status.map((st) => SubstrateChainDemocracyProposalStatus[st]);
  const {data, networkStatus, ...rest} = useQuery<{
    substrateChainDemocracyProposals: SubstrateChainDemocracyProposal[];
  }>(PROPOSALS_QUERY, {
    variables: {status: proposalStatus, limit, offset, orderBy},
    notifyOnNetworkStatusChange: true,
  });

  return {
    data: data?.substrateChainDemocracyProposals,
    refetching: networkStatus === NetworkStatus.refetch,
    fetchingMore: networkStatus === NetworkStatus.fetchMore,
    ...rest,
  };
}
