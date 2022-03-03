import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainParathread} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS} from './useBounties';

export type Parathread = SubstrateChainParathread;

const PARA_THREADS = gql`
  ${ACCOUNT_FIELDS}
  query getParathread {
    substrateChainParathreads {
      id
      name
      manager {
        address
        account {
          ...AccountFields
        }
      }
      lease {
        period
        blockTime
      }
      homepage
    }
  }
`;

export function useParathreads() {
  const {data, ...rest} = useQuery<{substrateChainParathreads: Parathread[]}>(PARA_THREADS);

  return {
    data: data?.substrateChainParathreads,
    ...rest,
  };
}
