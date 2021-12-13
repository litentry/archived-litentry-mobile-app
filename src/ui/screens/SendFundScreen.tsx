import React, {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import {useApi} from 'context/ChainApiContext';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Modalize} from 'react-native-modalize';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {sendFundScreen} from '@ui/navigation/routeKeys';
import {Button, Headline, IconButton, Text, TextInput} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {Layout} from '@ui/components/Layout';
import {standardPadding} from '@ui/styles';

type Props = {
  navigation: NavigationProp<AccountsStackParamList, typeof sendFundScreen>;
  route: RouteProp<AccountsStackParamList, typeof sendFundScreen>;
};

export function SendFundScreen({navigation, route}: Props) {
  const {address} = route.params;
  const ref = useRef<Modalize>(null);
  const [amount, setAmount] = React.useState('');
  const [to, setTo] = React.useState<string>();
  const [scanning, setScanning] = React.useState(false);
  const formatBalance = useFormatBalance();
  const {api} = useApi();
  const startTx = useApiTx();

  useEffect(() => {
    ref.current?.open();
  }, []);

  return (
    <Modalize ref={ref} adjustToContentHeight onClose={navigation.goBack} closeOnOverlayTap>
      <SafeView edges={noTopEdges}>
        {scanning ? (
          <View style={styles.container}>
            <Headline>Scanning...</Headline>
            <Padder scale={1} />
            <ScanQRCode
              onScanComplete={(_to) => {
                setTo(_to);
                setScanning(false);
              }}
            />
            <Padder scale={1} />
            <View style={styles.buttons}>
              <Button onPress={() => setScanning(false)} mode="outlined">
                Cancel
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <Headline>Send</Headline>
            <Padder scale={1} />
            <TextInput
              autoComplete="off"
              multiline={false}
              placeholder="Amount"
              keyboardType="decimal-pad"
              value={amount}
              onFocus={() => setAmount('')}
              onChangeText={(nextValue) => setAmount(nextValue.replace(/[^(\d+).(\d+)]/g, ''))}
              right={<TextInput.Affix text={(api && formatBalance(getBalanceFromString(api, amount))) ?? ''} />}
            />
            <Padder scale={1} />
            <TextInput
              autoComplete="off"
              placeholder="To"
              value={to}
              onChangeText={(nextValue) => setTo(nextValue)}
              right={<TextInput.Icon name="qrcode" onPress={() => setScanning(true)} />}
            />
            <Padder scale={1} />
            <View style={styles.buttons}>
              <Button
                onPress={() => {
                  if (api) {
                    const _amountBN = getBalanceFromString(api, amount);
                    startTx({
                      address,
                      txMethod: 'balances.transferKeepAlive',
                      params: [to, _amountBN],
                    })
                      .then(() => {
                        navigation.goBack();
                      })
                      .catch((e: Error) => {
                        console.warn(e);
                      });
                  }
                }}
                mode="outlined">
                Send
              </Button>
            </View>
            <Padder scale={3} />
          </View>
        )}
      </SafeView>
    </Modalize>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: standardPadding * 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

function ScanQRCode({onScanComplete}: {onScanComplete: (result: string) => void}) {
  return (
    <QRCodeScanner
      onRead={(data) => {
        onScanComplete(data.data);
      }}
      showMarker
      markerStyle={styles.marker}
      cameraStyle={styles.cameraBase}
      notAuthorizedView={
        <Layout style={styles.notAuthorized}>
          <Layout style={styles.notAuthorizedHack}>
            <IconButton icon="alert" disabled={true} />
            <Text>This requires your Camera permission to scan.</Text>
          </Layout>
        </Layout>
      }
    />
  );
}
