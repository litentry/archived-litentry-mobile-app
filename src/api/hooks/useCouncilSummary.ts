import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainCouncil} from 'src/generated/litentryGraphQLTypes';

export type CouncilSummary = Omit<SubstrateChainCouncil, 'members' | 'runnersUp' | 'candidates'>;

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

export const COUNCIL_SUMMARY_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getCouncilSummary {
    substrateChainCouncil {
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

const oneMinute = 60 * 1000;

export function useCouncilSummary() {
  const {data, ...rest} = useQuery<{substrateChainCouncil: CouncilSummary}>(COUNCIL_SUMMARY_QUERY, {
    pollInterval: oneMinute,
  });

  return {
    data: data?.substrateChainCouncil,
    ...rest,
  };
}
