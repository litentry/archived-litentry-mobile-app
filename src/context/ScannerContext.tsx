import React, {
  createContext,
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Text, Layout, Button, Icon, IconProps} from '@ui-kitten/components';
import {standardPadding} from 'src/styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {QRScannedPayload} from 'src/types';

const {width, height} = Dimensions.get('window');

type ScannerContextValueType = {
  scan: () => void;
  data: {result: QRScannedPayload | null};
};

export const ScannerContext = createContext<ScannerContextValueType>({
  scan: () => undefined,
  data: {result: null},
});

type PropTypes = {
  children: React.ReactNode;
};

const QRIcon = (props: IconProps) => (
  <Icon fill="#ccc" {...props} name="alert-triangle-outline" />
);

function ScannerContextProvider({children}: PropTypes) {
  const modalRef = useRef<Modalize>(null);

  // used for internal rendering, will eventually be used `onConfirm`
  const [scannedResult, setScannedResult] = useState<QRScannedPayload | null>(
    null,
  );

  // use for `context value`, which will trigger subscribed comp to update
  const [result, setResult] = useState<QRScannedPayload | null>(null);
  const scan = useCallback(() => {
    setScannedResult(null);
    modalRef.current?.open();
  }, []);

  const handleScannerRead = useCallback((payload: QRScannedPayload) => {
    setScannedResult(payload);
  }, []);

  const handleReset = useCallback(() => {
    setScannedResult(null);
  }, []);

  const handleConfirm = useCallback(() => {
    setResult(scannedResult);
    modalRef.current?.close();
  }, [scannedResult]);

  const data = useMemo(() => ({result}), [result]);

  return (
    <ScannerContext.Provider value={{scan, data}}>
      <>
        {children}
        <Modalize
          ref={modalRef}
          threshold={250}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          adjustToContentHeight
          handlePosition="outside"
          closeOnOverlayTap
          panGestureEnabled>
          <Layout style={styles.modal}>
            {scannedResult ? (
              <Layout style={styles.resultContainer}>
                <Text style={styles.title} category="label">
                  Scanned Result
                </Text>
                <Text style={{marginTop: -50}} category="s1">
                  {scannedResult.data}
                </Text>
                <Layout style={styles.buttonGroup}>
                  <Button appearance="outline" onPress={handleReset}>
                    Retake
                  </Button>
                  <Button
                    style={styles.buttonBlock}
                    onPress={handleConfirm}
                    appearance="filled">
                    Confirm
                  </Button>
                </Layout>
              </Layout>
            ) : (
              <QRCodeScanner
                // @ts-ignore
                onRead={handleScannerRead}
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
                      <QRIcon style={styles.icon} />
                      <Text category="label">
                        This requires your Camera permission to scan.
                      </Text>
                    </Layout>
                  </Layout>
                }
              />
            )}
          </Layout>
        </Modalize>
      </>
    </ScannerContext.Provider>
  );
}

const styles = StyleSheet.create({
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

export default ScannerContextProvider;
