import React, {createContext, useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ApiPromise} from '@polkadot/api';
import {SubmittableExtrinsic} from '@polkadot/api/submittable/types';
import {SignerPayloadJSON, SignerResult} from '@polkadot/types/types';
import {BN_ZERO} from '@polkadot/util';
import {Icon, IconProps, Layout, Text} from '@ui-kitten/components';
import {useApi} from 'context/ChainApiContext';
import {TxPreview} from 'context/TxContext/TxPreview';
import {get} from 'lodash';
import ErrorDialog from 'presentational/ErrorDialog';
import LoadingView from 'presentational/LoadingView';
import SuccessDialog from 'presentational/SuccessDialog';
import TxPayloadQr from 'presentational/TxPayloadQr';
import {formatCallMeta} from 'src/packages/call_inspector/CallInspector';
import AsyncSigner from 'src/service/AsyncSigner';
import globalStyles, {standardPadding} from 'src/styles';
import WarningDialog from 'presentational/WarningDialog';
import {getPair} from 'src/utils';

let id = 0;

const {width, height} = Dimensions.get('window');

type PropTypes = {children: React.ReactNode};
type TxContextValueType = {
  start: (config: StartConfig) => Promise<void>;
};

export const TxContext = createContext<TxContextValueType>({
  start: () => Promise.resolve(),
});

const AlertIcon = (props: IconProps) => <Icon fill="#ccc" {...props} name="alert-triangle-outline" />;

export type StartConfig = {
  api: ApiPromise;
  address: string;
  txMethod: string;
  params: unknown[];
};

type SignatureRef = {
  signExternal?: (value: SignerResult) => void;
  signInternal?: () => void;
};

