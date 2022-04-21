import {gql, useQuery} from '@apollo/client';
import {Account, ACCOUNT_FIELDS_FRAGMENT} from './useAccount';

const ACCOUNTS_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getAccounts($addresses: [String!]!) {
    substrateChainAccounts(addresses: $addresses) {
      ...AccountFields
    }
  }
`;

export function useAccounts(addresses: string[]) {
  const {data, ...rest} = useQuery<{substrateChainAccounts: Account[]}>(ACCOUNTS_QUERY, {
    variables: {addresses},
  });

  return {
    data: data?.substrateChainAccounts,
    ...rest,
  };
}
