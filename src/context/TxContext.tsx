/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {createContext, useCallback, useEffect, useMemo, useReducer, useRef, useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SubstrateSign from 'react-native-substrate-sign';
import {SubmittableExtrinsic} from '@polkadot/api/submittable/types';
import {SignerPayloadJSON, SignerResult} from '@polkadot/types/types';
import {ExtrinsicPayload} from '@polkadot/types/interfaces';
import {BN_ZERO, hexToU8a, u8aConcat, u8aToHex} from '@polkadot/util';
import {ApiPromise} from '@polkadot/api';
import {get} from 'lodash';

import {formatCallMeta} from 'src/utils/callMetadata';
import AsyncSigner from 'src/service/AsyncSigner';
import {useAccounts} from 'context/AccountsContext';
import {useApi} from 'context/ChainApiContext';
import LoadingView from '@ui/components/LoadingView';
import {AuthenticateView} from '@ui/components/Tx/AuthenticateView';
import {PayloadQrCodeView} from '@ui/components/Tx/PayloadQrCodeView';
import {ErrorDialog} from '@ui/components/Tx/ErrorDialog';
import {SuccessDialog} from '@ui/components/SuccessDialog';
import {WarningDialog} from '@ui/components/Tx/WarningDialog';
import {Layout} from '@ui/components/Layout';
import {TxPreview} from '@ui/components/Tx/Preview';
import {Subheading, Caption, Icon, useBottomSheet} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';

let id = 0;

const {width, height} = Dimensions.get('window');

type TxProviderProps = {
  children: React.ReactNode;
};
type TxContextValueType = {
  start: (config: StartConfig) => Promise<void>;
};

const TxContext = createContext<TxContextValueType>({
  start: () => Promise.resolve(),
});

export type StartConfig = {
  api: ApiPromise;
  address: string;
  txMethod: string;
  params: unknown[];
};

export function TxProvider({children}: TxProviderProps): React.ReactElement {
  const {BottomSheet, openBottomSheet, closeBottomSheet} = useBottomSheet();
  const signTransactionRef = useRef<(value: SignerResult) => void>();
  const showPreviewRef = useRef<(txPayload: SignerPayloadJSON, seed?: string) => Promise<void>>();
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
  const {accounts} = useAccounts();

  const start = useCallback(
    async (config: StartConfig) => {
      const {api, txMethod, params, address} = config;
      const [section, method] = txMethod.split('.');

      if (!section || !method) {
        throw new Error('section or method undefined');
      }

      if (!get(api.tx, [section, method])) {
        throw new Error(`Unable to find method ${section}.${method}`);
      }

      const transaction: SubmittableExtrinsic<'promise'> = api.tx[section]![method]!(...params);

      openBottomSheet();

      const {meta} = transaction.registry.findMetaCall(transaction.callIndex);
      const args = meta?.args.map(({name}) => name).join(', ') || '';
      const title = `Sending transaction ${section}.${method}(${args})`;
      const description = formatCallMeta(meta);
      const isExternal = Boolean(accounts[address]?.isExternal);

      showPreviewRef.current = async (txPayload: SignerPayloadJSON, seed?: string) => {
        const info = await transaction.paymentInfo(address);
        if (isExternal) {
          dispatch({
            type: 'SHOW_TX_PREVIEW',
            payload: {
              txPayload: txPayload,
              params,
              title,
              description,
              partialFee: info.partialFee.toNumber(),
              isExternalAccount: true,
            },
          });
        } else {
          if (!seed) {
            throw new Error('Seed is required for non-external accounts');
          }
          const wrapper: ExtrinsicPayload = transaction.registry.createType('ExtrinsicPayload', txPayload, {
            version: txPayload.version,
          });

          const signable = u8aToHex(wrapper.toU8a(true), -1, false);
          let signed = await SubstrateSign.substrateSign(seed, signable);
          signed = '0x' + signed;
          const SIG_TYPE_SR25519 = new Uint8Array([1]);
          const sig = u8aConcat(SIG_TYPE_SR25519, hexToU8a(signed));
          const signature = u8aToHex(sig, -1);

          dispatch({
            type: 'SHOW_TX_PREVIEW',
            payload: {
              txPayload: txPayload,
              params,
              title,
              description,
              partialFee: info.partialFee.toNumber(),
              isExternalAccount: false,
              signature: {id: ++id, signature},
            },
          });
        }
      };

      try {
        const f = await transaction.signAsync(address, {
          nonce: -1,
          tip: BN_ZERO,
          signer: new AsyncSigner(async (txPayload) => {
            if (!isExternal) {
              dispatch({type: 'SHOW_AUTHENTICATE_VIEW', payload: {txPayload, address}});
            } else {
              showPreviewRef.current?.(txPayload);
            }
            return new Promise((resolve) => {
              signTransactionRef.current = resolve;
            });
          }),
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
          }).catch((error) => {
            reject(error.message);
          });
        });
      } catch (e) {
        console.warn('transaction error', e);
        dispatch({type: 'SHOW_ERROR', payload: String(e)});
      }
    },
    [accounts, openBottomSheet],
  );

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
            onAuthenticate={(seed) => {
              showPreviewRef.current?.(state.txPayload, seed);
            }}
          />
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
              closeBottomSheet();
              dispatch({type: 'RESET'});
            }}
            isExternalAccount={state.isExternalAccount}
            onConfirm={() => {
              if (state.isExternalAccount) {
                dispatch({type: 'SHOW_QR_CODE_TX_PAYLOAD_VIEW', payload: {txPayload: state.txPayload}});
              } else {
                dispatch({type: 'SHOW_SUBMITTING_VIEW'});
                signTransactionRef.current?.(state.signature);
              }
            }}
          />
        );

      case 'qr_code_tx_payload_view':
        return (
          <PayloadQrCodeView
            payload={state.txPayload}
            onCancel={() => {
              closeBottomSheet();
              dispatch({type: 'RESET'});
            }}
            onConfirm={() => dispatch({type: 'SHOW_SCAN_SIGNATURE_VIEW'})}
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
                signTransactionRef.current?.({
                  id: id++,
                  signature: `0x${data.data}`,
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
            <SuccessDialog
              text="Tx Success"
              onClosePress={() => {
                closeBottomSheet();
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
  }, [state, closeBottomSheet]);

  const contextValue: TxContextValueType = useMemo(() => ({start}), [start]);

  const onCloseBottomSheet = useCallback(() => {
    dispatch({type: 'RESET'});
    signTransactionRef.current = undefined;
  }, [signTransactionRef]);

  return (
    <TxContext.Provider value={contextValue}>
      {children}
      <BottomSheet onClose={onCloseBottomSheet}>{modalContent}</BottomSheet>
    </TxContext.Provider>
  );
}

export function useTx() {
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
  | {view: 'authenticate_view'; txPayload: SignerPayloadJSON; address: string; seed?: string}
  | {
      view: 'tx_preview';
      txPayload: SignerPayloadJSON;
      params: unknown[];
      title: string;
      description: string;
      partialFee: number;
      isExternalAccount: true;
    }
  | {
      view: 'tx_preview';
      txPayload: SignerPayloadJSON;
      params: unknown[];
      title: string;
      description: string;
      partialFee: number;
      isExternalAccount: false;
      signature: SignerResult;
    }
  | {view: 'qr_code_tx_payload_view'; txPayload: SignerPayloadJSON}
  | {view: 'scan_signature_view'}
  | {view: 'error_view'; error: string}
  | {view: 'warning_view'; warning: string};

const initialState: State = {view: 'initial_view'};

type Action =
  | {type: 'RESET'}
  | {
      type: 'SHOW_AUTHENTICATE_VIEW';
      payload: {
        txPayload: SignerPayloadJSON;
        address: string;
        seed?: string;
      };
    }
  | {
      type: 'SHOW_TX_PREVIEW';
      payload:
        | {
            txPayload: SignerPayloadJSON;
            partialFee: number;
            params: unknown[];
            title: string;
            description: string;
            isExternalAccount: true;
          }
        | {
            txPayload: SignerPayloadJSON;
            partialFee: number;
            params: unknown[];
            title: string;
            description: string;
            isExternalAccount: false;
            signature: SignerResult;
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

    case 'SHOW_AUTHENTICATE_VIEW':
      return {
        view: 'authenticate_view',
        txPayload: action.payload.txPayload,
        seed: action.payload.seed,
        address: action.payload.address,
      };

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
