import React, {createContext, useEffect, useCallback, useMemo, useReducer, useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
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
import type {HexString, TxConfig, TxInfo, TxPayload} from 'polkadot-api';
import {usePolkadotApiStatus} from '@polkadotApi/usePolkadotApiStatus';
import {useTx} from '@polkadotApi/useTx';

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
  const apiStatus = usePolkadotApiStatus();
  const {getTxInfo, sendTx, signAndSendTx} = useTx();

  useEffect(() => {
    if (apiStatus !== 'ready' && state.view === 'submitting_view') {
      dispatch({
        type: 'SHOW_WARNING',
        payload: 'The transaction was sent but you got disconnected from the chain. Please verify later.',
      });
    }
  }, [apiStatus, state.view]);

  const startTx = useCallback(
    async (config: StartConfig) => {
      openBottomSheet();
      const txInfo = await getTxInfo({address: config.address, txConfig: config.txConfig});
      dispatch({type: 'SHOW_TX_PREVIEW', payload: {address: config.address, txConfig: config.txConfig, txInfo}});
    },
    [openBottomSheet, getTxInfo],
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

      case 'tx_preview':
        return (
          <TxPreview
            address={state.address}
            txConfig={state.txConfig}
            txInfo={state.txInfo}
            onCancel={reset}
            onConfirm={(isExternalAccount: boolean) => {
              if (isExternalAccount) {
                dispatch({type: 'SHOW_QR_CODE_TX_PAYLOAD_VIEW'});
              } else {
                dispatch({type: 'SHOW_AUTHENTICATE_VIEW'});
              }
            }}
          />
        );

      case 'authenticate_view':
        return (
          <AuthenticateView
            address={state.address}
            onAuthenticate={(credentials) => {
              dispatch({type: 'SHOW_SUBMITTING_VIEW'});
              signAndSendTx({txConfig: state.txConfig, credentials})
                .then(() => {
                  dispatch({type: 'SHOW_SUCCESS_VIEW'});
                })
                .catch((error) => {
                  dispatch({type: 'SHOW_ERROR', payload: error});
                });
            }}
          />
        );

      case 'qr_code_tx_payload_view':
        return (
          <PayloadQrCodeView
            txConfig={state.txConfig}
            address={state.address}
            onCancel={reset}
            onConfirm={(txPayload: TxPayload) => dispatch({type: 'SHOW_SCAN_SIGNATURE_VIEW', payload: {txPayload}})}
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
                sendTx({address: state.address, txConfig: state.txConfig, txPayload: state.txPayload, signature})
                  .then(() => {
                    dispatch({type: 'SHOW_SUCCESS_VIEW'});
                  })
                  .catch((error) => {
                    dispatch({type: 'SHOW_ERROR', payload: error});
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
  }, [state, reset, sendTx, signAndSendTx]);

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

type TxState = {
  txConfig: TxConfig;
  address: string;
};

type ViewState =
  | {view: 'initial_view' | 'submitting_view' | 'success_view'}
  | {
      view: 'tx_preview';
      address: string;
      txConfig: TxConfig;
      txInfo: TxInfo;
      credentials?: string;
    }
  | {view: 'authenticate_view'; address: string; txConfig: TxConfig}
  | {view: 'qr_code_tx_payload_view'; address: string; txConfig: TxConfig}
  | {
      view: 'scan_signature_view';
      address: string;
      txConfig: TxConfig;
      txPayload: TxPayload;
    }
  | {view: 'error_view'; error: string}
  | {view: 'warning_view'; warning: string};

type State = TxState & ViewState;

const initialState: State = {
  view: 'initial_view',
  address: '',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  txConfig: {method: '', params: []},
};

type Action =
  | {
      type: 'SHOW_TX_PREVIEW';
      payload: {
        address: string;
        txConfig: TxConfig;
        txInfo: TxInfo;
        credentials?: string;
      };
    }
  | {type: 'SHOW_AUTHENTICATE_VIEW'}
  | {type: 'SHOW_QR_CODE_TX_PAYLOAD_VIEW'}
  | {type: 'SHOW_SCAN_SIGNATURE_VIEW'; payload: {txPayload: TxPayload}}
  | {type: 'SHOW_SUBMITTING_VIEW'}
  | {type: 'SHOW_ERROR'; payload: string}
  | {type: 'SHOW_WARNING'; payload: string}
  | {type: 'SHOW_SUCCESS_VIEW'}
  | {type: 'RESET'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'SHOW_TX_PREVIEW':
      return {view: 'tx_preview', ...action.payload};

    case 'SHOW_AUTHENTICATE_VIEW':
      return {...state, view: 'authenticate_view'};

    case 'SHOW_QR_CODE_TX_PAYLOAD_VIEW':
      return {...state, view: 'qr_code_tx_payload_view'};

    case 'SHOW_SCAN_SIGNATURE_VIEW':
      return {...state, view: 'scan_signature_view', ...action.payload};

    case 'SHOW_SUBMITTING_VIEW':
      return {...state, view: 'submitting_view'};

    case 'SHOW_SUCCESS_VIEW':
      return {...state, view: 'success_view'};

    case 'SHOW_ERROR':
      return {...state, view: 'error_view', error: action.payload};

    case 'SHOW_WARNING':
      return {...state, view: 'warning_view', warning: action.payload};

    default:
      return state;
  }
}
