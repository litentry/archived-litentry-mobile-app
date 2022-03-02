import {gql, useQuery, NetworkStatus} from '@apollo/client';
import type {SubstrateChainTreasury} from 'src/generated/litentryGraphQLTypes';

const ACCOUNT_FIELDS = gql`
  fragment AccountFields on SubstrateChainAccount {
    address
    display
    registration {
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
`;

const TREASURY_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getTreasury {
    substrateChainTreasury {
      approvals {
        id
        proposal {
          value
          proposer {
            ...AccountFields
          }
          beneficiary {
            ...AccountFields
          }
          bond
        }
      }
      proposals {
        id
        proposal {
          value
          proposer {
            ...AccountFields
          }
          beneficiary {
            ...AccountFields
          }
          bond
        }
      }
    }
  }
`;

export function useTreasury() {
  const {data, networkStatus, ...rest} = useQuery<{substrateChainTreasury: SubstrateChainTreasury}>(TREASURY_QUERY);

  return {
    data: data?.substrateChainTreasury,
    refetching: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
