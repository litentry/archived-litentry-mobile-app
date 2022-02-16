import {gql, useQuery} from '@apollo/client';
import {SubstrateChainDemocracySummary} from 'src/generated/litentryGraphQLTypes';

export type DemocracySummary = SubstrateChainDemocracySummary;

export const DEMOCRACY_SUMMARY_QUERY = gql`
  query getDemocracySummary {
    substrateChainDemocracySummary {
      activeProposals
      proposals
      referendums
      activeReferendums
      launchPeriodInfo {
        progressPercent
        timeLeft
        timeLeftParts
      }
    }
  }
`;

export function useDemocracySummary() {
  const {data, ...rest} = useQuery<{substrateChainDemocracySummary: DemocracySummary}>(DEMOCRACY_SUMMARY_QUERY);

  return {
    data: data?.substrateChainDemocracySummary,
    ...rest,
  };
}
