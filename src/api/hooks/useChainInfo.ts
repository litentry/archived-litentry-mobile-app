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
      registry {
        decimals
        token
      }
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
