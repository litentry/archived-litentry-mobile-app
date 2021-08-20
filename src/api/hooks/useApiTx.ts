import {useContext} from 'react';
import {useApi} from 'context/ChainApiContext';
import {TxContext, StartConfig} from 'context/TxContext';

type TxConfig = Omit<StartConfig, 'api'>;

export function useApiTx() {
  const {start} = useContext(TxContext);
  const {api} = useApi();

  return (config: TxConfig) => {
    if (!api) {
      return Promise.reject(new Error('API is not defined'));
    }
    return start({api, ...config});
  };
}
