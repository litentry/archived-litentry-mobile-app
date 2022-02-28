import React, {useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Divider, Button, Tabs, TabScreen, TextInput} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {NetworkContext} from 'context/NetworkContext';
import {Padder} from '@ui/components/Padder';
import QRCamera from '@ui/components/QRCamera';
import SuccessDialog from '@ui/components/SuccessDialog';
import {Modalize} from 'react-native-modalize';
import AddressInfoPreview from './AddressPreview';
import {AppStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {isAddressValid, parseAddress} from 'src/utils/address';
import {useAccounts} from 'context/AccountsContext';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import ModalTitle from '@ui/components/ModalTitle';

export function AddAccountScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const ref = useRef<Modalize>(null);
  useEffect(() => {
    ref.current?.open();
  }, []);

  const {currentNetwork} = useContext(NetworkContext);
  const [state, dispatch] = useReducer(addAccountReducer, initialState);
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
      try {
        const parsed = parseAddress(data);
        if (isAddressValid(currentNetwork, parsed.address)) {
          dispatch({type: 'SET_ADDRESS', payload: parsed.address});
          dispatch({type: 'SET_STEP', payload: 'preview'});
        } else {
          Alert.alert('Validation Failed', 'Please scan the address from the correct network');
        }
      } catch (e) {
        Alert.alert('Validation Failed', 'Address is invalid.');
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

  const [tabIndex, setTabIndex] = useState(0);

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
        <Layout>
          <ModalTitle title="Add external account" />
          {(() => {
            switch (state.step) {
              case 'input':
                return (
                  <View style={styles.tabViewContainer}>
                    <Tabs onChangeIndex={(index) => setTabIndex(index)}>
                      <TabScreen label="Type in" icon="keyboard">
                        <View style={globalStyles.paddedContainer}>
                          <TextInput
                            style={styles.input}
                            mode="outlined"
                            onChangeText={handleInputChange}
                            value={state.address}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="👉 Paste address here, e.g. 167r...14h"
                          />
                        </View>
                      </TabScreen>
                      <TabScreen label="Via QR" icon="qrcode">
                        <View style={globalStyles.paddedContainer}>
                          {tabIndex === 1 && <QRCamera onRead={handleScan} />}
                        </View>
                      </TabScreen>
                    </Tabs>
                  </View>
                );
              case 'preview':
                return <AddressInfoPreview address={state.address} network={currentNetwork} />;
              case 'success':
                return <SuccessDialog text="Account import success" />;
            }
          })()}
          <Divider />
          <Padder scale={1} />
          <View style={styles.btnContainer}>
            {state.step !== 'success' ? (
              <Button mode="outlined" onPress={navigation.goBack}>
                {'Cancel'}
              </Button>
            ) : undefined}
            <Button mode="contained" disabled={confirmBtnDisabled} onPress={handleConfirm}>
              {state.step === 'success' ? 'Close' : 'Confirm'}
            </Button>
          </View>
        </Layout>
      </SafeView>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 90,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: standardPadding,
  },
  tabViewContainer: {
    minHeight: 400,
  },
});

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
