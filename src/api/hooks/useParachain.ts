import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import type {SubstrateChainParachain} from 'src/generated/litentryGraphQLTypes';

export type Parachain = SubstrateChainParachain;

const PARACHAIN_INFO = gql`
  query getParaChainById($id: String!) {
    substrateChainParachain(id: $id) {
      id
      name
      lease {
        period
        blockTime
      }
      lifecycle
      lastIncludedBlock
      lastBackedBlock
      homepage
      validators {
        groupIndex
        validators {
          address
          display
        }
      }
      nonVoters {
        address
        display
      }
    }
  }
`;

export function useParaChain(id: string) {
  const {data, ...rest} = useQuery<{substrateChainParachain: Parachain}>(PARACHAIN_INFO, {
    variables: {id},
  });
  return {
    data: data?.substrateChainParachain,
    ...rest,
  };
}
