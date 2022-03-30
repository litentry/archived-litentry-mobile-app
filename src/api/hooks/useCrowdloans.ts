import {gql, useQuery} from '@apollo/client';
import {SubstrateChainCrowdloan, SubstrateChainCrowdloanStatus} from 'src/generated/litentryGraphQLTypes';

export type Crowdloan = SubstrateChainCrowdloan;

const CROWDLOANS_QUERY = gql`
  query getCrowdloans($status: SubstrateChainCrowdloanStatus!) {
    substrateChainCrowdloans(status: $status) {
      paraId
      name
      formattedRaised
      formattedCap
      homepage
      raisedPercentage
    }
  }
`;

export function useCrowdloans(status: 'Active' | 'Ended') {
  const {data, ...rest} = useQuery<{substrateChainCrowdloans: Crowdloan[]}>(CROWDLOANS_QUERY, {
    variables: {status: SubstrateChainCrowdloanStatus[status]},
  });

  return {
    data: data?.substrateChainCrowdloans,
    ...rest,
  };
}

export function useAllCrowdloans() {
  const {data: activeCrowdloans, loading: activeLoading, refetch: refetchActive} = useCrowdloans('Active');
  const {data: endedCrowdloans, loading: endedLoading, refetch: refetchEnded} = useCrowdloans('Ended');

  return {
    activeCrowdloans: activeCrowdloans ?? [],
    endedCrowdloans: endedCrowdloans ?? [],
    loading: (activeLoading || endedLoading) && !activeCrowdloans && !endedCrowdloans,
    refetchCrowdloans: () => {
      refetchActive({status: SubstrateChainCrowdloanStatus.Active});
      refetchEnded({status: SubstrateChainCrowdloanStatus.Ended});
    },
  };
}
