import {useQuery, QueryKey, UseQueryOptions} from 'react-query';
import {ApiPromise} from '@polkadot/api';
import {useApi} from 'context/ChainApiContext';

/**
 * Simple wrapper for useQuery to encapsulate the usage of the ApiPromise
 * Not meant to be used for subscriptions
 * */
function useApiQuery<TData>(
  queryKey: QueryKey,
  queryFn: (api: ApiPromise) => TData | Promise<TData>,
  options: UseQueryOptions<TData> = {enabled: true},
) {
  const {api} = useApi();
  const network = api?.runtimeChain != null ? api.runtimeChain.toString() : undefined;
  const isNetworkReady = network != undefined;

  const queryKeyWithNetwork = isNetworkReady
    ? [...(typeof queryKey === 'string' ? [queryKey] : queryKey), network]
    : queryKey;

  return useQuery(
    queryKeyWithNetwork,
    () => {
      if (!api) {
        throw new Error('Api not defined');
      }
      return queryFn(api);
    },
    {...options, enabled: options.enabled && Boolean(api?.isConnected) && isNetworkReady},
  );
}

export default useApiQuery;
