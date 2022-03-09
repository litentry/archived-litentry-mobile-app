import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainCouncilVote} from 'src/generated/litentryGraphQLTypes';

export type CouncilVote = SubstrateChainCouncilVote;

const COUNCIL_VOTE_QUERY = gql`
  query getCouncilVote($address: String!) {
    substrateChainCouncilVote(address: $address) {
      stake
      formattedStake
      votes {
        address
      }
    }
  }
`;

export function useCouncilVotesOf(address?: string) {
  const {data, ...rest} = useQuery<{substrateChainCouncilVote: CouncilVote}>(COUNCIL_VOTE_QUERY, {
    variables: {address},
  });

  return {
    data: data?.substrateChainCouncilVote,
    ...rest,
  };
}
