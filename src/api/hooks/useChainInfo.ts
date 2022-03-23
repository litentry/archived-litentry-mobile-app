import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainChainInfo, SubstrateChainRegistry} from 'src/generated/litentryGraphQLTypes';

export type ChainInfo = SubstrateChainChainInfo;
export type Registry = SubstrateChainRegistry;

const CHAIN_INFO_QUERY = gql`
  query getChainInfo {
    substrateChainChainInfo {
      chain
      nodeName
      nodeVersion
      democracyEnactmentPeriod
      crowdloanMinContribution
      auctionsLeasePeriodSlot
      democracyMinimumDeposit
      slotsLeasePeriod
      registry {
        decimals
        token
      }
      formattedExistentialDeposit
    }
  }
`;

export function useChainInfo() {
  const {data, ...rest} = useQuery<{substrateChainChainInfo: ChainInfo}>(CHAIN_INFO_QUERY);

  return {
    data: data?.substrateChainChainInfo,
    ...rest,
  };
}
