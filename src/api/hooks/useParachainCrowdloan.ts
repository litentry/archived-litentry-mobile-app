import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainCrowdloan} from 'src/generated/litentryGraphQLTypes';

const PARACHAIN_CROWDLOAN_QUERY = gql`
  query getParachainCrowdloan($paraId: String!) {
    substrateChainCrowdloan(paraId: $paraId) {
      paraId
      name
      homepage
      ending
      status
      firstPeriod
      lastPeriod
      formattedRaised
      formattedCap
      contribution {
        contribution {
          contributorsCount
        }
      }
      depositor {
        account {
          address
          display
          registration {
            displayParent
            judgements {
              index
              judgement {
                isUnknown
                isFeePaid
                isReasonable
                isKnownGood
                isOutOfDate
                isLowQuality
                isErroneous
              }
            }
          }
        }
      }
    }
  }
`;

export function useParachainCrowdloan(paraId: string) {
  const {data, ...rest} = useQuery<{substrateChainCrowdloan: SubstrateChainCrowdloan}>(PARACHAIN_CROWDLOAN_QUERY, {
    variables: {paraId},
  });

  return {
    data: data?.substrateChainCrowdloan,
    ...rest,
  };
}
