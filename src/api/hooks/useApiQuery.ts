import {useQuery, QueryKey, UseQueryOptions} from 'react-query';
import {ApiPromise} from '@polkadot/api';
import {useApi} from 'context/ChainApiContext';

function useApiQuery<TData>(
  queryKey: QueryKey,
  queryFn: (api: ApiPromise) => TData | Promise<TData>,
  options: UseQueryOptions<TData>,
) {
  const {api} = useApi();

  return useQuery(
    queryKey,
    () => {
      if (!api) {
        throw new Error('Api not defined');
      }
      return queryFn(api);
    },
    options,
  );
}

export default useApiQuery;
