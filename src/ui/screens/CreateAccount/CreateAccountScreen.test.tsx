import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {CreateAccountScreen} from './CreateAccountScreen';
import {createAccountScreen} from '@ui/navigation/routeKeys';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    mnemonic: '',
  },
} as RouteProp<AccountsStackParamList, typeof createAccountScreen>;

test('render the CreateAccountScreen component', () => {
  const {getAllByText, getByText} = render(<CreateAccountScreen navigation={navigation} route={route} />);
  expect(getAllByText('Mnemonic seed')).toBeTruthy();
  expect(
    getByText(
      'Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.',
    ),
  ).toBeTruthy();
  expect(getAllByText('Descriptive name for the account')).toBeTruthy();
  expect(getAllByText('New password for the account')).toBeTruthy();
  expect(getAllByText('Confirm password')).toBeTruthy();
  expect(getByText('Password is too weak')).toBeTruthy();
  expect(getByText('75% required')).toBeTruthy();
  expect(getByText('Submit')).toBeTruthy();
});

// test('Weak password confirmation', () => {
//   const {getByPlaceholderText, getByText} = render(<CreateAccountScreen navigation={navigation} route={route} />);
//   expect(getByPlaceholderText('New password for the account')).toBeTruthy()
//   expect(getByText('Password is too weak')).toBeTruthy()

// });
