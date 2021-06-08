import React, {createContext, useContext, useMemo, useState, useEffect, useCallback} from 'react';
import {noop} from 'lodash';
import {NetworkContextValueType, NetworkType} from 'src/types';
import {DataContext} from './DataContext';

const PolkadotNetwork: NetworkType = {
  name: 'Polkadot',
  key: 'polkadot',
  ws: ['wss://rpc.polkadot.io'],
  color: '#800000',
};

const KusamaNetwork: NetworkType = {
  name: 'Kusama',
  key: 'kusama',
  ws: ['wss://kusama.api.onfinality.io/public-ws'],
  color: '#e6194B',
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
  ws: ['wss://3.0.201.137'],
  isTestnet: true,
  color: '#006400',
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
  const {asyncStorage} = useContext(DataContext);
  const [currentNetwork, setNetwork] = useState<NetworkType>();

  useEffect(() => {
    asyncStorage.get('network', availableNetworks[0]).then(setNetwork);
  }, [asyncStorage]);

  const select = useCallback(
    (network: NetworkType) => {
      setNetwork(network);
      asyncStorage.set('network', JSON.stringify(network));
    },
    [asyncStorage],
  );

  const value = useMemo(
    () => ({
      currentNetwork,
      availableNetworks,
      select,
    }),
    [currentNetwork, select],
  );

  if (!currentNetwork) {
    return null;
  }

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}
