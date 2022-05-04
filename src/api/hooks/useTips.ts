import {gql, NetworkStatus, useQuery} from '@apollo/client';
import type {SubstrateChainTip} from 'src/generated/litentryGraphQLTypes';

export type Tip = SubstrateChainTip;

export const TIPS_QUERY = gql`
  query getTips {
    substrateChainTips {
      id
      createdAt
      who {
        address
        display
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
