import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainCouncil} from 'src/generated/litentryGraphQLTypes';

export type CouncilSummary = Omit<SubstrateChainCouncil, 'members' | 'runnersUp' | 'candidates'>;

export const COUNCIL_SUMMARY_QUERY = gql`
  query getCouncilSummary {
    substrateChainCouncil {
      primeMember {
        account {
          address
          display
          registration {
            displayParent
            judgements {
              registrarIndex
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
      }
      desiredSeats
      totalMembers
      totalRunnersUp
      totalCandidates
      desiredRunnersUp
      termProgress {
        termDurationParts
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
