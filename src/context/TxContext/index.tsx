import React, {createContext, useState, useMemo, useCallback, useRef, useContext} from 'react';
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
import {ChainApiContext} from '../ChainApiContext';
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

type StepType = 'payload' | 'signature' | 'submitting' | 'error' | 'success' | 'none';

function TxContextProvider({children}: PropTypes) {
  const modalRef = useRef<Modalize>(null);
  const signatureRef = useRef<(value: SignerResult) => void>();
  const {api: chainApi} = useContext(ChainApiContext);
  const [errorMsg, setErrorMsg] = useState('Unknown Error');
  const [, setInProgress] = useState(false);
  const [step, setStep] = useState<StepType>('none');
  const [signerPayload, setSignerPayload] = useState<SignerPayloadJSON>();

  const reset = useCallback(() => {
    setStep('none');
    signatureRef.current = undefined;
    setSignerPayload(undefined);
    setErrorMsg('Unknown Error');
  }, []);

  const handleSignatureScan = useCallback(
    (data: QRScannedPayload) => {
      setInProgress(true);
      setStep('submitting');
      signatureRef.current?.({
        id: id++,
        signature: `0x${data.data}`,
      });
    },
    [setInProgress, setStep],
  );

  // TODO: could the api be removed and replaces with `chainApi`
  const start = useCallback(async (api: ApiPromise, address: string, txMethod: string, params: unknown[]) => {
    const [section, method] = txMethod.split('.');

    if (!section || !method) {
      throw new Error('section or method undefined');
    }

    if (!get(api.tx, [section, method])) {
      throw new Error(`Unable to find method ${section}.${method}`);
    }

    const transaction: SubmittableExtrinsic<'promise'> = api.tx[section]![method]!(...params);

    modalRef.current?.open();

    try {
      const f = await transaction.signAsync(address, {
        nonce: -1,
        tip: BN_ZERO,
        signer: new QrSigner((payload) => {
          setSignerPayload(payload);
          setStep('payload');

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
                  return error?.toString();
                }
              },
            );

          if (errors.length === 0 && status.isFinalized) {
            setInProgress(false);
            setStep('success');
          }

          if (errors.length !== 0) {
            setStep('error');
            setInProgress(false);
            setErrorMsg(errors[0] ?? 'Unknown Error');
          }
        }
      });
    } catch (e) {
      setStep('error');
    }
  }, []);

  const value = useMemo(
    () => ({
      start,
    }),
    [start],
  );

  const modalContent = useMemo(() => {
    switch (step) {
      case 'none':
        return (
          <Layout style={styles.emptyState}>
            <Text>Preparing transaction payload...</Text>
          </Layout>
        );
      case 'payload':
        return signerPayload && chainApi ? (
          <Layout>
            <TxPayloadQr
              api={chainApi}
              payload={signerPayload}
              onCancel={() => {
                modalRef.current?.close();
                setSignerPayload(undefined);
              }}
              onConfirm={() => setStep('signature')}
            />
          </Layout>
        ) : null;
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
            <SuccessDialog text="Tx Success" />
          </Layout>
        );

      case 'error':
        return (
          <Layout style={styles.infoContainer}>
            <ErrorDialog text="Tx Failed" msg={errorMsg} />
          </Layout>
        );
      case 'signature':
        return (
          // TODO: extract
          <Layout>
            <QRCodeScanner
              onRead={handleSignatureScan}
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
  }, [step, signerPayload, handleSignatureScan, chainApi, errorMsg]);

  return (
    <TxContext.Provider value={value}>
      {children}
      <Modalize
        ref={modalRef}
        threshold={250}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        adjustToContentHeight
        handlePosition="outside"
        onClosed={reset}
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
