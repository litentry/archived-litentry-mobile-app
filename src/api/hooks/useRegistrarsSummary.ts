import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainRegistrarsSummary, SubstrateChainRegistrar} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type Registrar = SubstrateChainRegistrar;
export type RegistrarsSummary = SubstrateChainRegistrarsSummary;

const REGISTRARS_SUMMARY_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getRegistrarsSummary {
    substrateChainRegistrarsSummary {
      registrarsCount
      lowestFee
      formattedLowestFee
      highestFee
      formattedHighestFee
      list {
        id
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
  const {data, ...rest} = useQuery<{substrateChainRegistrarsSummary: SubstrateChainRegistrarsSummary}>(
    REGISTRARS_SUMMARY_QUERY,
  );

  return {
    data: data?.substrateChainRegistrarsSummary,
    ...rest,
  };
}
