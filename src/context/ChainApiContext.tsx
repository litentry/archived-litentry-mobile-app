import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react';
import {NetworkContext} from './NetworkContext';
import {ApiPromise, WsProvider} from '@polkadot/api';
import {createLogger} from 'src/utils';

type ApiChainStatusType = 'unknown' | 'connected' | 'disconnected' | 'ready';
type ChainApiContextValueType = {
  status: ApiChainStatusType;
  error: Error | null;
  api: ApiPromise | null;
};

export const ChainApiContext = createContext<ChainApiContextValueType>({
  api: null,
  status: 'unknown',
  error: null,
});
type PropTypes = {children: React.ReactNode};

const logger = createLogger('ChainApiContext');

function ChainApiContextProvider(props: PropTypes) {
  const {children} = props;
  const [status, setStatus] = useState<ApiChainStatusType>('unknown');
  const [error, setError] = useState<Error | null>(null);
  const {currentNetwork} = useContext(NetworkContext);
  const [api, setApi] = useState<ApiPromise | null>(null);

  useEffect(() => {
    if (currentNetwork) {
      try {
        logger.debug(
          `ChainApiContext: trying to connected to ${currentNetwork.ws}`,
        );
        const provider = new WsProvider(currentNetwork.ws);
        const apiPromise = new ApiPromise({provider});

        apiPromise.on('connected', () => {
          logger.debug('ChainApiContext: Api connected');
          setError(null);
          setStatus('connected');
        });

        apiPromise.on('disconnected', () => {
          logger.debug('ChainApiContext: Api disconnected');

          setError(null);
          setApi(null);
          setStatus('disconnected');
        });

        apiPromise.on('ready', () => {
          logger.debug('ChainApiContext: Api ready');
          setError(null);
          setStatus('ready');
          setApi(apiPromise);
        });

        apiPromise.on('error', (e: Error) => {
          setError(e);
        });
      } catch (e) {
        setError(e);
      }
    }
  }, [currentNetwork]);

  const value = useMemo(() => ({api, status, error}), [status, error, api]);

  return (
    <ChainApiContext.Provider value={value}>
      {children}
    </ChainApiContext.Provider>
  );
}

export default ChainApiContextProvider;
