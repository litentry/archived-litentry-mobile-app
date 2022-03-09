import {gql, useQuery} from '@apollo/client';
import type {SubstrateChainModuleElection} from 'src/generated/litentryGraphQLTypes';

export type ModuleElection = SubstrateChainModuleElection;

const MODULE_ELECTION_QUERY = gql`
  query getModuleElection {
    substrateChainModuleElection {
      module
      hasElections
      votingBondBase
      votingBondFactor
    }
  }
`;

export function useModuleElection() {
  const {data, ...rest} = useQuery<{substrateChainModuleElection: ModuleElection}>(MODULE_ELECTION_QUERY);

  return {
    data: data?.substrateChainModuleElection,
    ...rest,
  };
}
