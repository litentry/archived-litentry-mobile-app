import React, {useEffect, useMemo, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Modalize} from 'react-native-modalize';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {sendFundScreen} from '@ui/navigation/routeKeys';
import {Button, Headline, IconButton, Text, TextInput, Switch, HelperText} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {Layout} from '@ui/components/Layout';
import {standardPadding} from '@ui/styles';
import BalanceInput from '@ui/components/BalanceInput';
import {useAccount} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';
import {InputLabel} from '@ui/library/InputLabel';
import {useSnackbar} from 'context/SnackbarContext';
import {BN_ZERO} from '@polkadot/util';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {stringToBn as stringToBnUtil, formattedStringToBn} from 'src/api/utils/balance';
import AddressInput from '@ui/components/AddressInput';

type Props = {
  navigation: NavigationProp<AccountsStackParamList, typeof sendFundScreen>;
  route: RouteProp<AccountsStackParamList, typeof sendFundScreen>;
};

export function SendFundScreen({navigation, route}: Props) {
  const {address} = route.params;
  const {data: accountInfo} = useAccount(address);
  const ref = useRef<Modalize>(null);
  const [amount, setAmount] = React.useState('');
  const [toAddress, setToAddress] = React.useState<string>();
  const [scanning, setScanning] = React.useState(false);
  const [isToAddressValid, setIsToAddressValid] = React.useState(false);
  const startTx = useApiTx();
  const {data: chainInfo} = useChainInfo();
  const [isKeepAliveActive, setIsKeepAliveActive] = React.useState(true);
  const snackbar = useSnackbar();
  const {stringToBn} = useFormatBalance();
  useEffect(() => {
    ref.current?.open();
  }, []);

  const isEnteredBalanceValid = useMemo(() => {
    const enteredBalance = stringToBn(amount) ?? BN_ZERO;
    if (isKeepAliveActive) {
      const keepAliveBalance = formattedStringToBn(accountInfo?.balance?.free).sub(
        formattedStringToBn(chainInfo?.existentialDeposit),
      );
      return enteredBalance.gt(BN_ZERO) && enteredBalance.lt(keepAliveBalance);
    }
    return enteredBalance.gt(BN_ZERO) && enteredBalance.lt(formattedStringToBn(accountInfo?.balance?.free));
  }, [amount, accountInfo, stringToBn, isKeepAliveActive, chainInfo]);

  const isSendDisabled = !isEnteredBalanceValid || !isToAddressValid;

  return (
    <Modalize ref={ref} adjustToContentHeight onClose={navigation.goBack} closeOnOverlayTap>
      <SafeView edges={noTopEdges}>
        {scanning ? (
          <View style={styles.container}>
            <Headline>Scanning...</Headline>
            <Padder scale={1} />
            <ScanQRCode
              onScanComplete={(_to) => {
                setToAddress(_to);
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
            <InputLabel label="Enter amount" helperText="Type the amount you want to transfer" />
            <BalanceInput account={accountInfo} onChangeBalance={setAmount} initialBalance={amount} />
            <Padder scale={0.5} />
            <InputLabel
              label="Send to address"
              helperText="Scan a contact address or paste the address you want to send funds to."
            />
            <AddressInput onValidateAddress={setIsToAddressValid} onAddressChanged={setToAddress} />
            <Padder scale={1} />
            <InputLabel
              label="Existential deposit"
              helperText="The minimum amount that an account should have to be deemed active"
            />
            <TextInput dense mode="outlined" disabled defaultValue={chainInfo?.formattedExistentialDeposit} />
            <Padder scale={1} />
            <View style={styles.keepAlive}>
              <View style={styles.keepAliveContainer}>
                {isKeepAliveActive ? (
                  <HelperText type="info">Transfer with account keep-alive checks</HelperText>
                ) : (
                  <HelperText type="info">Normal transfer without keep-alive checks</HelperText>
                )}
              </View>
              <Switch value={isKeepAliveActive} onValueChange={() => setIsKeepAliveActive(!isKeepAliveActive)} />
            </View>
            <Padder scale={1} />
            <View style={styles.buttons}>
              <Button
                onPress={() => {
                  if (chainInfo) {
                    const _amountBN = stringToBnUtil(chainInfo.registry, amount);
                    startTx({
                      address,
                      txMethod: `${isKeepAliveActive ? `balances.transferKeepAlive` : `balances.transfer`}`,
                      params: [toAddress, _amountBN],
                    })
                      .then(() => {
                        snackbar('Funds transferred');
                        navigation.goBack();
                      })
                      .catch(() => {
                        snackbar('Error while transferring funds');
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
    paddingVertical: standardPadding * 2,
  },
  keepAliveContainer: {
    paddingVertical: 5,
    paddingHorizontal: standardPadding,
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
