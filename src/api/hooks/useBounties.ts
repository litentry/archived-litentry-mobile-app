import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainBounty} from 'src/generated/litentryGraphQLTypes';

export type Bounty = SubstrateChainBounty;

export const ACCOUNT_FIELDS = gql`
  fragment AccountFields on SubstrateChainAccount {
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
    substrateChainBounties {
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
  const {data, ...rest} = useQuery<{substrateChainBounties: Bounty[]}>(BOUNTIES_QUERY);

  return {
    data: data?.substrateChainBounties,
    ...rest,
  };
}
