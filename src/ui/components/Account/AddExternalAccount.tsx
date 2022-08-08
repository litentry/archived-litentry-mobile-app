import React from 'react';
import {Alert, StyleSheet, View, Keyboard} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Divider, Button, useTheme, Text, BottomSheetTextInput} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {useNetwork} from '@atoms/network';
import {Padder} from '@ui/components/Padder';
import {QRCodeScanner} from '@ui/components/QRCodeScanner';
import {SuccessDialog} from '@ui/components/SuccessDialog';
import globalStyles, {standardPadding} from '@ui/styles';
import {parseAddress} from 'src/utils/address';
import {AddressInfoPreview} from '@ui/components/Account/AddressPreview';
import {useKeyring} from '@polkadotApi/useKeyring';
import {useIsAddressValid} from 'src/hooks/useIsAddressValid';

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

type Props = {
  onClose: () => void;
};

const Tab = createMaterialTopTabNavigator();

export function AddExternalAccount({onClose}: Props) {
  const {currentNetwork} = useNetwork();
  const [state, dispatch] = React.useReducer(addAccountReducer, initialState);
  const {addExternalAccount} = useKeyring();
  const {colors} = useTheme();
  const {isValid: isValidAddress, isAddressValid} = useIsAddressValid(currentNetwork, state.address);

  const handleInputChange = (text: string) => {
    dispatch({type: 'SET_ADDRESS', payload: text});
  };

  const close = React.useCallback(() => {
    Keyboard.dismiss();
    onClose();
    dispatch({type: 'RESET'});
  }, [onClose]);

  const handleConfirm = React.useCallback(() => {
    if (state.step === 'input') {
      if (isValidAddress) {
        dispatch({type: 'SET_STEP', payload: 'preview'});
        return;
      }

      Alert.alert('Validation Failed', 'Address is invalid.');
    }

    if (state.step === 'preview') {
      addExternalAccount({
        name: '',
        address: state.address,
        network: currentNetwork.key,
      });

      dispatch({type: 'SET_STEP', payload: 'success'});
      return;
    }

    if (state.step === 'success') {
      close();
      return;
    }
  }, [addExternalAccount, currentNetwork, state.address, state.step, close, isValidAddress]);

  const handleScan = React.useCallback(
    (data: string) => {
      try {
        const parsed = parseAddress(data);
        isAddressValid(parsed.address).then((isValid) => {
          if (isValid) {
            dispatch({type: 'SET_ADDRESS', payload: parsed.address});
            dispatch({type: 'SET_STEP', payload: 'preview'});
          } else {
            Alert.alert(
              'Validation Failed',
              `${parsed.address} is not a valid address for the ${currentNetwork.name} network.`,
              [{text: 'Ok'}],
            );
          }
        });
      } catch (e) {
        Alert.alert('Validation Failed', 'Address is invalid.', [{text: 'Ok'}]);
      }
    },
    [currentNetwork, isAddressValid],
  );

  const disabled = state.address.length === 0;
  const confirmBtnDisabled = state.step === 'input' && disabled;

  const TypeInTabScreen = React.useCallback(() => {
    return (
      <View style={globalStyles.paddedContainer}>
        <BottomSheetTextInput
          style={[styles.input]}
          onChangeText={handleInputChange}
          value={state.address}
          multiline={true}
          numberOfLines={4}
          placeholder="👉 Paste address here, e.g. 167r...14h"
        />
      </View>
    );
  }, [state.address]);

  const ViaQRTabScreen = React.useCallback(() => {
    return (
      <View style={[globalStyles.paddedContainer, globalStyles.flex]}>
        <QRCodeScanner onScan={handleScan} />
      </View>
    );
  }, [handleScan]);

  return (
    <Layout>
      <Text variant="titleMedium" style={globalStyles.textCenter}>{`Add External Account`}</Text>
      {(() => {
        switch (state.step) {
          case 'input':
            return (
              <View style={styles.tabViewContainer}>
                <Tab.Navigator
                  screenOptions={{
                    tabBarLabelStyle: {color: colors.secondary},
                    tabBarStyle: {backgroundColor: colors.background},
                  }}>
                  <Tab.Screen name="Type in" component={TypeInTabScreen} />
                  <Tab.Screen name="Via QR" component={ViaQRTabScreen} options={{lazy: true}} />
                </Tab.Navigator>
              </View>
            );
          case 'preview':
            return <AddressInfoPreview address={state.address} />;
          case 'success':
            return <SuccessDialog text="Account import success" />;
        }
      })()}
      <Divider />
      <Padder scale={1} />
      <View style={styles.btnContainer}>
        {state.step !== 'success' ? (
          <Button mode="outlined" onPress={close}>
            {'Cancel'}
          </Button>
        ) : undefined}
        <Button mode="contained" disabled={confirmBtnDisabled} onPress={handleConfirm}>
          {state.step === 'success' ? 'Close' : 'Confirm'}
        </Button>
      </View>
      <Padder scale={2} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 90,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: standardPadding * 2,
    paddingTop: standardPadding * 2,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: standardPadding,
  },
  tabViewContainer: {
    minHeight: 300,
  },
});
