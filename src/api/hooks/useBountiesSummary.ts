import {gql, useQuery} from '@apollo/client';
import {ProxyBountiesSummary} from 'src/generated/litentryGraphQLTypes';

const BOUNTIES_SUMMARY_QUERY = gql`
  query getBountiesSummary {
    proxyBountiesSummary {
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
  const {data, ...rest} = useQuery<{proxyBountiesSummary: ProxyBountiesSummary}>(BOUNTIES_SUMMARY_QUERY, {
    pollInterval: oneMinute,
  });

  return {
    data: data?.proxyBountiesSummary,
    ...rest,
  };
}
