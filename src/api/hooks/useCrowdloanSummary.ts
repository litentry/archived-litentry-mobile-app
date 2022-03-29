import {gql, useQuery} from '@apollo/client';
import {SubstrateChainCrowdloanSummary} from 'src/generated/litentryGraphQLTypes';

type CrowdloanSummary = SubstrateChainCrowdloanSummary;

const CROWDLOAN_SUMMARY_QUERY = gql`
  query getCrowdloan {
    substrateChainCrowdloanSummary {
      activeRaised
      activeCap
      totalRaised
      totalCap
      activeProgress
      totalProgress
      totalFunds
    }
  }
`;

export function useCrowdloanSummary() {
  const {data, ...rest} = useQuery<{substrateChainCrowdloanSummary: CrowdloanSummary}>(CROWDLOAN_SUMMARY_QUERY);

  return {
    data: data?.substrateChainCrowdloanSummary,
    ...rest,
  };
}
