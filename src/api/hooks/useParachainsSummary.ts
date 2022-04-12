import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainParachain, SubstrateChainParachainsSummary} from 'src/generated/litentryGraphQLTypes';

export type ParachainsSummary = SubstrateChainParachainsSummary;
export type Parachain = SubstrateChainParachain;

export const PARACHAINS_SUMMARY_QUERY = gql`
  query getParachainsSummary {
    substrateChainParachainsSummary {
      parachainsCount
      parathreadsCount
      proposalsCount
      leasePeriod {
        currentLease
        totalPeriod
        progressPercent
        remainder
      }
    }
    substrateChainParachains {
      id
      name
      lease {
        period
        blockTime
      }
    }
  }
`;

export function useParachainsSummary() {
  const {data, ...rest} = useQuery<{
    substrateChainParachainsSummary: ParachainsSummary;
    substrateChainParachains: Parachain[];
  }>(PARACHAINS_SUMMARY_QUERY);
  return {
    parachainsSummary: data?.substrateChainParachainsSummary,
    parachains: data?.substrateChainParachains,
    ...rest,
  };
}
