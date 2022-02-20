import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainDemocracyReferendum} from 'src/generated/litentryGraphQLTypes';

export type DemocracyReferendum = SubstrateChainDemocracyReferendum;

export const DEMOCRACY_REFERENDUMS_QUERY = gql`
  query getDemocracyReferendums {
    substrateChainDemocracyReferendums {
      index
      meta
      method
      section
      hash
      endPeriod
      activatePeriod
      votedAye
      formattedVotedAye
      votedNay
      formattedVotedNay
      voteCountAye
      voteCountNay
      ayePercent
      args {
        name
        type
        value
      }
    }
  }
`;

export function useDemocracyReferendums() {
  const {data, ...rest} =
    useQuery<{substrateChainDemocracyReferendums: DemocracyReferendum[]}>(DEMOCRACY_REFERENDUMS_QUERY);

  return {
    data: data?.substrateChainDemocracyReferendums,
    ...rest,
  };
}
