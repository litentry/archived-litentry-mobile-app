import {gql, useQuery} from '@apollo/client';
import {ProxyDemocracySummary} from 'src/generated/litentryGraphQLTypes';

export type DemocracySummary = ProxyDemocracySummary;

const DEMOCRACY_SUMMARY_QUERY = gql`
  query getDemocracySummary {
    proxyDemocracySummary {
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
  const {data, ...rest} = useQuery<{proxyDemocracySummary: DemocracySummary}>(DEMOCRACY_SUMMARY_QUERY);

  return {
    data: data?.proxyDemocracySummary,
    ...rest,
  };
}
