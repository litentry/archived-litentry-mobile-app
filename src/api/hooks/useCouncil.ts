import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainCouncil, SubstrateChainCouncilMember} from 'src/generated/litentryGraphQLTypes';

export type Council = SubstrateChainCouncil;
export type CouncilMember = SubstrateChainCouncilMember;

const COUNCIL_QUERY = gql`
  query getCouncil {
    substrateChainCouncil {
      members {
        account {
          address
          display
        }
        backing
        formattedBacking
        voters
      }
      runnersUp {
        account {
          address
          display
        }
        backing
        formattedBacking
        voters
      }
      candidates {
        account {
          address
          display
        }
        backing
        formattedBacking
        voters
      }
      totalCandidates
      primeMember {
        account {
          address
          display
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
