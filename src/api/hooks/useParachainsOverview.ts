import {gql, useQuery} from '@apollo/client';
import {SubstrateChainParachainsInfo} from 'src/generated/litentryGraphQLTypes';

export type ParachainsInfo = SubstrateChainParachainsInfo;

export const PARACHAINS_INFO = gql`
  query getParachainsInfo {
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
  }
`;

export function useParachainsInfo() {
  const {data, ...rest} = useQuery<{substrateChainParachainsInfo: SubstrateChainParachainsInfo[]}>(PARACHAINS_INFO);

  return {
    data: data?.substrateChainParachainsInfo,
    ...rest,
  };
}
