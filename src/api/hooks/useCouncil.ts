import {gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainCouncil,
  SubstrateChainNestedAccount,
  SubstrateChainCouncilMember,
} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type Council = SubstrateChainCouncil;
export type CouncilMember = SubstrateChainCouncilMember;
export type CouncilCandidate = SubstrateChainNestedAccount;

const COUNCIL_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getCouncil {
    substrateChainCouncil {
      members {
        account {
          ...AccountFields
        }
        backing
        formattedBacking
        voters
      }
      runnersUp {
        account {
          ...AccountFields
        }
        backing
        formattedBacking
        voters
      }
      candidates {
        account {
          ...AccountFields
        }
      }
      totalCandidates
      primeMember {
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
