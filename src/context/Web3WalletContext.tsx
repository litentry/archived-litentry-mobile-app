import React, {useContext, createContext, useState, useCallback, useEffect} from 'react';
import WalletConnectWeb3Provider from '@walletconnect/web3-provider';
import EnvConfig from 'react-native-config';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import {useWalletConnect, Connector} from 'context/WalletConnectProvider';
import {
  getEthereumBalance,
  getLitentryBalance,
  getTokenMigrationAllowance,
  approveForMigration,
  depositForMigration,
  Result,
} from 'src/service/TokenMigration';
import {useCryptoUtil} from '@polkadotApi/useCryptoUtil';

export type TxResult = Result;

interface Web3Account {
  address: string;
  balance: {
    eth: BigNumber;
    lit: BigNumber;
  };
  approved: BigNumber;
}

interface DisconnectedWallet {
  connect: () => void;
  isConnected: false;
}

interface ConnectedWallet {
  connectedAccount?: Web3Account;
  updateAccount: (address: string) => void;
  disconnect: () => void;
  isConnected: true;
  approveForMigration: (address: string) => Promise<Result>;
  depositForMigration: (address: string, amount: number, recipientAddress: string) => Promise<Result>;
}

type Web3Wallet = ConnectedWallet | DisconnectedWallet;

const Web3WalletContext = createContext<Web3Wallet>({
  isConnected: false,
  connect: () => undefined,
});

export function Web3WalletProvider({children}: {children: React.ReactNode}) {
  const connector = useWalletConnect();
  const [connectedAccount, setConnectedAccount] = useState<Web3Account>();
  const [wallet, setWallet] = useState<Web3>();
  const {decodeAddress} = useCryptoUtil();

  useEffect(() => {
    if (connector.connected && !wallet) {
      (async function initializeWeb3Wallet() {
        const web3Provider = getWalletConnectWeb3Provider(connector);
        await web3Provider.enable();
        const web3 = new Web3(web3Provider as any);
        setWallet(web3);
      })();
    }
  }, [connector, wallet]);

  const updateAccount = useCallback(
    async (address: string) => {
      if (!wallet) {
        return;
      }
      const [eth, lit, approved] = await Promise.all([
        getEthereumBalance(address, wallet),
        getLitentryBalance(address, wallet),
        getTokenMigrationAllowance(address, wallet),
      ]);
      const updatedAccount = {
        address,
        balance: {
          eth,
          lit,
        },
        approved,
      };
      setConnectedAccount(updatedAccount);
    },
    [wallet],
  );

  useEffect(() => {
    (async function getEthAccount() {
      if (wallet) {
        const _accounts = await wallet.eth.getAccounts();
        const ethAddress = _accounts[0];
        if (ethAddress) {
          updateAccount(ethAddress);
        }
      }
    })();
  }, [wallet, updateAccount]);

  const connectWeb3Wallet = useCallback(() => {
    connector.connect();
  }, [connector]);

  const disconnectWeb3Wallet = useCallback(() => {
    connector.killSession();
    setWallet(undefined);
    setConnectedAccount(undefined);
  }, [connector]);

  const _approveForMigration = useCallback(
    async (address: string) => {
      if (!wallet) {
        throw new Error('Web3 wallet must be initialized');
      }
      return approveForMigration(address, wallet);
    },
    [wallet],
  );

  const _depositForMigration = useCallback(
    async (address: string, amount: number, recipientAddress: string) => {
      if (!wallet) {
        throw new Error('Web3 wallet must be initialized.');
      }
      const decodedAddress = await decodeAddress({encoded: recipientAddress});
      return depositForMigration(address, amount, decodedAddress, wallet);
    },
    [wallet, decodeAddress],
  );

  const contextValue: Web3Wallet =
    wallet && connector.connected
      ? {
          connectedAccount,
          updateAccount,
          isConnected: true,
          disconnect: disconnectWeb3Wallet,
          approveForMigration: _approveForMigration,
          depositForMigration: _depositForMigration,
        }
      : {isConnected: false, connect: connectWeb3Wallet};

  return <Web3WalletContext.Provider value={contextValue}>{children}</Web3WalletContext.Provider>;
}

function getWalletConnectWeb3Provider(connector: Connector) {
  const provider = new WalletConnectWeb3Provider({
    infuraId: EnvConfig.INFURA_PROJECT_ID,
    connector: connector,
    qrcode: false,
  });
  return provider;
}

export function useWeb3Wallet(): Web3Wallet {
  const context = useContext(Web3WalletContext);
  if (!context) {
    throw new Error('useWeb3Account must be used within Web3WalletProvider');
  }
  if (!context.isConnected) {
    return {connect: context.connect, isConnected: false};
  }

  return {
    isConnected: true,
    disconnect: context.disconnect,
    connectedAccount: context.connectedAccount,
    updateAccount: context.updateAccount, // TODO: remove this
    approveForMigration: context.approveForMigration,
    depositForMigration: context.depositForMigration,
  };
}
