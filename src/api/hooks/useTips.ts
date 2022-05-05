import {gql, NetworkStatus, useQuery} from '@apollo/client';
import {SubstrateChainTip, SubstrateChainTipStatus} from 'src/generated/litentryGraphQLTypes';

export type Tip = SubstrateChainTip;

export const TIPS_QUERY = gql`
  query getTips($status: [SubstrateChainTipStatus!]) {
    substrateChainTips(status: $status) {
      id
      createdAt
      who {
        address
        display
      }
      reason
      status
    }
  }
`;

type TIP_STATUS = keyof typeof SubstrateChainTipStatus;

export function useTips(status: TIP_STATUS[]) {
  const tipStatus = status.map((st) => SubstrateChainTipStatus[st]);
  const {data, networkStatus, ...rest} = useQuery<{substrateChainTips: SubstrateChainTip[]}>(TIPS_QUERY, {
    variables: {status: tipStatus},
  });

  return {
    data: data?.substrateChainTips,
    refetching: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
