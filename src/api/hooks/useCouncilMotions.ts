import {gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainCouncilMotion,
  SubstrateChainMotionProposal,
  SubstrateChainVotingStatus,
} from 'src/generated/litentryGraphQLTypes';

export type CouncilMotion = SubstrateChainCouncilMotion;

export type MotionProposal = SubstrateChainMotionProposal;

export type VotingStatus = SubstrateChainVotingStatus;

const COUNCIL_MOTION_QUERY = gql`
  query getCouncilMotionSummary {
    substrateChainCouncilMotions {
      hash
      proposal {
        method
        section
        args {
          name
          type
          value
        }
        hash
      }
      votes {
        index
        threshold
        ayes {
          address
          display
        }
        nays {
          address
          display
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
  console.log(data);
  return {
    data: data?.substrateChainCouncilMotions,
    ...rest,
  };
}
