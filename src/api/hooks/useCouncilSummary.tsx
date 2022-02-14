import {gql, useQuery} from '@apollo/client';
import {ProxyCouncil} from 'src/generated/litentryGraphQLTypes';

export type CouncilSummary = Omit<ProxyCouncil, 'members' | 'runnersUp' | 'candidates'>;

export const COUNCIL_SUMMARY_QUERY = gql`
  query getCouncilSummary {
    proxyCouncil {
      primeMember {
        account {
          address
          display
          registration {
            displayParent
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
  const {data, ...rest} = useQuery<{proxyCouncil: CouncilSummary}>(COUNCIL_SUMMARY_QUERY, {pollInterval: oneMinute});

  return {
    data: data?.proxyCouncil,
    ...rest,
  };
}
