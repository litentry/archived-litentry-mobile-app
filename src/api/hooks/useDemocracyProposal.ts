import {gql, useQuery, NetworkStatus} from '@apollo/client';
import {SubstrateChainDemocracyProposal} from 'src/generated/litentryGraphQLTypes';
import {ACCOUNT_FIELDS_FRAGMENT} from 'src/api/hooks/useAccount';

export type DemocracyProposal = SubstrateChainDemocracyProposal;

const PROPOSAL_QUERY = gql`
  ${ACCOUNT_FIELDS_FRAGMENT}
  query getDemocracyProposal($id: String!) {
    substrateChainDemocracyProposal(id: $id) {
      id
      proposer {
        ...AccountFields
      }
      blockNumber
      depositAmount
      formattedDepositAmount
      title
      description
      proposalHash
      proposalIndex
      status
      tabledAtBlock
      date
      updatedAt
      seconds {
        account {
          ...AccountFields
        }
      }
    }
  }
`;

export function useDemocracyProposal(id: string) {
  const {data, networkStatus, ...rest} = useQuery<
    {substrateChainDemocracyProposal: SubstrateChainDemocracyProposal},
    {id: string}
  >(PROPOSAL_QUERY, {
    variables: {id},
  });

  return {
    data: data?.substrateChainDemocracyProposal,
    refetching: networkStatus === NetworkStatus.refetch,
    ...rest,
  };
}
