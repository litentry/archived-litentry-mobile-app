import {ApolloQueryResult, gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainCouncilMotion,
  SubstrateChainMotionProposal,
  SubstrateChainVotingStatus,
} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from './useAccount';

export type CouncilMotion = SubstrateChainCouncilMotion;
export type MotionProposal = SubstrateChainMotionProposal;
export type VotingStatus = SubstrateChainVotingStatus;

export const PROPOSAL_ARGS_FRAGMENT = gql`
  fragment ProposalArgFields on SubstrateChainProposalArg {
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
      }
    }
  }
`;

const COUNCIL_MOTION_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  ${PROPOSAL_ARGS_FRAGMENT}
  query getCouncilMotions {
    substrateChainCouncilMotions {
      proposal {
        index
        meta
        method
        section
        hash
        payout
        args {
          ...ProposalArgFields
        }
        proposer {
          account {
            ...AccountFields
          }
        }
        beneficiary {
          account {
            ...AccountFields
          }
        }
        payout
        bond
      }
      votes {
        threshold
        ayes {
          account {
            ...AccountFields
          }
        }
        nays {
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

export type MotionsQueryResult = Promise<
  ApolloQueryResult<{
    substrateChainCouncilMotions: CouncilMotion[];
  }>
>;

export function useCouncilMotions() {
  const {data, ...rest} = useQuery<{substrateChainCouncilMotions: CouncilMotion[]}>(COUNCIL_MOTION_QUERY);
  return {
    data: data?.substrateChainCouncilMotions,
    ...rest,
  };
}
