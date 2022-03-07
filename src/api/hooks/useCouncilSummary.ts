import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainCouncil} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type CouncilSummary = Omit<SubstrateChainCouncil, 'members' | 'runnersUp' | 'candidates'>;

export const COUNCIL_SUMMARY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getCouncilSummary {
    substrateChainCouncil {
      primeMember {
        account {
          ...AccountFields
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
