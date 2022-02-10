import {gql, useQuery} from '@apollo/client';
import {ProxyBounty} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS} from './useBounties';

export type Bounty = ProxyBounty;

const BOUNTY_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getBounty($index: String!) {
    proxyBounty(index: $index) {
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
  const {data, ...rest} = useQuery<{proxyBounty: Bounty}>(BOUNTY_QUERY, {
    variables: {index},
  });

  return {
    data: data?.proxyBounty,
    ...rest,
  };
}
