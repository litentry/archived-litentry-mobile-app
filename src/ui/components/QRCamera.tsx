import React, {useCallback} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {standardPadding} from '@ui/styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent} from 'react-native-camera';
import {Layout, Icon, Text, IconProps} from '@ui-kitten/components';
const {width, height} = Dimensions.get('window');

const QRIcon = (props: IconProps) => <Icon {...props} pack="ionic" name="qr-code-sharp" />;

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
            <QRIcon style={styles.icon} />
            <Text category="label">This requires your Camera permission to scan.</Text>
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
  title: {
    padding: standardPadding * 2,
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
