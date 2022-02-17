import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainBountiesSummary} from 'src/generated/litentryGraphQLTypes';

export const BOUNTIES_SUMMARY_QUERY = gql`
  query getBountiesSummary {
    substrateChainBountiesSummary {
      activeBounties
      pastBounties
      bountyCount
      totalValue
      formattedTotalValue
      timeLeft
      progressPercent
    }
  }
`;

const oneMinute = 60 * 1000;

export function useBountiesSummary() {
  const {data, ...rest} = useQuery<{substrateChainBountiesSummary: SubstrateChainBountiesSummary}>(
    BOUNTIES_SUMMARY_QUERY,
    {
      pollInterval: oneMinute,
    },
  );

  return {
    data: data?.substrateChainBountiesSummary,
    ...rest,
  };
}
