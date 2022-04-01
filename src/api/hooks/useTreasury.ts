import {gql, useQuery, NetworkStatus} from '@apollo/client';
import {SubstrateChainTreasuryProposals, SubstrateChainTreasuryProposal} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type TreasuryProposal = SubstrateChainTreasuryProposal;

const TREASURY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getTreasury {
    substrateChainTreasuryProposals {
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
  const {data, networkStatus, ...rest} =
    useQuery<{substrateChainTreasuryProposals: SubstrateChainTreasuryProposals}>(TREASURY_QUERY);

  return {
    data: data?.substrateChainTreasuryProposals,
    refetching: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
