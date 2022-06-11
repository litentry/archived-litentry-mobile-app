import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import React from 'react';
import {VerifyMnemonicScreen} from './VerifyMnemonic';
import {verifyMnemonicScreen} from '@ui/navigation/routeKeys';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    mnemonic: '',
  },
} as RouteProp<AccountsStackParamList, typeof verifyMnemonicScreen>;

test('render the VerifyMnemonicScreen component', () => {
  const {getByText, getAllByText} = render(<VerifyMnemonicScreen navigation={navigation} route={route} />);
  expect(getByText('Verify your mnemonic by selecting the words in the correct order.')).toBeTruthy();
  expect(getAllByText('Mnemonic seed')).toBeTruthy();
  expect(getByText('Next')).toBeTruthy();
  expect(getByText('Reset')).toBeTruthy();
});

test('button check', () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');

  const {getByText} = render(<VerifyMnemonicScreen navigation={navigation} route={route} />);
  const resetButton = getByText('Reset');
  fireEvent.press(resetButton);

  const nextButton = getByText('Next');
  fireEvent.press(nextButton);
  // expect(navigationSpy).toBeCalled()
});
