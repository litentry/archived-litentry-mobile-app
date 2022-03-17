import React from 'react';
import Provider, {useWalletConnect as useWC} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {
  children: React.ReactElement;
};

export function WalletConnectProvider({children}: Props) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore // the interface does not match but all the methods used are implemented
    <Provider redirectUrl="litentry://" storageOptions={{asyncStorage: AsyncStorage}}>
      {children}
    </Provider>
  );
}

export const useWalletConnect = useWC;
