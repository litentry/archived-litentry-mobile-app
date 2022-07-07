import React, {createContext, useEffect, useCallback, useMemo, useReducer, useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {u8aToHex} from '@polkadot/util';
import LoadingView from '@ui/components/LoadingView';
import {AuthenticateView} from '@ui/components/Tx/AuthenticateView';
import {PayloadQrCodeView} from '@ui/components/Tx/PayloadQrCodeView';
import {SuccessDialog} from '@ui/components/SuccessDialog';
import {Layout} from '@ui/components/Layout';
import {TxPreview} from '@ui/components/Tx/Preview';
import {MessageTeaser} from '@ui/components/MessageTeaser';
import {Subheading, Caption, Icon, useBottomSheet, Button} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import type {HexString, SendTxMessage, SignCredentials, TxConfig, TxInfo} from 'polkadot-api';
import {useKeyring} from '@polkadotApi/useKeyring';
import {useAppAccounts} from '@polkadotApi/useAppAccounts';
import {useTx} from '@polkadotApi/useTx';
import {usePolkadotApiState} from '@polkadotApi/usePolkadotApiState';

const {width, height} = Dimensions.get('window');

type TxProviderProps = {
  children: React.ReactNode;
};
type TxContextValueType = {
  startTx: (config: StartConfig) => Promise<void>;
};

const TxContext = createContext<TxContextValueType>({
  startTx: () => Promise.resolve(),
});

export type StartConfig = {
  address: string;
  txConfig: TxConfig;
};

export function TxProvider({children}: TxProviderProps): React.ReactElement {
  const {BottomSheet, openBottomSheet, closeBottomSheet} = useBottomSheet();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {sign} = useKeyring();
  const {getTxInfo, sendTx} = useTx();
  const apiState = usePolkadotApiState();

  useEffect(() => {
    if (!apiState.isReady) {
      dispatch({
        type: 'SHOW_WARNING',
        payload: 'The transaction was sent but you got disconnected from the chain. Please verify later.',
      });
    }
  }, [apiState.isReady, state.view]);

  const {accounts} = useAppAccounts();

  const sendTransaction = useCallback(
    (payload: SendTxMessage['payload']) => {
      sendTx(payload)
        .then(() => {
          dispatch({type: 'SHOW_SUCCESS_VIEW'});
        })
        .catch((error) => {
          dispatch({type: 'SHOW_ERROR', payload: error});
        });
    },
    [sendTx],
  );

  const startTx = useCallback(
    async (config: StartConfig) => {
      openBottomSheet();
      const {address, txConfig} = config;
      const txInfo = await getTxInfo({address, txConfig});
      const isExternal = Boolean(accounts[address]?.meta.isExternal);

      if (isExternal) {
        dispatch({
          type: 'SHOW_TX_PREVIEW',
          payload: {
            txInfo,
            txConfig,
            address,
            isExternalAccount: true,
          },
        });
      } else {
        dispatch({type: 'SHOW_AUTHENTICATE_VIEW', payload: {address, txConfig, txInfo}});
      }
    },
    [accounts, openBottomSheet, getTxInfo],
  );

  const reset = React.useCallback(() => {
    closeBottomSheet();
    dispatch({type: 'RESET'});
  }, [closeBottomSheet]);

  const modalContent = useMemo(() => {
    switch (state.view) {
      case 'initial_view':
        return (
          <Layout style={styles.emptyState}>
            <Subheading>Preparing transaction payload...</Subheading>
          </Layout>
        );

      case 'authenticate_view':
        return (
          <AuthenticateView
            address={state.address}
            onAuthenticate={async (credentials) => {
              dispatch({
                type: 'SHOW_TX_PREVIEW',
                payload: {
                  txConfig: state.txConfig,
                  txInfo: state.txInfo,
                  credentials,
                  isExternalAccount: false,
                },
              });
            }}
          />
        );

      case 'tx_preview':
        return (
          <TxPreview
            transactionInfo={state.txInfo.description}
            transactionTitle={`Sending ${state.txInfo.title}`}
            txPayload={state.txInfo.txPayload}
            params={state.txConfig.params}
            partialFee={state.txInfo.partialFee}
            onCancel={reset}
            isExternalAccount={state.isExternalAccount}
            onConfirm={async () => {
              if (state.isExternalAccount) {
                dispatch({
                  type: 'SHOW_QR_CODE_TX_PAYLOAD_VIEW',
                  payload: {address: state.address, txConfig: state.txConfig, txInfo: state.txInfo},
                });
              } else {
                dispatch({type: 'SHOW_SUBMITTING_VIEW'});
                const signable = u8aToHex(state.txInfo.signablePayload);
                const signed = await sign({message: signable, credentials: state.credentials});
                sendTransaction({
                  address: state.credentials.address,
                  txConfig: state.txConfig,
                  txPayload: state.txInfo.txPayload,
                  signature: signed,
                });
              }
            }}
          />
        );

      case 'qr_code_tx_payload_view':
        return (
          <PayloadQrCodeView
            payload={state.txInfo.txPayload}
            onCancel={reset}
            onConfirm={() =>
              dispatch({
                type: 'SHOW_SCAN_SIGNATURE_VIEW',
                payload: {address: state.address, txConfig: state.txConfig, txInfo: state.txInfo},
              })
            }
          />
        );

      case 'scan_signature_view':
        return (
          <Layout style={globalStyles.paddedContainer}>
            <Subheading style={globalStyles.textCenter}>{`Scan QR code`}</Subheading>
            <Padder scale={1} />
            <QRCodeScanner
              onRead={(data) => {
                dispatch({type: 'SHOW_SUBMITTING_VIEW'});
                const signature: HexString = `0x${data.data}`;
                sendTransaction({
                  address: state.address,
                  txConfig: state.txConfig,
                  txPayload: state.txInfo.txPayload,
                  signature,
                });
              }}
              showMarker
              markerStyle={styles.marker}
              cameraStyle={styles.cameraBase}
              notAuthorizedView={
                <Layout style={styles.notAuthorized}>
                  <Layout style={styles.notAuthorizedHack}>
                    <Icon name="alert-outline" size={30} />
                    <Caption>This requires your Camera permission to scan.</Caption>
                  </Layout>
                </Layout>
              }
            />
            <Padder scale={2} />
          </Layout>
        );

      case 'submitting_view':
        return (
          <Layout style={styles.infoContainer}>
            <LoadingView text="Submitting" renderIcon={() => <Icon name="upload" size={20} />} />
          </Layout>
        );

      case 'success_view':
        return (
          <Layout style={styles.infoContainer}>
            <SuccessDialog text="Tx Success" onClosePress={reset} />
          </Layout>
        );

      case 'error_view':
        return (
          <Layout style={styles.infoContainer}>
            <MessageTeaser title="Tx Failed" msg={state.error} type="warning" />
            <Button onPress={reset}>Close</Button>
          </Layout>
        );

      case 'warning_view':
        return (
          <Layout style={styles.infoContainer}>
            <MessageTeaser title="Tx Sent" msg={state.warning} type="warning" />
            <Button onPress={reset}>Close</Button>
          </Layout>
        );

      default:
        return null;
    }
  }, [state, reset, sign, sendTransaction]);

  const contextValue: TxContextValueType = useMemo(() => ({startTx}), [startTx]);

  const onCloseBottomSheet = useCallback(() => {
    dispatch({type: 'RESET'});
  }, []);

  return (
    <TxContext.Provider value={contextValue}>
      {children}
      <BottomSheet onClose={onCloseBottomSheet}>{modalContent}</BottomSheet>
    </TxContext.Provider>
  );
}

export function useStartTx() {
  const context = useContext(TxContext);

  if (!context) {
    throw new Error('useTx must be used within a TxProvider');
  }

  return context;
}

const styles = StyleSheet.create({
  infoContainer: {
    height: height * 0.3,
    paddingBottom: standardPadding * 2,
  },
  emptyState: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: standardPadding * 2,
    marginBottom: standardPadding * 2,
    fontSize: 14,
  },
  marker: {
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderWidth: 4,
  },
  notAuthorized: {
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAuthorizedHack: {
    marginTop: -100,
    alignItems: 'center',
  },
  cameraBase: {
    overflow: 'hidden',
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

type State =
  | {view: 'initial_view' | 'submitting_view' | 'success_view'}
  | {view: 'authenticate_view'; address: string; txConfig: TxConfig; txInfo: TxInfo}
  | {
      view: 'tx_preview';
      txConfig: TxConfig;
      txInfo: TxInfo;
      address: string;
      isExternalAccount: true;
    }
  | {
      view: 'tx_preview';
      txConfig: TxConfig;
      txInfo: TxInfo;
      credentials: SignCredentials;
      isExternalAccount: false;
    }
  | {view: 'qr_code_tx_payload_view'; address: string; txConfig: TxConfig; txInfo: TxInfo}
  | {
      view: 'scan_signature_view';
      address: string;
      txConfig: TxConfig;
      txInfo: TxInfo;
      isExternalAccount: true;
    }
  | {view: 'error_view'; error: string}
  | {view: 'warning_view'; warning: string};

const initialState: State = {view: 'initial_view'};

type Action =
  | {type: 'RESET'}
  | {
      type: 'SHOW_AUTHENTICATE_VIEW';
      payload: {
        address: string;
        txConfig: TxConfig;
        txInfo: TxInfo;
      };
    }
  | {
      type: 'SHOW_TX_PREVIEW';
      payload:
        | {
            txInfo: TxInfo;
            txConfig: TxConfig;
            address: string;
            isExternalAccount: true;
          }
        | {
            txConfig: TxConfig;
            txInfo: TxInfo;
            credentials: SignCredentials;
            isExternalAccount: false;
          };
    }
  | {
      type: 'SHOW_QR_CODE_TX_PAYLOAD_VIEW';
      payload: {
        address: string;
        txConfig: TxConfig;
        txInfo: TxInfo;
      };
    }
  | {
      type: 'SHOW_SCAN_SIGNATURE_VIEW';
      payload: {address: string; txConfig: TxConfig; txInfo: TxInfo};
    }
  | {type: 'SHOW_SUBMITTING_VIEW'}
  | {type: 'SHOW_ERROR'; payload: string}
  | {type: 'SHOW_WARNING'; payload: string}
  | {type: 'SHOW_SUCCESS_VIEW'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'SHOW_AUTHENTICATE_VIEW':
      return {view: 'authenticate_view', ...action.payload};

    case 'SHOW_TX_PREVIEW':
      return {view: 'tx_preview', ...action.payload};

    case 'SHOW_QR_CODE_TX_PAYLOAD_VIEW':
      return {view: 'qr_code_tx_payload_view', ...action.payload};

    case 'SHOW_SCAN_SIGNATURE_VIEW':
      return {view: 'scan_signature_view', ...action.payload, isExternalAccount: true};

    case 'SHOW_SUBMITTING_VIEW':
      return {view: 'submitting_view'};

    case 'SHOW_SUCCESS_VIEW':
      return {view: 'success_view'};

    case 'SHOW_ERROR':
      return {view: 'error_view', error: action.payload};

    case 'SHOW_WARNING':
      return {view: 'warning_view', warning: action.payload};

    default:
      return state;
  }
}
