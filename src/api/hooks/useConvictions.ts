import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainConviction} from 'src/generated/litentryGraphQLTypes';

export type Conviction = SubstrateChainConviction;

const CONVICTIONS_QUERY = gql`
  query getConvictions {
    substrateChainConvictions {
      text
      value
    }
  }
`;

export function useConvictions() {
  const {data, ...rest} = useQuery<{substrateChainConvictions: Conviction[]}>(CONVICTIONS_QUERY);

  return {
    data: data?.substrateChainConvictions,
    ...rest,
  };
}
