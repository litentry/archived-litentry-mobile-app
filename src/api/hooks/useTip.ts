import {gql, useQuery, NetworkStatus} from '@apollo/client';
import {SubstrateChainTip} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type Tip = SubstrateChainTip;

const TIP_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getTip($id: String!) {
    substrateChainTip(id: $id) {
      id
      reason
      status
      deposit
      closes
      closesTime
      createdAt
      medianTipValue
      formattedMedianTipValue
      tippersCount
      who {
        address
        display
      }
      finder {
        address
        display
      }
      tippers {
        formattedBalance
        account {
          ...AccountFields
        }
      }
    }
  }
`;

export function useTip(id: string) {
  const {data, networkStatus, ...rest} = useQuery<{substrateChainTip: SubstrateChainTip}, {id: string}>(TIP_QUERY, {
    variables: {id},
  });

  return {
    data: data?.substrateChainTip,
    refetching: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
