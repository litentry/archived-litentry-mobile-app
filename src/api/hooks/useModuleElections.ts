import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import type {SubstrateChainModuleElection} from 'src/generated/litentryGraphQLTypes';

export type ModuleElection = SubstrateChainModuleElection;

const MODULE_ELECTIONS = gql`
  query getModuleElections {
    substrateChainModuleElection {
      module
      hasElections
    }
  }
`;

export function useModuleElections() {
  const {data, ...rest} = useQuery<{substrateChainModuleElection: ModuleElection}>(MODULE_ELECTIONS);
  const moduleElections = data?.substrateChainModuleElection.module
    ? 'phragmenElection'
    : data?.substrateChainModuleElection.module
    ? 'electionsPhragmen'
    : data?.substrateChainModuleElection.module
    ? 'elections'
    : null;
  return {
    module: moduleElections,
    hasElections: Boolean(moduleElections),
  };
}
