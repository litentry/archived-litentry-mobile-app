import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainRegistrarsSummary, SubstrateChainRegistrar} from 'src/generated/litentryGraphQLTypes';

export type Registrar = SubstrateChainRegistrar;

const ACCOUNT_FIELDS = gql`
  fragment AccountFields on ProxyAccount {
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
        index
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

const REGISTRARS_SUMMARY_QUERY = gql`
  ${ACCOUNT_FIELDS}
  query getRegistrarsSummary {
    proxyRegistrarsSummary {
      registrarsCount
      lowestFee
      formattedLowestFee
      highestFee
      formattedHighestFee
      list {
        id
        address
        account {
          ...AccountFields
        }
        fee
        formattedFee
      }
    }
  }
`;

export function useRegistrarsSummary() {
  const {data, ...rest} =
    useQuery<{substrateChainRegistrarsSummary: SubstrateChainRegistrarsSummary}>(REGISTRARS_SUMMARY_QUERY);

  return {
    data: data?.substrateChainRegistrarsSummary,
    ...rest,
  };
}
