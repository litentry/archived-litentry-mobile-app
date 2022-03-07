import {gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainCouncilMotion,
  SubstrateChainMotionProposal,
  SubstrateChainVotingStatus,
} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from './useAccount';

export type CouncilMotion = SubstrateChainCouncilMotion;

export type MotionProposal = SubstrateChainMotionProposal;

export type VotingStatus = SubstrateChainVotingStatus;

const COUNCIL_MOTION_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getCouncilMotionSummary {
    substrateChainCouncilMotions {
      hash
      proposal {
        method
        section
        hash
        args {
          name
          type
          value
        }
      }
      votes {
        index
        threshold
        ayes {
          ...AccountFields
        }
        nays {
          ...AccountFields
        }
        end
      }
      votingStatus {
        hasPassed
        hasFailed
        isCloseable
        isVoteable
        remainingBlocks
        remainingBlocksTime
        status
      }
    }
  }
`;

export function useCouncilMotions() {
  const {data, ...rest} = useQuery<{substrateChainCouncilMotions: CouncilMotion[]}>(COUNCIL_MOTION_QUERY);
  return {
    data: data?.substrateChainCouncilMotions,
    ...rest,
  };
}
