import {gql, useQuery, NetworkStatus} from '@apollo/client';
import type {SubstrateChainTreasury} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

const TREASURY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getTreasury {
    substrateChainTreasury {
      approvals {
        id
        proposal {
          value
          proposer {
            account {
              ...AccountFields
            }
          }
          beneficiary {
            account {
              ...AccountFields
            }
          }
          bond
        }
      }
      proposals {
        id
        proposal {
          value
          proposer {
            account {
              ...AccountFields
            }
          }
          beneficiary {
            account {
              ...AccountFields
            }
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
