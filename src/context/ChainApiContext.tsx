import {ApiPromise, WsProvider} from '@polkadot/api';
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useQueryClient} from 'react-query';
import {createLogger} from 'src/utils';
import {NetworkContext} from './NetworkContext';

type ApiChainStatusType = 'unknown' | 'connected' | 'disconnected' | 'ready';
type ChainApiContextValueType = {
  inProgress: boolean;
  status: ApiChainStatusType;
  api?: ApiPromise;
};

export const ChainApiContext = createContext<ChainApiContextValueType>({
  api: undefined,
  status: 'unknown',
  inProgress: false,
});

export const useApi = () => useContext(ChainApiContext);

const logger = createLogger('ChainApiContext');

export function ChainApiContextProvider({children}: {children: React.ReactNode}) {
  const [inProgress, setInProgress] = useState(true);
  const [status, setStatus] = useState<ApiChainStatusType>('unknown');
  const {currentNetwork} = useContext(NetworkContext);
  const [api, setApi] = useState<ApiPromise>();
  const [wsConnectionIndex, setWsConnectionIndex] = useState(0);

  const queryClient = useQueryClient();

  useEffect(() => {
    const wsAddress = currentNetwork.ws[wsConnectionIndex];
    if (!wsAddress) {
      return;
    }

    setApi(undefined);
    setInProgress(true);
    logger.debug('ChainApiContext: trying to connected to', wsAddress);

    const provider = new WsProvider(wsAddress);
    const apiPromise = new ApiPromise({provider});

    function handleConnect() {
      logger.debug('ChainApiContext: Api connected');
      setStatus('connected');
    }

    function handleReady() {
      logger.debug('ChainApiContext: Api ready at', wsAddress);
      setInProgress(false);

      setStatus('ready');
      setApi(apiPromise);
      queryClient.clear();
    }

    function handleDisconnect() {
      logger.debug('ChainApiContext: Api disconnected', wsAddress);

      setApi(undefined);
      setStatus('disconnected');
    }

    function handleError(error: unknown) {
      logger.debug('ChainApiContext: Api error at', wsAddress, error);
      setApi(undefined);
      setInProgress(false);
    }

    apiPromise.on('connected', handleConnect);
    apiPromise.on('ready', handleReady);
    apiPromise.on('disconnected', handleDisconnect);
    apiPromise.on('error', handleError);

    const retryInterval = setInterval(() => {
      if (!apiPromise.isConnected) {
        const webSocketAddresses = currentNetwork.ws;
        // pick the next ws api location
        // rerun the effect by changing the wsConnectionIndex dependency
        if (webSocketAddresses.length > 1) {
          const nextWsConnectionIndex = (wsConnectionIndex + 1) % webSocketAddresses.length;
          setWsConnectionIndex(nextWsConnectionIndex);

          logger.debug(
            `ChainApiContext: switching ws provider to (${wsConnectionIndex}) ${webSocketAddresses[nextWsConnectionIndex]}`,
          );
        }
      }
    }, 5000);

    return () => {
      apiPromise.off('connected', handleConnect);
      apiPromise.off('ready', handleReady);
      apiPromise.off('disconnected', handleDisconnect);
      apiPromise.off('error', handleError);
      clearInterval(retryInterval);
    };
  }, [currentNetwork, wsConnectionIndex, queryClient]);

  const value = useMemo(() => {
    return {api, status, inProgress};
  }, [status, api, inProgress]);
  return <ChainApiContext.Provider value={value}>{children}</ChainApiContext.Provider>;
}
