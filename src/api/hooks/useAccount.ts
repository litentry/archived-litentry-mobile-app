import {gql, useQuery} from '@apollo/client';
import type {
  SubstrateChainAccount,
  SubstrateChainAccountBalance,
  SubstrateChainDeriveAccountRegistration,
  SubstrateChainIdentityJudgement,
  SubstrateChainAccountInfo,
  SubstrateChainRegistrationJudgement,
} from 'src/generated/litentryGraphQLTypes';

export type Account = SubstrateChainAccount;
export type AccountInfo = SubstrateChainAccountInfo;
export type AccountBalance = SubstrateChainAccountBalance;
export type RegistrationJudgment = SubstrateChainRegistrationJudgement;
export type AccountRegistration = SubstrateChainDeriveAccountRegistration;
export type AccountIdentityJudgment = SubstrateChainIdentityJudgement;

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
      formattedExistentialDeposit
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

const oneMinute = 60 * 1000;

export function useAccount(address?: string) {
  const {data, ...rest} = useQuery<{substrateChainAccount: Account}>(ACCOUNT_QUERY, {
    variables: {address},
    pollInterval: oneMinute,
  });

  return {
    data: data?.substrateChainAccount,
    ...rest,
  };
}
