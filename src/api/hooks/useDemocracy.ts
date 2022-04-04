import {gql, useQuery, NetworkStatus} from '@apollo/client';
import type {
  SubstrateChainDemocracyProposal,
  SubstrateChainDemocracyReferendum,
  SubstrateChainProposalSubCall,
  SubstrateChainProposalArg,
} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type ProposalSubCall = SubstrateChainProposalSubCall;
export type ProposalArg = SubstrateChainProposalArg;
export type DemocracyProposal = SubstrateChainDemocracyProposal;
export type DemocracyReferendum = SubstrateChainDemocracyReferendum;

type Democracy = {
  substrateChainDemocracyProposals: SubstrateChainDemocracyProposal[];
  substrateChainDemocracyReferendums: SubstrateChainDemocracyReferendum[];
};

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

export const DEMOCRACY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  ${PROPOSAL_ARGS_FRAGMENT}
  query getDemocracy {
    substrateChainDemocracyProposals {
      index
      balance
      formattedBalance
      seconds {
        account {
          ...AccountFields
        }
      }
      meta
      method
      section
      hash
      proposer {
        account {
          ...AccountFields
        }
      }
      args {
        ...ProposalArgFields
      }
    }
    substrateChainDemocracyReferendums {
      index
      meta
      method
      section
      hash
      imageHash
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
        ...ProposalArgFields
      }
    }
  }
`;

export function useDemocracy() {
  const {data, networkStatus, loading, ...rest} = useQuery<Democracy>(DEMOCRACY_QUERY);

  return {
    data: {
      proposals: data?.substrateChainDemocracyProposals,
      referendums: data?.substrateChainDemocracyReferendums,
    },
    loading: loading && !data?.substrateChainDemocracyProposals && !data?.substrateChainDemocracyReferendums,
    refreshing: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
