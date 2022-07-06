import {atom, useRecoilState, RecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import {useRemoteConfig} from 'src/hooks/useRemoteConfig';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';

export type SupportedNetworkType = 'ethereum' | 'polkadot' | 'kusama' | 'litentry_test' | 'litmus';

export type NetworkType = {
  name: string;
  key: SupportedNetworkType;
  ws: string[];
  color?: string;
  ss58Format: number;
  isTestnet?: boolean;
  isParachain?: boolean;
};

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

export const allNetworks = [polkadotNetwork, kusamaNetwork, litentryNetworkTest, litmusNetwork];

export const networkState: RecoilState<NetworkType> = atom({
  key: 'networkState',
  default: polkadotNetwork,
  effects: [persistAtom],
});

export function useNetwork() {
  const [currentNetwork, selectCurrentNetwork] = useRecoilState(networkState);

  return {
    currentNetwork,
    selectCurrentNetwork,
  };
}

export function useAvailableNetworks() {
  const {accounts} = useAppAccounts();
  const {getValue} = useRemoteConfig();
  const config = getValue('token_bridge_test');
  const testAddress = config?.test_address ?? '';
  const isParachainAppEnabled = accounts[testAddress] ? true : false;

  return {
    availableNetworks: [
      polkadotNetwork,
      kusamaNetwork,
      ...(__DEV__ || isParachainAppEnabled ? [litentryNetworkTest, litmusNetwork] : []),
    ],
  };
}
