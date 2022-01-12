import React, {useCallback} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent} from 'react-native-camera';
import {Icon, Paragraph} from '@ui/library';
import {Layout} from '@ui/components/Layout';
const {width, height} = Dimensions.get('window');

type PropTypes = {
  onRead: (payload: BarCodeReadEvent) => void;
};

function QRCamera(props: PropTypes) {
  const {onRead} = props;

  const handleScannerRead = useCallback(
    (payload: BarCodeReadEvent) => {
      onRead(payload);
    },
    [onRead],
  );

  return (
    <QRCodeScanner
      onRead={handleScannerRead}
      showMarker
      markerStyle={styles.marker}
      cameraStyle={styles.cameraBase}
      containerStyle={styles.container}
      notAuthorizedView={
        <Layout style={styles.notAuthorized}>
          <Layout style={styles.notAuthorizedHack}>
            <Icon name="qrcode-scan" size={32} />
            <Paragraph>This requires your Camera permission to scan.</Paragraph>
          </Layout>
        </Layout>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  marker: {
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderWidth: 4,
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
  notAuthorized: {
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAuthorizedHack: {
    marginTop: -100,
    alignItems: 'center',
  },
});

export default QRCamera;
