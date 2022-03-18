import {gql, useQuery} from '@apollo/client';
import {SubstrateChainTechnicalCommitteeSummary} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from './useAccount';
export type TechnicalCommitteeSummary = SubstrateChainTechnicalCommitteeSummary;

export const TECHNICAL_COMMITTEE_SUMMARY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getTechnicalCommitteeSummary {
    substrateChainTechnicalCommitteeSummary {
      memberCount
      activeProposalCount
      totalProposalCount
      members {
        address
        account {
          ...AccountFields
        }
      }
    }
  }
`;

export function useTechnicalCommitteeSummary() {
  const {data, ...rest} = useQuery<{substrateChainTechnicalCommitteeSummary: TechnicalCommitteeSummary}>(
    TECHNICAL_COMMITTEE_SUMMARY_QUERY,
  );

  return {
    data: data?.substrateChainTechnicalCommitteeSummary,
    ...rest,
  };
}
