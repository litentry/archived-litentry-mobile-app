import {gql, useQuery} from '@apollo/client';
import {ProxyTreasurySummary} from 'src/generated/litentryGraphQLTypes';

const TREASURY_SUMMARY_QUERY = gql`
  query getTreasurySummary {
    proxyTreasurySummary {
      activeProposals
      totalProposals
      approvedProposals
      spendPeriod {
        percentage
        termLeft
        period
        termLeftParts
      }
      treasuryBalance {
        freeBalance
      }
      nextBurn
    }
  }
`;
const oneMinute = 60 * 1000;

export function useTreasurySummary() {
  const {data, ...rest} = useQuery<{proxyTreasurySummary: ProxyTreasurySummary}>(TREASURY_SUMMARY_QUERY, {
    pollInterval: oneMinute,
  });

  return {
    data: data?.proxyTreasurySummary,
    ...rest,
  };
}
