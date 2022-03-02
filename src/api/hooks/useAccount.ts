import {gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainAccount,
  SubstrateChainAccountBalance,
  SubstrateChainRegistrationJudgement,
  SubstrateChainDeriveAccountRegistration,
} from 'src/generated/litentryGraphQLTypes';

export type Account = SubstrateChainAccount;
export type AccountBalance = SubstrateChainAccountBalance;
export type RegistrationJudgment = SubstrateChainRegistrationJudgement;
export type AccountRegistration = SubstrateChainDeriveAccountRegistration;

export const ACCOUNT_FIELDS_FRAGMENT = gql`
  fragment AccountFields on SubstrateChainAccount {
    address
    display
    hasIdentity
    registration {
      display
      displayParent
      email
      image
      legal
      pgp
      riot
      twitter
      web
      judgements {
        registrarIndex
        judgement {
          isUnknown
          isFeePaid
          isReasonable
          isKnownGood
          isOutOfDate
          isLowQuality
          isErroneous
        }
      }
    }
    balance {
      total
      formattedTotal
      reserved
      formattedReserved
      free
      formattedFree
      freeFrozen
      formattedFreeFrozen
    }
  }
`;

const ACCOUNT_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getAccount($address: String!) {
    substrateChainAccount(address: $address) {
      ...AccountFields
    }
  }
`;

export function useAccount(address?: string) {
  const {data, ...rest} = useQuery<{substrateChainAccount: Account}>(ACCOUNT_QUERY, {
    variables: {address},
  });

  return {
    data: data?.substrateChainAccount,
    ...rest,
  };
}
