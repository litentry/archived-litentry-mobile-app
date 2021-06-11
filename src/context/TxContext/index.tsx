import React, {createContext, useState, useMemo, useCallback, useRef, useReducer} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {ApiPromise} from '@polkadot/api';
import {get} from 'lodash';
import {SubmittableExtrinsic} from '@polkadot/api/submittable/types';
import {Modalize} from 'react-native-modalize';
import {Layout, Text, IconProps, Icon} from '@ui-kitten/components';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {standardPadding} from 'src/styles';
import {SignerPayloadJSON, SignerResult} from '@polkadot/types/types';
import {BN_ZERO} from '@polkadot/util';
import {QRScannedPayload} from 'src/types';
import QrSigner from 'src/service/QrSigner';
import TxPayloadQr from 'presentational/TxPayloadQr';
import LoadingView from 'presentational/LoadingView';
import SuccessDialog from 'presentational/SuccessDialog';
import ErrorDialog from 'presentational/ErrorDialog';
let id = 0;

const {width, height} = Dimensions.get('window');

type PropTypes = {children: React.ReactNode};
type TxContextValueType = {
  start: (api: ApiPromise, address: string, tx: string, params: unknown[]) => Promise<void>;
};

export const TxContext = createContext<TxContextValueType>({
  start: () => Promise.resolve(),
});

const AlertIcon = (props: IconProps) => <Icon fill="#ccc" {...props} name="alert-triangle-outline" />;

function TxContextProvider({children}: PropTypes) {
  const modalRef = useRef<Modalize>(null);
  const signatureRef = useRef<(value: SignerResult) => void>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = useCallback(async (api: ApiPromise, address: string, txMethod: string, params: unknown[]) => {
    const [section, method] = txMethod.split('.');

    if (!get(api.tx, [section, method])) {
      throw new Error(`Unable to find method ${section}.${method}`);
    }

    const transaction: SubmittableExtrinsic<'promise'> = api.tx[section][method](...params);

    modalRef.current?.open();

    try {
      const f = await transaction.signAsync(address, {
        nonce: -1,
        tip: BN_ZERO,
        signer: new QrSigner((payload) => {
          dispatch({type: 'PAYLOAD', payload: payload});

          return new Promise((resolve) => {
            signatureRef.current = resolve;
          });
        }),
      });

      await f.send(({status, events}) => {
        if (status.isInBlock || status.isFinalized) {
          const errors = events
            // find/filter for failed events
            .filter(({event: {section, method}}) => section === 'system' && method === 'ExtrinsicFailed')
            // we know that data for system.ExtrinsicFailed is
            // (DispatchError, DispatchInfo)
            .map(
              ({
                event: {
                  data: [error],
                },
              }) => {
                if ((error as any).isModule) {
                  // for module errors, we have the section indexed, lookup
                  const decoded = api.registry.findMetaError((error as any).asModule);
                  const {documentation} = decoded;

                  return documentation.join(' ').trim();
                } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  return error.toString();
                }
              },
            );

          if (errors.length === 0 && status.isFinalized) {
            dispatch({type: 'NEXT_STEP'});
          }

          if (errors.length !== 0) {
            dispatch({type: 'ERROR', payload: errors[0]});
          }
        }
      });
    } catch (e) {
      dispatch({type: 'ERROR', payload: e});
    }
  }, []);

  const value = useMemo(() => ({start}), [start]);

  const modalContent = useMemo(() => {
    switch (state.step) {
      case 'none':
        return (
          <Layout style={styles.emptyState}>
            <Text>Preparing transaction payload...</Text>
          </Layout>
        );
      case 'payload':
        return (
          <TxPayloadQr
            transactionInfo={'test'}
            transactionTitle={'set an account'}
            payload={state.payload}
            onCancel={() => {
              modalRef.current?.close();
              dispatch({type: 'RESET'});
            }}
            onConfirm={() => dispatch({type: 'NEXT_STEP'})}
          />
        );
      case 'submitting':
        return (
          <Layout style={styles.infoContainer}>
            <LoadingView
              text="Submitting"
              renderIcon={() => <Icon name="cloud-upload-outline" fill="#ccc" style={styles.iconText} />}
            />
          </Layout>
        );
      case 'success':
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

      case 'error':
        return (
          <Layout style={styles.infoContainer}>
            <ErrorDialog text="Tx Failed" msg={state.error} />
          </Layout>
        );
      case 'signature':
        return (
          // TODO: extract
          <Layout>
            <QRCodeScanner
              onRead={(data) => {
                dispatch({type: 'NEXT_STEP'});
                signatureRef.current?.({
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
      default:
        return null;
    }
  }, [state]);

  return (
    <TxContext.Provider value={value}>
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
  | {step: 'none' | 'signature' | 'submitting' | 'success'}
  | {step: 'payload'; payload: SignerPayloadJSON}
  | {step: 'error'; error: string};

const initialState: State = {step: 'none'};

type Action =
  | {type: 'RESET'}
  | {type: 'NEXT_STEP'}
  | {type: 'ERROR'; payload: string}
  | {type: 'PAYLOAD'; payload: SignerPayloadJSON};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'ERROR':
      return {step: 'error', error: action.payload};

    case 'PAYLOAD':
      return {step: 'payload', payload: action.payload};

    case 'NEXT_STEP': {
      switch (state.step) {
        case 'payload':
          return {step: 'signature'};
        case 'signature':
          return {step: 'submitting'};
        case 'submitting':
          return {step: 'success'};
      }
      break;
    }
  }
  return state;
}
