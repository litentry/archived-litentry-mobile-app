import {gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainCouncil,
  SubstrateChainCouncilCandidate,
  SubstrateChainCouncilMember,
} from 'src/generated/litentryGraphQLTypes';

export type Council = SubstrateChainCouncil;
export type CouncilMember = SubstrateChainCouncilMember;
export type CouncilCandidate = SubstrateChainCouncilCandidate;

const ACCOUNT_FIELDS = gql`
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

const COUNCIL_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getCouncil {
    substrateChainCouncil {
      members {
        address
        account {
          ...AccountFields
        }
        backing
        formattedBacking
        voters
      }
      runnersUp {
        address
        account {
          ...AccountFields
        }
        backing
        formattedBacking
        voters
      }
      candidates {
        address
        account {
          ...AccountFields
        }
      }
      totalCandidates
      primeMember {
        address
        account {
          ...AccountFields
        }
        backing
        formattedBacking
        voters
      }
      desiredSeats
      totalMembers
      desiredRunnersUp
      totalRunnersUp
      termProgress {
        termDuration
        termDurationParts
        termLeft
        termLeftParts
        percentage
      }
    }
  }
`;

export function useCouncil() {
  const {data, ...rest} = useQuery<{substrateChainCouncil: SubstrateChainCouncil}>(COUNCIL_QUERY);

  return {
    data: data?.substrateChainCouncil,
    ...rest,
  };
}
