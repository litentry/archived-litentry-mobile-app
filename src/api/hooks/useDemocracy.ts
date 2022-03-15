import {gql, useQuery, NetworkStatus} from '@apollo/client';
import type {
  SubstrateChainDemocracyProposal,
  SubstrateChainDemocracyReferendum,
  SubstrateChainProposalSubCall,
} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type DemocracyProposal = SubstrateChainDemocracyProposal;
export type DemocracyReferendum = SubstrateChainDemocracyReferendum;
export type ProposalSubCall = SubstrateChainProposalSubCall;

type Democracy = {
  substrateChainDemocracyProposals: DemocracyProposal[];
  substrateChainDemocracyReferendums: DemocracyReferendum[];
};

export const DEMOCRACY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getDemocracy {
    substrateChainDemocracyProposals {
      index
      balance
      formattedBalance
      meta
      method
      section
      hash
      proposer {
        address
        account {
          ...AccountFields
        }
      }
      seconds {
        address
        account {
          ...AccountFields
        }
      }
      args {
        name
        type
        value
      }
    }
    substrateChainDemocracyReferendums {
      index
      meta
      method
      section
      hash
      endPeriod
      activatePeriod
      votedAye
      formattedVotedAye
      votedNay
      formattedVotedNay
      voteCountAye
      voteCountNay
      ayePercent
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
    }
  }
`;

export function useDemocracy() {
  const {data, networkStatus, ...rest} = useQuery<Democracy>(DEMOCRACY_QUERY);

  return {
    data: {
      proposals: data?.substrateChainDemocracyProposals,
      referendums: data?.substrateChainDemocracyReferendums,
    },
    refreshing: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
