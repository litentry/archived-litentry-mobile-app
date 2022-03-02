import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import type {SubstrateChainParachain} from 'src/generated/litentryGraphQLTypes';

export type Parachain = SubstrateChainParachain;

const ACCOUNT_FIELDS = gql`
  fragment AccountFields on SubstrateChainAccount {
    address
    display
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
  }
`;

const PARACHAIN_INFO = gql`
  ${ACCOUNT_FIELDS}
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
          account {
            ...AccountFields
          }
        }
      }
      nonVoters {
        address
        account {
          ...AccountFields
        }
      }
    }
  }
`;

export function useParaChainById(id: string) {
  const {data, ...rest} = useQuery<{substrateChainParachain: Parachain}>(PARACHAIN_INFO, {
    variables: {id},
  });
  return {
    data: data?.substrateChainParachain,
    ...rest,
  };
}
