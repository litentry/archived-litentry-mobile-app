import {gql, useQuery} from '@apollo/client';
import type {ProxyBounty} from 'src/generated/litentryGraphQLTypes';

export type Bounty = ProxyBounty;

export const ACCOUNT_FIELDS = gql`
  fragment AccountFields on ProxyAccount {
    address
    display
    registration {
      display
      displayParent
      email
      image
      legal
      pgp
      riot
      twitter
      web
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

const BOUNTIES_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getBounties {
    proxyBounties {
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

export function useBounties() {
  const {data, ...rest} = useQuery<{proxyBounties: Bounty[]}>(BOUNTIES_QUERY);

  return {
    data: data?.proxyBounties,
    ...rest,
  };
}
