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

export function useBountiesSummary() {
  const {data, ...rest} = useQuery<{proxyBountiesSummary: ProxyBountiesSummary}>(BOUNTIES_SUMMARY_QUERY);

  return {
    data: data?.proxyBountiesSummary,
    ...rest,
  };
}
