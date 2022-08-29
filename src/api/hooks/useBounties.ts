import {gql, useQuery} from '@apollo/client';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';
import type {SubstrateChainBounty} from 'src/generated/litentryGraphQLTypes';

export type Bounty = SubstrateChainBounty;

const BOUNTIES_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getBounties {
    substrateChainBounties {
      index
      description
      formattedFee
      formattedCuratorDeposit
      formattedValue
      formattedBond
      proposer {
        account {
          ...AccountFields
        }
      }
      bountyStatus {
        beneficiary {
          account {
            ...AccountFields
          }
        }
        status
        curator {
          account {
            ...AccountFields
          }
        }
        unlockAt
        unlockAtTime
        updateDue
        updateDueTime
      }
    }
  }
`;

export function useBounties() {
  const {data, ...rest} = useQuery<{substrateChainBounties: Bounty[]}>(BOUNTIES_QUERY);

  return {
    data: data?.substrateChainBounties,
    ...rest,
  };
}
