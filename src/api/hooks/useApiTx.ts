import {ApiPromise} from '@polkadot/api';
import {useApi} from 'context/ChainApiContext';
import {StartConfig, TxContext} from 'context/TxContext';
import {useContext} from 'react';

type TxConfig = Omit<StartConfig, 'api'>;

export function useApiTx() {
  const {start} = useContext(TxContext);
  const {api} = useApi();

  return (config: TxConfig | ((apiPromise: ApiPromise) => TxConfig)) => {
    if (!api) {
      return Promise.reject(new Error('API is not defined'));
    }

    const startConfig = typeof config === 'function' ? config(api) : config;

    return start({api, ...startConfig});
  };
}