function TxContextProvider({children}: PropTypes): React.ReactElement {
  const modalRef = useRef<Modalize>(null);
  const signatureRef = useRef<SignatureRef>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {api: apiPromise} = useApi();

  useEffect(() => {
    if (!apiPromise?.isConnected && state.view === 'submitting_view') {
      dispatch({
        type: 'SHOW_WARNING',
        payload: 'The transaction was sent but you got disconnected from the chain. Please verify later.',
      });
    }
  }, [apiPromise?.isConnected, state.view]);

  const start = useCallback(async (config: StartConfig) => {
    const {api, txMethod, params, address} = config;
    const [section, method] = txMethod.split('.');

    if (!section || !method) {
      throw new Error('section or method undefined');
    }

    if (!get(api.tx, [section, method])) {
      throw new Error(`Unable to find method ${section}.${method}`);
    }

    const transaction: SubmittableExtrinsic<'promise'> = api.tx[section]![method]!(...params);

    modalRef.current?.open();

    const {meta} = transaction.registry.findMetaCall(transaction.callIndex);
    const args = meta?.args.map(({name}) => name).join(', ') || '';
    const title = `Sending transaction ${section}.${method}(${args})`;
    const description = formatCallMeta(meta);
    const keyringPair = getPair(address);
    let signerFn;

    const showPreview = async (txPayload: SignerPayloadJSON) => {
      const info = await transaction.paymentInfo(address);
      dispatch({
        type: 'SHOW_TX_PREVIEW',
        payload: {
          txPayload: txPayload,
          params,
          title,
          description,
          partialFee: info.partialFee.toNumber(),
          isExternalAccount: keyringPair === undefined,
        },
      });
    };

    if (!keyringPair) {
      signerFn = async (txPayload: SignerPayloadJSON) => {
        await showPreview(txPayload);
        return new Promise((resolve: (value: SignerResult | PromiseLike<SignerResult>) => void) => {
          signatureRef.current = {
            signExternal: resolve,
          };
        });
      };
    } else {
      signerFn = async (txPayload: SignerPayloadJSON) => {
        await showPreview(txPayload);
        const signed = transaction.registry
          .createType('ExtrinsicPayload', txPayload, {version: txPayload.version})
          .sign(keyringPair);

        return new Promise((resolve: (value: SignerResult | PromiseLike<SignerResult>) => void) => {
          signatureRef.current = {
            signInternal: () => {
              resolve({id: ++id, ...signed});
            },
          };
        });
      };
    }

    try {
      const f = await transaction.signAsync(address, {
        nonce: -1,
        tip: BN_ZERO,
        signer: new AsyncSigner(signerFn),
      });

      await new Promise((resolve, reject) => {
        f.send((result) => {
          if (result.isFinalized && !result.isError) {
            dispatch({type: 'SHOW_SUCCESS_VIEW'});
            resolve(undefined);
          }
          if (result.isError && result.dispatchError) {
            let error;
            if (result.dispatchError.isModule) {
              // for module errors, we have the section indexed, lookup
              const decoded = api.registry.findMetaError(result.dispatchError.asModule);
              const {docs} = decoded;
              error = docs.join(' ').trim();
            } else {
              error = result.dispatchError.toString();
            }
            dispatch({type: 'SHOW_ERROR', payload: error});
            reject();
          }
        });
      });
    } catch (e) {
      console.warn('transaction error', e);
      dispatch({type: 'SHOW_ERROR', payload: String(e)});
    }
  }, []);

  const modalContent = useMemo(() => {
    switch (state.view) {
      case 'initial_view':
        return (
          <Layout style={styles.emptyState}>
            <Text>Preparing transaction payload...</Text>
          </Layout>
        );

      case 'tx_preview':
        return (
          <TxPreview
            transactionInfo={state.description}
            transactionTitle={state.title}
            txPayload={state.txPayload}
            params={state.params}
            partialFee={state.partialFee}
            onCancel={() => {
              modalRef.current?.close();
              dispatch({type: 'RESET'});
            }}
            isExternalAccount={state.isExternalAccount}
            onConfirm={() => {
              if (state.isExternalAccount) {
                dispatch({type: 'SHOW_QR_CODE_TX_PAYLOAD_VIEW', payload: {txPayload: state.txPayload}});
              } else {
                dispatch({type: 'SHOW_SUBMITTING_VIEW'});
                signatureRef.current?.signInternal?.();
              }
            }}
          />
        );

      case 'qr_code_tx_payload_view':
        return (
          <TxPayloadQr
            payload={state.txPayload}
            onCancel={() => {
              modalRef.current?.close();
              dispatch({type: 'RESET'});
            }}
            onConfirm={() => dispatch({type: 'SHOW_SCAN_SIGNATURE_VIEW'})}
          />
        );

      case 'scan_signature_view':
        return (
          <Layout style={globalStyles.paddedContainer}>
            <QRCodeScanner
              onRead={(data) => {
                dispatch({type: 'SHOW_SUBMITTING_VIEW'});
                signatureRef.current?.signExternal?.({
                  id: id++,
                  signature: `0x${data.data}`,
                });
              }}
              showMarker
              topContent={
                <Text style={styles.title} category="label">
                  Scanning ...
                </Text>
              }
              markerStyle={styles.marker}
              cameraStyle={styles.cameraBase}
              notAuthorizedView={
                <Layout style={styles.notAuthorized}>
                  <Layout style={styles.notAuthorizedHack}>
                    <AlertIcon style={styles.icon} />
                    <Text category="label">This requires your Camera permission to scan.</Text>
                  </Layout>
                </Layout>
              }
            />
          </Layout>
        );

      case 'submitting_view':
        return (
          <Layout style={styles.infoContainer}>
            <LoadingView
              text="Submitting"
              renderIcon={() => <Icon name="cloud-upload-outline" fill="#ccc" style={styles.iconText} />}
            />
          </Layout>
        );

      case 'success_view':
        return (
          <Layout style={styles.infoContainer}>
            <SuccessDialog
              text="Tx Success"
              onClosePress={() => {
                modalRef.current?.close();
                dispatch({type: 'RESET'});
              }}
            />
          </Layout>
        );

      case 'error_view':
        return (
          <Layout style={styles.infoContainer}>
            <ErrorDialog text="Tx Failed" msg={state.error} />
          </Layout>
        );

      case 'warning_view':
        return (
          <Layout style={styles.infoContainer}>
            <WarningDialog text="Tx Sent" msg={state.warning} />
          </Layout>
        );

      default:
        return null;
    }
  }, [state]);

  const contextValue: TxContextValueType = useMemo(() => ({start}), [start]);

  return (
    <TxContext.Provider value={contextValue}>
      {children}
      <Modalize
        ref={modalRef}
        threshold={250}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        adjustToContentHeight
        handlePosition="outside"
        onClosed={() => {
          dispatch({type: 'RESET'});
          signatureRef.current = undefined;
        }}
        closeOnOverlayTap
        panGestureEnabled>
        {modalContent}
      </Modalize>
    </TxContext.Provider>
  );
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
  resultContainer: {
    flex: 1,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: standardPadding * 2,
    marginBottom: standardPadding * 2,
  },
  buttonBlock: {flex: 1, marginLeft: standardPadding},
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modal: {},
  title: {
    padding: standardPadding * 2,
    marginBottom: standardPadding * 2,
    fontSize: 14,
  },
  icon: {
    width: 32,
    height: 32,
  },
  iconText: {
    width: 20,
    height: 20,
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
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default TxContextProvider;

type State =
  | {view: 'initial_view' | 'submitting_view' | 'success_view'}
  | {
      view: 'tx_preview';
      txPayload: SignerPayloadJSON;
      params: unknown[];
      title: string;
      description: string;
      partialFee: number;
      isExternalAccount: boolean;
    }
  | {view: 'qr_code_tx_payload_view'; txPayload: SignerPayloadJSON}
  | {view: 'scan_signature_view'}
  | {view: 'error_view'; error: string}
  | {view: 'warning_view'; warning: string};

const initialState: State = {view: 'initial_view'};

type Action =
  | {type: 'RESET'}
  | {
      type: 'SHOW_TX_PREVIEW';
      payload: {
        txPayload: SignerPayloadJSON;
        partialFee: number;
        params: unknown[];
        title: string;
        description: string;
        isExternalAccount: boolean;
      };
    }
  | {
      type: 'SHOW_QR_CODE_TX_PAYLOAD_VIEW';
      payload: {
        txPayload: SignerPayloadJSON;
      };
    }
  | {
      type: 'SHOW_SCAN_SIGNATURE_VIEW';
    }
  | {type: 'SHOW_SUBMITTING_VIEW'}
  | {type: 'SHOW_ERROR'; payload: string}
  | {type: 'SHOW_WARNING'; payload: string}
  | {type: 'SHOW_SUCCESS_VIEW'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'SHOW_TX_PREVIEW':
      return {view: 'tx_preview', ...action.payload};

    case 'SHOW_QR_CODE_TX_PAYLOAD_VIEW':
      return {view: 'qr_code_tx_payload_view', txPayload: action.payload.txPayload};

    case 'SHOW_SCAN_SIGNATURE_VIEW':
      return {view: 'scan_signature_view'};

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
