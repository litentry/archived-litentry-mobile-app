import {gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainCouncilMotion,
  SubstrateChainMotionProposal,
  SubstrateChainVotingStatus,
} from 'src/generated/litentryGraphQLTypes';

export type CouncilMotion = SubstrateChainCouncilMotion;

export type MotionProposal = SubstrateChainMotionProposal;

export type VotingStatus = SubstrateChainVotingStatus;

const ACCOUNT_FIELDS = gql`
  fragment AccountFields on SubstrateChainAccount {
    address
    display
    registration {
      display
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
`;

const COUNCIL_MOTION_QUERY = gql`
  ${ACCOUNT_FIELDS}
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
          subCalls {
            proposer {
              ...AccountFields
            }
          }
        }
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
