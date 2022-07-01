import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render} from 'src/testUtils';
import {ImportAccountWithJsonFileScreen} from './ImportAccountWithJsonFileScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<AccountsStackParamList>;

test('render the ImportAccountScreen component', () => {
  const {getByText, getAllByText} = render(<ImportAccountWithJsonFileScreen navigation={navigation} />);
  expect(getByText('Add via backup file')).toBeTruthy();
  expect(getByText('Supply a backed-up JSON file, encrypted with your account-specific password.')).toBeTruthy();
  expect(getByText('Pick the json file')).toBeTruthy();
  expect(getAllByText('Password')).toBeTruthy();
  expect(getByText('Restore')).toBeTruthy();
});
