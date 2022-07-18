import {atom, useRecoilState, RecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import {useRemoteConfig} from 'src/hooks/useRemoteConfig';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';

export type SupportedNetworkType = 'polkadot' | 'kusama' | 'litentry-test' | 'litmus' | 'litentry-rococo';

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

const litmusNetwork: NetworkType = {
  name: 'Litmus',
  key: 'litmus',
  ws: ['wss://rpc.litmus-parachain.litentry.io'],
  color: '#6822fb',
  ss58Format: 131,
  isParachain: true,
};

const litentryRococo: NetworkType = {
  name: 'Litentry Rococo',
  key: 'litentry-rococo',
  ws: ['wss://rpc.rococo-parachain-sg.litentry.io'],
  color: '#0B6A09',
  ss58Format: 131,
};

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
      litentryRococo,
      ...(__DEV__ || isParachainAppEnabled ? [litmusNetwork] : []),
    ],
  };
}
