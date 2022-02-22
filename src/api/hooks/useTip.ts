import {gql, useQuery, NetworkStatus} from '@apollo/client';
import {SubstrateChainTip} from 'src/generated/litentryGraphQLTypes';

export type Tip = SubstrateChainTip;

const ACCOUNT_FIELDS = gql`
  fragment AccountFields on SubstrateChainAccount {
    address
    display
    registration {
      display
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
`;

const TIP_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getTip($id: String!) {
    substrateChainTip(id: $id) {
      id
      reason
      deposit
      closes
      median
      formattedMedian
      tippersCount
      who {
        account {
          ...AccountFields
        }
      }
      finder {
        account {
          ...AccountFields
        }
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
