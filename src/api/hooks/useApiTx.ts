import {useContext} from 'react';
import {useApi} from 'context/ChainApiContext';
import {TxContext, StartConfig} from 'context/TxContext';
import {ApiPromise} from '@polkadot/api';

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
