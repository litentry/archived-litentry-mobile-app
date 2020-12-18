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
import {AccountAddressType} from 'src/types';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import ModalTitle from 'presentational/ModalTitle';
import {NetworkContext} from 'context/NetworkContext';
import {StyleSheet, Platform} from 'react-native';
import Padder from 'presentational/Padder';
import AddressInfoPreview from './AddressPreview';
import {ChainApiContext} from 'context/ChainApiContext';
import SuccessDialog from 'presentational/SuccessDialog';
import QRCamera from 'presentational/QRCamera';
import {parseAddress} from 'src/utils';

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
type StepType = 'input' | 'preview' | 'success';

function withAddAccount<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const modalRef = useRef<Modalize>();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {accounts, setAccount} = useContext(AccountContext);
    const {currentNetwork} = useContext(NetworkContext);
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
        setStep('preview');
      },
      [setAddress],
    );

    const handleConfirm = useCallback(() => {
      if (step === 'input') {
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
    }, [step, setAccount, address]);

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
                  <Padder scale={1} />
                  <Input
                    onChangeText={handleInputChange}
                    value={address}
                    multiline={true}
                    textStyle={styles.input}
                    placeholder="👉 Paste address here, e.g. 167r...14h"
                  />
                  {currentNetwork && (
                    <>
                      <Padder scale={0.2} />
                      <Layout style={styles.networkHint}>
                        <Icon
                          pack="ionic"
                          style={styles.inlineIcon}
                          name="information-circle-outline"
                        />
                        <Text>
                          Current network is{' '}
                          <Text status="info">{currentNetwork.name}</Text>
                        </Text>
                      </Layout>
                    </>
                  )}
                </Layout>
              </Tab>
              <Tab title={QrIcon}>
                <Layout style={styles.tabContainer}>
                  <QRCamera onRead={handleScan} />
                </Layout>
              </Tab>
            </TabView>
          );
        case 'preview':
          return <AddressInfoPreview address={address} api={api} />;
        case 'success':
          return (
            <Layout style={globalStyles.dialogMinHeight}>
              <SuccessDialog text="Account import success" />
            </Layout>
          );
      }
    }, [address, currentNetwork, selectedIndex, api, step, handleScan]);

    return (
      <>
        <Comp {...props} accountAddProps={accountAddProps} />
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
            <ModalTitle
              title="Add Account"
              subtitle={` (@${currentNetwork?.name || 'Unknown Network'})`}
            />
            <Divider />
            {content}
            <Divider style={globalStyles.divider} />
            <Button
              appearance="ghost"
              disabled={disabled}
              onPress={handleConfirm}>
              {step === 'success' ? 'Close' : 'Confirm'}
            </Button>
          </Layout>
        </Modalize>
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
