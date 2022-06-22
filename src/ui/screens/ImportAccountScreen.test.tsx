import {NavigationContainerProps, NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render} from 'src/testUtils';
import {ImportAccount} from './ImportAccountScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<AccountsStackParamList>;

test('render the ImportAccountScreen component', () => {
  const {getAllByText} = render(<ImportAccount navigation={navigation} />);
  expect(getAllByText('Import seed')).toBeTruthy();
  expect(getAllByText('Import json')).toBeTruthy();
  expect(getAllByText('Existing mnemonic seed')).toBeTruthy();
  expect(getAllByText('Descriptive name for the account')).toBeTruthy();
  expect(getAllByText('New password for the account')).toBeTruthy();
  expect(getAllByText('75% required')).toBeTruthy();
  expect(getAllByText('Confirm password')).toBeTruthy();
});

// test('valid mnemonic seed', () => {
//   const {getByText} = render(<ImportAccountScreen />);
//   expect(getByText('Existing mnemonic seed')).toBeTruthy();
// });
