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
      launchPeriod {
        progressPercent
        timeLeft
        timeLeftParts
      }
    }
  }
`;

const oneMinute = 60 * 1000;

export function useDemocracySummary() {
  const {data, ...rest} = useQuery<{substrateChainDemocracySummary: DemocracySummary}>(DEMOCRACY_SUMMARY_QUERY, {
    pollInterval: oneMinute,
  });

  return {
    data: data?.substrateChainDemocracySummary,
    ...rest,
  };
}
