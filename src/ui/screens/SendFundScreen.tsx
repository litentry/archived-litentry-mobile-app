import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Modalize} from 'react-native-modalize';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {stringToBn} from 'src/api/utils/balance';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {sendFundScreen} from '@ui/navigation/routeKeys';
import {Button, Headline, IconButton, Text, TextInput, Switch} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {Layout} from '@ui/components/Layout';
import {standardPadding} from '@ui/styles';
import BalanceInput from '@ui/components/BalanceInput';
import {useAccount} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';
import {InputLabel} from '@ui/library/InputLabel';
import {NetworkContext} from 'context/NetworkContext';
import {isAddressValid} from 'src/utils/address';
import SnackbarProvider, {useSnackbar} from 'context/SnackbarContext';

type Props = {
  navigation: NavigationProp<AccountsStackParamList, typeof sendFundScreen>;
  route: RouteProp<AccountsStackParamList, typeof sendFundScreen>;
};

export function SendFundScreen({navigation, route}: Props) {
  const {address} = route.params;
  const {data: accountInfo} = useAccount(address);
  const ref = useRef<Modalize>(null);
  const [amount, setAmount] = React.useState('');
  const [to, setTo] = React.useState<string>();
  const [scanning, setScanning] = React.useState(false);
  const startTx = useApiTx();
  const {data: chainInfo} = useChainInfo();
  const [isKeepAlive, setisKeepAlive] = React.useState(true);
  const {currentNetwork} = useContext(NetworkContext);
  const snackbar = useSnackbar();

  useEffect(() => {
    ref.current?.open();
  }, [accountInfo]);

  const isAccountValid = useMemo(() => {
    return to ? isAddressValid(currentNetwork, to) : false;
  }, [to, currentNetwork]);

  const isSendDisabled = !amount || !to || !isAccountValid;

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
            <Headline>Send funds</Headline>
            <Padder scale={1} />
            <InputLabel
              label="Enter amount"
              helperText="Type the amount you want to transfer. Note that you can select the unit on the right e.g sending 1 milli is equivalent to sending 0.001."
            />
            <BalanceInput account={accountInfo} onChangeBalance={setAmount} />
            <Padder scale={1} />
            <InputLabel
              label="Send to address"
              helperText="Scan a contact address or paste the address you want to send funds to."
            />
            <TextInput
              autoComplete="off"
              placeholder="To"
              value={to}
              onChangeText={(nextValue) => setTo(nextValue)}
              right={<TextInput.Icon name="qrcode" onPress={() => setScanning(true)} />}
            />
            <Padder scale={1} />
            <InputLabel
              label="Existential deposit"
              helperText="The minimum amount that an account should have to be deemed active"
            />
            <TextInput disabled defaultValue={accountInfo?.balance.formattedExistentialDeposit} />
            <Padder scale={1} />
            <View style={styles.keepAlive}>
              <View style={styles.keepAliveContainer}>
                {isKeepAlive ? (
                  <Text>Transfer with account keep-alive checks</Text>
                ) : (
                  <Text>Normal transfer without keep-alive checks</Text>
                )}
              </View>
              <Switch value={isKeepAlive} onValueChange={() => setisKeepAlive(!isKeepAlive)} />
            </View>
            <Padder scale={1} />
            <View style={styles.buttons}>
              <Button
                onPress={() => {
                  if (chainInfo) {
                    const _amountBN = stringToBn(chainInfo.registry, amount);
                    startTx({
                      address,
                      txMethod: `${isKeepAlive ? `balances.transferKeepAlive` : `balances.transferKeepAlive`}`,
                      params: [to, _amountBN],
                    })
                      .then(() => {
                        snackbar('Funds transfered');
                        navigation.goBack();
                      })
                      .catch((e: Error) => {
                        console.warn(e);
                      });
                  }
                }}
                mode="outlined"
                disabled={isSendDisabled}
                icon={'send-outline'}>
                Make Transfer
              </Button>
            </View>
            <Padder />
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
  keepAlive: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 15,
  },
  keepAliveContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
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
