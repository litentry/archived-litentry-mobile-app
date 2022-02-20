import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainDemocracyProposal} from 'src/generated/litentryGraphQLTypes';

export type DemocracyProposal = SubstrateChainDemocracyProposal;

export const ACCOUNT_FIELDS = gql`
  fragment AccountFields on SubstrateChainAccount {
    address
    display
    registration {
      display
      displayParent
      email
      image
      legal
      pgp
      riot
      twitter
      web
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

export const DEMOCRACY_PROPOSALS_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getDemocracyProposals {
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
  }
`;

export function useDemocracyProposals() {
  const {data, ...rest} = useQuery<{substrateChainDemocracyProposals: DemocracyProposal[]}>(DEMOCRACY_PROPOSALS_QUERY);

  return {
    data: data?.substrateChainDemocracyProposals,
    ...rest,
  };
}
