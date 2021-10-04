import {ApiPromise, WsProvider} from '@polkadot/api';
import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {useQueryClient} from 'react-query';
import {createLogger} from 'src/utils';
import {NetworkContext} from './NetworkContext';

const initialState: ChainApiContext = {
  status: 'unknown',
  inProgress: false,
  api: undefined,
  wsConnectionIndex: 0,
};

export const ChainApiContext = createContext<ChainApiContext>(initialState);

export const useApi = () => useContext(ChainApiContext);

const logger = createLogger('ChainApiContext');

export function ChainApiContextProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {currentNetwork} = useContext(NetworkContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    const wsAddress = currentNetwork.ws[state.wsConnectionIndex];
    if (!wsAddress) {
      return;
    }

    queryClient.clear();
    logger.debug('ChainApiContext: trying to connect to', wsAddress);

    const provider = new WsProvider(wsAddress, false);
    const apiPromise = new ApiPromise({provider});
    apiPromise.connect();
    dispatch({type: 'CONNECT'});

    function handleConnect() {
      logger.debug('ChainApiContext: Api connected');
      dispatch({type: 'ON_CONNECT'});
    }

    function handleReady() {
      logger.debug('ChainApiContext: Api ready at', wsAddress);
      dispatch({type: 'ON_READY', payload: apiPromise});
    }

    function handleDisconnect() {
      logger.debug('ChainApiContext: Api disconnected', wsAddress);
      dispatch({type: 'ON_DISCONNECT'});
    }

    function handleError(error: unknown) {
      logger.debug('ChainApiContext: Api error at', wsAddress, error);
      dispatch({type: 'ON_ERROR'});
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
          const nextWsConnectionIndex = (state.wsConnectionIndex + 1) % webSocketAddresses.length;
          dispatch({type: 'SET_WS_CONNECTION_INDEX', payload: nextWsConnectionIndex});

          logger.debug(
            `ChainApiContext: switching ws provider to (${nextWsConnectionIndex}) ${webSocketAddresses[nextWsConnectionIndex]}`,
          );
        } else {
          apiPromise.connect();
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
  }, [currentNetwork.ws, queryClient, state.wsConnectionIndex]);

  return <ChainApiContext.Provider value={state}>{children}</ChainApiContext.Provider>;
}

type ApiChainStatusType = 'unknown' | 'connected' | 'disconnected' | 'ready';

type ChainApiContext = {
  status: ApiChainStatusType;
  inProgress: boolean;
  api?: ApiPromise;
  wsConnectionIndex: number;
};

type Action =
  | {type: 'ON_CONNECT'}
  | {type: 'CONNECT'}
  | {type: 'ON_READY'; payload: ApiPromise}
  | {type: 'ON_DISCONNECT'}
  | {type: 'ON_ERROR'}
  | {type: 'SET_WS_CONNECTION_INDEX'; payload: number};

function reducer(state: ChainApiContext = initialState, action: Action): ChainApiContext {
  switch (action.type) {
    case 'CONNECT':
      return {...state, inProgress: true, status: 'unknown'};
    case 'ON_CONNECT':
      return {...state, status: 'connected'};
    case 'ON_DISCONNECT':
    case 'ON_ERROR':
      return {...state, status: 'disconnected', inProgress: false};
    case 'ON_READY':
      return {...state, status: 'ready', inProgress: false, api: action.payload};

    case 'SET_WS_CONNECTION_INDEX':
      return {...state, wsConnectionIndex: action.payload};

    default:
      return state;
  }
}
