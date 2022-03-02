import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainParachain, SubstrateChainParachainsInfo} from 'src/generated/litentryGraphQLTypes';

export type ParachainsInfo = SubstrateChainParachainsInfo;

export type Parachain = SubstrateChainParachain;

export const PARACHAINS_OVERVIEW_QUERY = gql`
  query getParachainsOverview {
    substrateChainParachainsInfo {
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

export function useParachainsOverview() {
  const {data, ...rest} = useQuery<{
    substrateChainParachainsInfo: ParachainsInfo;
    substrateChainParachains: Parachain[];
  }>(PARACHAINS_OVERVIEW_QUERY);
  return {
    parachainsInfo: data?.substrateChainParachainsInfo,
    parachains: data?.substrateChainParachains,
    ...rest,
  };
}
