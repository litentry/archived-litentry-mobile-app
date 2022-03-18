import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainAccount, SubstrateChainNestedAccount} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type SubAccount = SubstrateChainNestedAccount;

const SUB_ACCOUNTS_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getAccount($address: String!) {
    substrateChainAccount(address: $address) {
      ...AccountFields
      subAccounts {
        address
        account {
          ...AccountFields
        }
      }
    }
  }
`;

export function useSubAccounts(address: string) {
  const {data, ...rest} = useQuery<{substrateChainAccount: SubstrateChainAccount}>(SUB_ACCOUNTS_QUERY, {
    variables: {address},
  });

  return {
    data: data?.substrateChainAccount,
    ...rest,
  };
}
