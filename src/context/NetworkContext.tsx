import React, {createContext, useMemo, useCallback} from 'react';
import {noop} from 'lodash';
import {NetworkContextValueType, NetworkType} from 'src/types';
import {usePersistedState} from 'src/hook/usePersistedState';

const PolkadotNetwork: NetworkType = {
  name: 'Polkadot',
  key: 'polkadot',
  ws: ['wss://rpc.polkadot.io'],
  color: '#800000',
  ss58Format: 0,
};

const KusamaNetwork: NetworkType = {
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

const LitentryNetworkTest: NetworkType = {
  name: 'Litentry Testnet',
  key: 'litentry_test',
  ws: ['wss://staging.registrar.litentry.io'],
  isTestnet: true,
  color: '#006400',
  ss58Format: 9999, // don't know yet
};

const availableNetworks = [
  PolkadotNetwork,
  KusamaNetwork,
  // EthereumNetwork,
  LitentryNetworkTest,
];

export const NetworkContext = createContext<NetworkContextValueType>({
  currentNetwork: PolkadotNetwork,
  availableNetworks: availableNetworks,
  select: noop,
});

type PropTypes = {
  children: React.ReactNode;
};

export default function NetworkContextProvider({children}: PropTypes) {
  const [currentNetwork, setCurrentNetwork] = usePersistedState<NetworkType>('network', PolkadotNetwork);

  const select = useCallback(
    (network: NetworkType) => {
      setCurrentNetwork(network);
    },
    [setCurrentNetwork],
  );

  const value = useMemo(
    () => ({
      currentNetwork,
      availableNetworks,
      select,
    }),
    [currentNetwork, select],
  );

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}
