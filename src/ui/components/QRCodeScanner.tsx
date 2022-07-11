import React from 'react';
import {StyleSheet, View, Linking, ActivityIndicator} from 'react-native';
import {Camera, useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {BarcodeFormat, scanBarcodes, Barcode} from 'vision-camera-code-scanner';
import {runOnJS} from 'react-native-reanimated';
import {useCameraPermission} from 'src/hooks/useCameraPermission';
import {Subheading, Button} from '@ui/library';
import {Padder} from '@ui/components/Padder';

type Props = {
  onScan: (data: string) => void;
};

export function QRCodeScanner({onScan}: Props) {
  const {hasPermission, isAppActive} = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.back;

  const openAppSetting = async () => {
    await Linking.openSettings();
  };

  const processScannedResults = React.useCallback(
    (QRcodes: Barcode[]) => {
      QRcodes.forEach((code) => {
        if (code.displayValue) {
          onScan(code.displayValue);
        }
      });
    },
    [onScan],
  );

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const QRcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {checkInverted: true});
    runOnJS(processScannedResults)(QRcodes);
  }, []);

  if (!device) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.centeredContainer}>
        <Subheading>{`Need camera permission.`}</Subheading>
        <Padder />
        <Button onPress={openAppSetting} mode="outlined">
          Open Settings
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.centeredContainer}>
      <Camera
        style={styles.cameraView}
        device={device}
        isActive={isAppActive}
        frameProcessor={frameProcessor}
        frameProcessorFps={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraView: {
    width: '80%',
    height: '80%',
    borderRadius: 7,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
