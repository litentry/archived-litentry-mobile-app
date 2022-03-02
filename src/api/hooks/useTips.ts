import {gql, NetworkStatus, useQuery} from '@apollo/client';
import type {SubstrateChainTip} from 'src/generated/litentryGraphQLTypes';

export type Tip = SubstrateChainTip;

const TIPS_QUERY = gql`
  query getTips {
    substrateChainTips {
      id
      who {
        account {
          address
          display
          registration {
            displayParent
            judgements {
              registrarIndex
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
      reason
    }
  }
`;

export function useTips() {
  const {data, networkStatus, ...rest} = useQuery<{substrateChainTips: SubstrateChainTip[]}>(TIPS_QUERY);

  return {
    data: data?.substrateChainTips,
    refetching: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
