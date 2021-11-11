import {NavigationProp} from '@react-navigation/native';
import {Button, Divider, Icon, IconProps, Input, Layout, Tab, TabView, Text} from '@ui-kitten/components';
import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import ModalTitle from 'presentational/ModalTitle';
import Padder from 'presentational/Padder';
import QRCamera from 'presentational/QRCamera';
import SuccessDialog from 'presentational/SuccessDialog';
import React, {useCallback, useContext, useEffect, useMemo, useReducer, useRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import AddressInfoPreview from './AddressPreview';
import {AppStackParamList} from 'src/navigation/navigation';
import {default as globalStyles, monofontFamily, standardPadding} from 'src/styles';
import {isAddressValid, parseAddress} from 'src/utils';
import {useAccounts} from 'context/AccountsContext';
import SafeView, {noTopEdges} from 'presentational/SafeView';

export function AddAccountScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const ref = useRef<Modalize>(null);
  useEffect(() => {
    ref.current?.open();
  }, []);

  const {currentNetwork} = useContext(NetworkContext);
  const [state, dispatch] = useReducer(addAccountReducer, initialState);
  const {api} = useContext(ChainApiContext);
  const {addAccount} = useAccounts();

  const handleInputChange = (text: string) => {
    dispatch({type: 'SET_ADDRESS', payload: text});
  };

  const handleConfirm = useCallback(() => {
    if (state.step === 'input') {
      if (isAddressValid(currentNetwork, state.address)) {
        dispatch({type: 'SET_STEP', payload: 'preview'});
        return;
      }

      Alert.alert('Validation Failed', 'Address is invalid.');
    }

    if (state.step === 'preview') {
      addAccount({
        address: state.address,
        meta: {name: '', network: currentNetwork.key, isFavorite: false},
        isExternal: true,
      });
      dispatch({type: 'SET_STEP', payload: 'success'});
      return;
    }

    if (state.step === 'success') {
      navigation.goBack();

      return;
    }
  }, [addAccount, currentNetwork, navigation, state.address, state.step]);

  const handleScan = useCallback(
    ({data}) => {
      const parsed = parseAddress(data);
      if (isAddressValid(currentNetwork, parsed.address)) {
        dispatch({type: 'SET_ADDRESS', payload: parsed.address});
        dispatch({type: 'SET_STEP', payload: 'preview'});
      }
    },
    [currentNetwork],
  );

  const disabled = state.address.length === 0;
  const confirmBtnDisabled = useMemo(() => {
    if (state.step === 'input') {
      return !currentNetwork;
    }

    return disabled;
  }, [disabled, state, currentNetwork]);

  return (
    <Modalize
      ref={ref}
      adjustToContentHeight
      onClose={() => {
        // timeout fixes a warning about animation event handling
        // not sure what is the problem
        setTimeout(navigation.goBack, 0);
      }}
      closeOnOverlayTap
      panGestureEnabled={false}>
      <SafeView edges={noTopEdges}>
        <Layout style={styles.modal}>
          <ModalTitle title="Add Account" />
          <Divider />
          {(() => {
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
          })()}
          <Divider style={globalStyles.divider} />
          <Layout style={styles.btnContainer}>
            {state.step !== 'success' ? (
              <>
                <Button style={styles.btn} appearance="ghost" status="danger" onPress={navigation.goBack}>
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
      </SafeView>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modal: {
    paddingTop: standardPadding * 2,
    paddingBottom: standardPadding,
  },
  tabViewContainer: {
    height: 410,
  },
  tabTitle: {
    flexDirection: 'row',
  },
  tabContainer: {
    padding: standardPadding,
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

const QrIcon = (props: IconProps) => (
  <View style={styles.tabTitle}>
    <Text category="s1">Via QR</Text>
    <Padder scale={0.5} />
    <Icon {...props} pack="ionic" name="qr-code-sharp" />
  </View>
);

const InputIcon = (props: IconProps) => (
  <View style={styles.tabTitle}>
    <Text category="s1">Type in</Text>
    <Padder scale={0.5} />
    <Icon {...props} pack="ionic" name="keypad-outline" />
  </View>
);

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
