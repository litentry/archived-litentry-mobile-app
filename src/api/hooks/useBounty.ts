import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainBounty} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS} from './useBounties';

export type Bounty = SubstrateChainBounty;

const BOUNTY_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getBounty($index: String!) {
    substrateChainBounty(index: $index) {
      index
      description
      formattedFee
      formattedCuratorDeposit
      formattedValue
      formattedBond
      proposer {
        address
        account {
          ...AccountFields
        }
      }
      bountyStatus {
        beneficiary {
          address
          account {
            ...AccountFields
          }
        }
        status
        curator {
          address
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

export function useBounty(index: string) {
  const {data, ...rest} = useQuery<{substrateChainBounty: Bounty}>(BOUNTY_QUERY, {
    variables: {index},
  });

  return {
    data: data?.substrateChainBounty,
    ...rest,
  };
}
