import React, {useRef, useMemo, useContext, useCallback, useReducer} from 'react';
import {Text, Layout, Divider, Button, TabView, Tab, Icon, IconProps, Input} from '@ui-kitten/components';
import {Modalize} from 'react-native-modalize';
import {useAccounts} from 'src/context/AccountsContext';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import ModalTitle from 'presentational/ModalTitle';
import {NetworkContext} from 'context/NetworkContext';
import {StyleSheet, Platform, Alert, View} from 'react-native';
import Padder from 'presentational/Padder';
import AddressInfoPreview from './AddressPreview';
import {ChainApiContext} from 'context/ChainApiContext';
import SuccessDialog from 'presentational/SuccessDialog';
import QRCamera from 'presentational/QRCamera';
import {parseAddress, isAddressValid} from 'src/utils';
import {Portal} from 'react-native-portalize';

export type InjectedPropTypes = {
  accountAddProps: {
    open: () => void;
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

function withAddAccount<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const modalRef = useRef<Modalize>();

    const {currentNetwork} = useContext(NetworkContext);
    const {api} = useContext(ChainApiContext);
    const {accounts, addAccount} = useAccounts();
    const account = accounts[0]; // TODO: change this when adding multi account suppport
    const [state, dispatch] = useReducer(addAccountReducer, initialState);
    const disabled = state.address.length === 0;

    const handleInputChange = (text: string) => {
      dispatch({type: 'SET_ADDRESS', payload: text});
    };

    const accountAddProps = useMemo(() => ({open: () => modalRef.current?.open(), account}), [account]);

    const handleScan = useCallback(({data}) => {
      const parsed = parseAddress(data);
      dispatch({type: 'SET_ADDRESS', payload: parsed.address});
    }, []);

    const handleConfirm = useCallback(() => {
      if (state.step === 'input') {
        if (isAddressValid(currentNetwork, state.address)) {
          dispatch({type: 'SET_STEP', payload: 'preview'});
          return;
        }

        Alert.alert('Validation Failed', 'Address is invalid.');
      }

      if (state.step === 'preview') {
        addAccount(currentNetwork.key, {address: state.address, name: ''});
        dispatch({type: 'SET_STEP', payload: 'success'});
        return;
      }

      if (state.step === 'success') {
        modalRef.current?.close();
        dispatch({type: 'RESET'});

        return;
      }
    }, [state.address, currentNetwork, state.step, addAccount]);

    const handleCancel = () => {
      modalRef.current?.close();
      dispatch({type: 'RESET'});
    };

    const confirmBtnDisabled = useMemo(() => {
      if (state.step === 'input') {
        return !currentNetwork;
      }

      return disabled;
    }, [disabled, state, currentNetwork]);

    const content = useMemo(() => {
      switch (state.step) {
        case 'input':
          return (
            <TabView
              shouldLoadComponent={(index) => {
                return state.tabIndex === index;
              }}
              indicatorStyle={styles.tabViewIndicator}
              style={styles.tabViewContainer}
              selectedIndex={state.tabIndex}
              onSelect={(index) => dispatch({type: 'SET_TAB_INDEX', payload: index})}>
              <Tab title={InputIcon}>
                <Layout style={styles.tabContainer}>
                  <Input
                    onChangeText={handleInputChange}
                    value={state.address}
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
        case 'preview':
          return <AddressInfoPreview address={state.address} api={api} network={currentNetwork} />;
        case 'success':
          return (
            <Layout style={globalStyles.dialogMinHeight}>
              <SuccessDialog text="Account import success" />
            </Layout>
          );
      }
    }, [state.step, state.tabIndex, state.address, currentNetwork, handleScan, api]);

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
            <Layout level="1" style={[globalStyles.paddedContainer, styles.modal]}>
              <ModalTitle title="Add Account" />
              <Divider />
              {content}
              <Divider style={globalStyles.divider} />
              <Layout style={styles.btnContainer}>
                {state.step !== 'success' ? (
                  <>
                    <Button style={styles.btn} appearance="ghost" status="danger" onPress={handleCancel}>
                      {'Cancel'}
                    </Button>
                    <View style={styles.gap20} />
                  </>
                ) : undefined}
                <Button style={styles.btn} appearance="ghost" disabled={confirmBtnDisabled} onPress={handleConfirm}>
                  {state.step === 'success' ? 'Close' : 'Confirm'}
                </Button>
              </Layout>
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
    minHeight: 90,
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
  btnContainer: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
  },
  gap20: {
    width: 20,
  },
});

export default withAddAccount;

/**
 * Reducer
 */
type StepType = 'input' | 'preview' | 'success';

type State = {
  tabIndex: number;
  step: StepType;
  address: string;
};

type Action =
  | {type: 'RESET'}
  | {type: 'SET_TAB_INDEX'; payload: number}
  | {type: 'SET_ADDRESS'; payload: string}
  | {type: 'SET_STEP'; payload: StepType};

const initialState: State = {
  tabIndex: 0,
  step: 'input',
  address: '',
};

function addAccountReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {...state, address: action.payload};
    case 'SET_STEP':
      return {...state, step: action.payload};
    case 'SET_TAB_INDEX':
      return {...state, tabIndex: action.payload};
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
