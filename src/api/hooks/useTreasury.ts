import {gql, useQuery, NetworkStatus} from '@apollo/client';
import type {SubstrateChainTreasury, SubstrateChainProposal} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type TreasuryProposal = SubstrateChainProposal;

const TREASURY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getTreasury {
    substrateChainTreasury {
      approvals {
        proposal {
          index
          proposer {
            account {
              ...AccountFields
            }
          }
          value
          beneficiary {
            account {
              ...AccountFields
            }
          }
          bond
        }
      }
      proposals {
        proposal {
          index
          proposer {
            account {
              ...AccountFields
            }
          }
          value
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
