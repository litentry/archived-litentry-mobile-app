import {gql, useQuery, NetworkStatus} from '@apollo/client';
import {SubstrateChainDemocracyReferendum} from 'src/generated/litentryGraphQLTypes';

export type DemocracyReferendum = SubstrateChainDemocracyReferendum;

const REFERENDUM_QUERY = gql`
  query getReferendum($id: String!) {
    substrateChainDemocracyReferendum(id: $id) {
      id
      title
      description
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
      votes {
        id
        aye
        formattedAye
        nay
        formattedNay
        voter
        blockNumber
        date
      }
    }
  }
`;

export function useDemocracyReferendum(id: string) {
  const {data, networkStatus, ...rest} = useQuery<
    {substrateChainDemocracyReferendum: SubstrateChainDemocracyReferendum},
    {id: string}
  >(REFERENDUM_QUERY, {
    variables: {id},
  });

  return {
    data: data?.substrateChainDemocracyReferendum,
    refetching: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
