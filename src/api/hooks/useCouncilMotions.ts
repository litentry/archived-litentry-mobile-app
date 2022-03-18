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
      proposal {
        index
        meta
        method
        section
        args {
          name
          type
          value
          subCalls {
            meta
            method
            section
            args {
              name
              type
              value
              subCalls {
                meta
                method
                section
              }
            }
          }
        }
        hash
        proposer {
          address
          account {
            ...AccountFields
          }
        }
        beneficiary {
          address
          account {
            ...AccountFields
          }
        }
        payout
      }
      votes {
        threshold
        ayes {
          address
          account {
            ...AccountFields
          }
        }
        nays {
          address
          account {
            ...AccountFields
          }
        }
        end
        endTime
      }
      votingStatus {
        hasFailed
        hasPassed
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
