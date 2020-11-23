import React, {createContext, useRef, useCallback, useState} from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Text, Layout, Button, Icon, IconProps} from '@ui-kitten/components';
import {standardPadding} from 'src/styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const {width, height} = Dimensions.get('window');

type ScannerContextValueType = {
  scan: () => void;
};
export const ScannerContext = createContext<ScannerContextValueType>({
  scan: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

const QRIcon = (props: IconProps) => (
  <Icon fill="#ccc" {...props} name="alert-triangle-outline" />
);

type QRData = {data: string};

function ScannerContextProvider({children}: PropTypes) {
  const modalRef = useRef<Modalize>(null);
  const [result, setResult] = useState<string | undefined>();
  const scan = useCallback(() => {
    modalRef.current?.open();
  }, []);

  const handleSuccess = useCallback(({data}: QRData) => {
    setResult(data);
  }, []);

  return (
    <ScannerContext.Provider value={{scan}}>
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
            {result ? (
              <Layout style={styles.resultContainer}>
                <Text style={styles.title} category="label">
                  Scanned Result
                </Text>
                <Text style={{marginTop: -50}} category="s1">
                  {result}
                </Text>
                <Layout style={styles.buttonGroup}>
                  <Button
                    appearance="outline"
                    onPress={() => setResult(undefined)}>
                    Retake
                  </Button>
                  <Button style={styles.buttonBlock} appearance="filled">
                    Confirm
                  </Button>
                </Layout>
              </Layout>
            ) : (
              <QRCodeScanner
                onRead={handleSuccess}
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
