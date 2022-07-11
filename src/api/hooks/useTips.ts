import {gql, NetworkStatus, useQuery} from '@apollo/client';
import {
  SubstrateChainTip,
  SubstrateChainTipStatus,
  SubstrateChainTipsOrderByInput,
} from 'src/generated/litentryGraphQLTypes';

export type Tip = SubstrateChainTip;
export const TipsOrderByInput = SubstrateChainTipsOrderByInput;

export const TIPS_QUERY = gql`
  query getTips(
    $status: [SubstrateChainTipStatus!]
    $limit: Int
    $offset: Int
    $orderBy: SubstrateChainTipsOrderByInput
  ) {
    substrateChainTips(status: $status, limit: $limit, offset: $offset, orderBy: $orderBy) {
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

type TipsQueryParams = {
  status?: TIP_STATUS[];
  limit?: number;
  offset?: number;
  orderBy?: typeof TipsOrderByInput[keyof typeof TipsOrderByInput];
};

export function useTips({
  status = ['Closed', 'Opened', 'Retracted', 'Slashed'],
  limit = 20,
  offset = 0,
  orderBy = TipsOrderByInput.CreatedAtDesc,
}: TipsQueryParams) {
  const tipStatus = status.map((st) => SubstrateChainTipStatus[st]);
  const {data, networkStatus, ...rest} = useQuery<{substrateChainTips: SubstrateChainTip[]}>(TIPS_QUERY, {
    variables: {status: tipStatus, limit, offset, orderBy},
    notifyOnNetworkStatusChange: true,
  });

  return {
    data: data?.substrateChainTips,
    refetching: networkStatus === NetworkStatus.refetch,
    fetchingMore: networkStatus === NetworkStatus.fetchMore,
    ...rest,
  };
}
