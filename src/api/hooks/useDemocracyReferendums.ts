import {gql, NetworkStatus, useQuery} from '@apollo/client';
import {
  SubstrateChainDemocracyReferendum,
  SubstrateChainDemocracyReferendumStatus,
  SubstrateChainDemocracyReferendumOrderByInput,
} from 'src/generated/litentryGraphQLTypes';

export type DemocracyReferendum = SubstrateChainDemocracyReferendum;
export const DemocracyReferendumOrderByInput = SubstrateChainDemocracyReferendumOrderByInput;

export const REFERENDUMS_QUERY = gql`
  query getDemocracyReferendums(
    $status: [SubstrateChainDemocracyReferendumStatus!]
    $limit: Int
    $offset: Int
    $orderBy: SubstrateChainDemocracyReferendumOrderByInput
  ) {
    substrateChainDemocracyReferendums(status: $status, limit: $limit, offset: $offset, orderBy: $orderBy) {
      id
      title
      date
      aye
      formattedAye
      nay
      formattedNay
      status
      blockNumber
      updatedAt
      voteThreshold
      ayePercent
    }
  }
`;

type REFERENDUM_STATUS = keyof typeof SubstrateChainDemocracyReferendumStatus;

type ReferendumsQueryParams = {
  status?: REFERENDUM_STATUS[];
  limit?: number;
  offset?: number;
  orderBy?: typeof DemocracyReferendumOrderByInput[keyof typeof DemocracyReferendumOrderByInput];
};

export function useDemocracyReferendums(queryParams?: ReferendumsQueryParams) {
  const status = queryParams?.status ?? ['Cancelled', 'Executed', 'NotPassed', 'Passed', 'Started'];
  const limit = queryParams?.limit ?? 20;
  const offset = queryParams?.offset ?? 0;
  const orderBy = queryParams?.orderBy ?? DemocracyReferendumOrderByInput.DateDesc;

  const referendumStatus = status.map((st) => SubstrateChainDemocracyReferendumStatus[st]);
  const {data, networkStatus, ...rest} = useQuery<{
    substrateChainDemocracyReferendums: SubstrateChainDemocracyReferendum[];
  }>(REFERENDUMS_QUERY, {
    variables: {status: referendumStatus, limit, offset, orderBy},
    notifyOnNetworkStatusChange: true,
  });

  return {
    data: data?.substrateChainDemocracyReferendums,
    refetching: networkStatus === NetworkStatus.refetch,
    fetchingMore: networkStatus === NetworkStatus.fetchMore,
    ...rest,
  };
}
