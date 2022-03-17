import React, {createContext, useContext, useMemo} from 'react';
import {noop} from 'lodash';
import {NetworkContextValueType, NetworkType} from 'src/types';
import {usePersistedState} from '@hooks/usePersistedState';

const polkadotNetwork: NetworkType = {
  name: 'Polkadot',
  key: 'polkadot',
  ws: ['wss://rpc.polkadot.io'],
  color: '#800000',
  ss58Format: 0,
};

const kusamaNetwork: NetworkType = {
  name: 'Kusama',
  key: 'kusama',
  ws: ['wss://kusama.api.onfinality.io/public-ws'],
  color: '#e6194B',
  ss58Format: 2,
};

// const EthereumNetwork: NetworkType = {
//   name: 'Ethereum',
//   key: 'ethereum',
//   ws: [],
//   color: '#e6194B',
// };

const litentryNetworkTest: NetworkType = {
  name: 'Litentry Testnet',
  key: 'litentry_test',
  ws: ['wss://staging.registrar.litentry.io'],
  color: '#006400',
  ss58Format: 31,
  isTestnet: true,
  isParachain: true,
};

const litmusNetwork: NetworkType = {
  name: 'Litmus',
  key: 'litmus',
  ws: ['wss://rpc.litmus-parachain.litentry.io'],
  color: '#6822fb',
  ss58Format: 131,
  isParachain: true,
};

const availableNetworks = [
  polkadotNetwork,
  kusamaNetwork,
  // EthereumNetwork,
  ...(__DEV__ ? [litentryNetworkTest, litmusNetwork] : []),
];

export const NetworkContext = createContext<NetworkContextValueType>({
  currentNetwork: polkadotNetwork,
  availableNetworks,
  select: noop,
});

type PropTypes = {
  children: React.ReactNode;
};

export default function NetworkContextProvider({children}: PropTypes) {
  const [currentNetwork, setCurrentNetwork] = usePersistedState<NetworkType>('network', polkadotNetwork);

  const value = useMemo(
    () => ({currentNetwork, availableNetworks, select: setCurrentNetwork}),
    [currentNetwork, setCurrentNetwork],
  );

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}

export function useCurrentNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useCurrentNetwork must be used within NetworkContextProvider');
  }

  return context.currentNetwork;
}
