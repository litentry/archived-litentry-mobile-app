import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import type {SubstrateChainParachain} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type Parachain = SubstrateChainParachain;

const PARACHAIN_INFO = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
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
          account {
            ...AccountFields
          }
        }
      }
      nonVoters {
        account {
          ...AccountFields
        }
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
