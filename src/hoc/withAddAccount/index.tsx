import React, {useRef, useMemo, useContext, useCallback, useState} from 'react';
import {
  Text,
  Layout,
  Divider,
  Button,
  TabView,
  Tab,
  Icon,
  IconProps,
  Input,
} from '@ui-kitten/components';
import {Modalize} from 'react-native-modalize';
import {AccountContext} from 'context/AccountContextProvider';
import {AccountAddressType, NetworkType} from 'src/types';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import ModalTitle from 'presentational/ModalTitle';
import {NetworkContext} from 'context/NetworkContext';
import {StyleSheet, Platform, Alert} from 'react-native';
import Padder from 'presentational/Padder';
import AddressInfoPreview from './AddressPreview';
import {ChainApiContext} from 'context/ChainApiContext';
import SuccessDialog from 'presentational/SuccessDialog';
import QRCamera from 'presentational/QRCamera';
import {parseAddress, isAddressValid} from 'src/utils';
import {Portal} from 'react-native-portalize';
import NetworkSelection from 'presentational/NetworkSelection';

export type InjectedPropTypes = {
  accountAddProps: {
    open: () => void;
    account: AccountAddressType | void;
  };
};

const QrIcon = (props: IconProps) => (
  <Layout style={styles.tabTitle}>
    <Text category="s1">Via QR</Text>
    <Padder scale={0.5} />
    <Icon {...props} pack="ionic" name="qr-code-sharp" />
  </Layout>
);

const InputIcon = (props: IconProps) => (
  <Layout style={styles.tabTitle}>
    <Text category="s1">Type in</Text>
    <Padder scale={0.5} />
    <Icon {...props} pack="ionic" name="keypad-outline" />
  </Layout>
);
type StepType = 'input' | 'preview' | 'success' | 'selectNetwork';

function withAddAccount<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const modalRef = useRef<Modalize>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {accounts, setAccount} = useContext(AccountContext);
    const {availableNetworks} = useContext(NetworkContext);
    const [network, setNetwork] = useState<NetworkType>();
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState<StepType>('input');
    const [address, setAddress] = useState('');
    const {api} = useContext(ChainApiContext);
    const account = accounts?.[0];
    const open = useCallback(() => {
      modalRef.current?.open();
    }, []);
    const handleInputChange = (text: string) => {
      setAddress(text);
      setDisabled(!text.length);
    };
    const accountAddProps = useMemo(
      () => ({
        open,
        account,
      }),
      [open, account],
    );

    const handleScan = useCallback(
      ({data}) => {
        const parsed = parseAddress(data);
        setAddress(parsed.address);
        setDisabled(false);
        setStep('selectNetwork');
      },
      [setAddress],
    );

    const handleConfirm = useCallback(() => {
      if (step === 'input') {
        if (network && isAddressValid(network, address)) {
          setStep('preview');
          return;
        }

        Alert.alert(
          'Validation Failed',
          'Either network or address is invalid.',
        );
      }

      if (step === 'selectNetwork') {
        setStep('preview');
        return;
      }

      if (step === 'preview') {
        setAccount({name: '', address});
        setStep('success');
        return;
      }

      if (step === 'success') {
        modalRef.current?.close();
        setStep('input');
        setAddress('');
        setDisabled(true);
        return;
      }
    }, [step, setAccount, address, network]);

    const confirmBtnDisabled = useMemo(() => {
      if (step === 'input' || step === 'selectNetwork') {
        return !network;
      }

      return disabled;
    }, [disabled, step, network]);

    const content = useMemo(() => {
      switch (step) {
        case 'input':
          return (
            <TabView
              shouldLoadComponent={(index) => {
                return selectedIndex === index;
              }}
              indicatorStyle={styles.tabViewIndicator}
              style={styles.tabViewContainer}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}>
              <Tab title={InputIcon}>
                <Layout style={styles.tabContainer}>
                  <NetworkSelection
                    data={availableNetworks}
                    onSelect={setNetwork}
                  />
                  <Padder scale={1} />
                  <Input
                    onChangeText={handleInputChange}
                    value={address}
                    multiline={true}
                    textStyle={styles.input}
                    placeholder="👉 Paste address here, e.g. 167r...14h"
                  />
                </Layout>
              </Tab>
              <Tab title={QrIcon}>
                <Layout style={styles.tabContainer}>
                  <QRCamera onRead={handleScan} />
                </Layout>
              </Tab>
            </TabView>
          );

        case 'selectNetwork':
          return (
            <Layout
              style={[
                styles.tabContainer,
                {minHeight: 200, marginTop: standardPadding * 2},
              ]}>
              <NetworkSelection
                data={availableNetworks}
                onSelect={setNetwork}
              />
            </Layout>
          );

        case 'preview':
          return (
            network && (
              <AddressInfoPreview
                address={address}
                api={api}
                network={network}
              />
            )
          );
        case 'success':
          return (
            <Layout style={globalStyles.dialogMinHeight}>
              <SuccessDialog text="Account import success" />
            </Layout>
          );
      }
    }, [
      address,
      network,
      availableNetworks,
      selectedIndex,
      api,
      step,
      handleScan,
      setNetwork,
    ]);

    return (
      <>
        <Comp {...props} accountAddProps={accountAddProps} />
        <Portal>
          <Modalize
            ref={modalRef}
            threshold={250}
            scrollViewProps={{showsVerticalScrollIndicator: false}}
            adjustToContentHeight
            handlePosition="outside"
            closeOnOverlayTap
            panGestureEnabled>
            <Layout
              level="1"
              style={[globalStyles.paddedContainer, styles.modal]}>
              <ModalTitle title="Add Account" />
              <Divider />
              {content}
              <Divider style={globalStyles.divider} />
              <Button
                appearance="ghost"
                disabled={confirmBtnDisabled}
                onPress={handleConfirm}>
                {step === 'success' ? 'Close' : 'Confirm'}
              </Button>
            </Layout>
          </Modalize>
        </Portal>
      </>
    );
  };
}

const styles = StyleSheet.create({
  modal: {marginBottom: Platform.OS === 'ios' ? standardPadding : 0},
  tabViewContainer: {
    paddingVertical: standardPadding * 2,
    height: 410,
  },
  tabTitle: {
    flexDirection: 'row',
  },
  tabContainer: {
    paddingVertical: standardPadding,
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 16,
    minHeight: 74,
    fontFamily: monofontFamily,
  },
  tabViewIndicator: {
    height: 1,
  },
  networkHint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineIcon: {
    width: 20,
    height: 20,
    marginRight: standardPadding / 2,
  },
});

export default withAddAccount;
