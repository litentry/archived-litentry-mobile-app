import {gql, useQuery} from '@apollo/client';
import {SubstrateChainCrowdloan, SubstrateChainCrowdloanSummary} from 'src/generated/litentryGraphQLTypes';

export type Crowdloan = SubstrateChainCrowdloan;

const CROWDLOAN_QUERY = gql`
  query getCrowdloan {
    substrateChainCrowdloanSummary {
      formattedActiveRaised
      formattedActiveCap
      formattedTotalRaised
      formattedTotalCap
      activeProgress
      totalProgress
      totalFunds
    }
    substrateChainActiveCrowdloans {
      paraId
      name
      formattedRaised
      formattedCap
      homepage
      raisedPercentage
    }
    substrateChainEndedCrowdloans {
      paraId
      name
      formattedRaised
      formattedCap
      homepage
      raisedPercentage
    }
  }
`;

type Result = {
  substrateChainCrowdloanSummary: SubstrateChainCrowdloanSummary;
  substrateChainActiveCrowdloans: Crowdloan[];
  substrateChainEndedCrowdloans: Crowdloan[];
};

export function useCrowdloans() {
  const {data, ...rest} = useQuery<Result>(CROWDLOAN_QUERY);

  return {
    data: {
      summary: data?.substrateChainCrowdloanSummary,
      active: data?.substrateChainActiveCrowdloans,
      ended: data?.substrateChainEndedCrowdloans,
    },
    ...rest,
  };
}
