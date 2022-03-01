import {gql, useQuery} from '@apollo/client';
import {
  SubstrateChainAccountInfo,
  SubstrateChainParachain,
  SubstrateChainParachainsInfo,
} from 'src/generated/litentryGraphQLTypes';

export type ParachainsInfo = SubstrateChainParachainsInfo;

export type Parachain = SubstrateChainParachain;

export type AccountInfo = SubstrateChainAccountInfo;

export const PARACHAINS_INFO_QUERY = gql`
  query getParachainsInfo {
    substrateChainParachainsInfo {
      parachainsCount
      parathreadsCount
      proposalsCount
      leasePeriod {
        currentLease
        totalPeriod
        progressPercent
        remainder
      }
    }
  }
`;

export const PARACHAINS_QUERY = gql`
  query getParachains {
    substrateChainParachains {
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
            display
            address
            registration {
              display
              image
              legal
              riot
              twitter
            }
          }
        }
      }
      nonVoters {
        address
        account {
          display
          address
          registration {
            display
            image
            legal
            riot
            twitter
          }
        }
      }
    }
  }
`;

export function useParachainsInfo() {
  const {data, ...rest} = useQuery<{substrateChainParachainsInfo: ParachainsInfo}>(PARACHAINS_INFO_QUERY);
  return {
    data: data?.substrateChainParachainsInfo,
    ...rest,
  };
}

export function useParachains() {
  const {data, ...rest} = useQuery<{substrateChainParachains: Parachain[]}>(PARACHAINS_QUERY);
  return {
    data: data?.substrateChainParachains,
    ...rest,
  };
}
