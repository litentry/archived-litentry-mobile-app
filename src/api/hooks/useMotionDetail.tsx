import {gql, useQuery} from '@apollo/client';
import {ACCOUNT_FIELDS_FRAGMENT} from './useAccount';
import type {CouncilMotion} from './useCouncilMotions';

const COUNCIL_MOTION_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getSubstrateChainCouncilMotionDetail($hash: String!) {
    substrateChainCouncilMotionDetail(hash: $hash) {
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
            }
          }
        }
        hash
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
export function useMotionDetail({hash}: {hash: string}) {
  const {data, ...rest} = useQuery<{substrateChainCouncilMotionDetail: CouncilMotion}>(COUNCIL_MOTION_QUERY, {
    variables: {hash},
  });
  return {
    data: data?.substrateChainCouncilMotionDetail,
    ...rest,
  };
}
