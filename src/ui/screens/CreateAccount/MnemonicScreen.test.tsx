import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {MnemonicScreen} from './MnemonicScreen';
import React, {useState as useStateMock} from 'react';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

test('render the MnemonicScreen component', () => {
  const {getAllByText, getByText} = render(<MnemonicScreen navigation={navigation} />);
  expect(getAllByText('Generated mnemonic seed')).toBeTruthy();
  expect(
    getByText(
      'Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.',
    ),
  ).toBeTruthy();
  expect(getByText('Next')).toBeTruthy();
});

test('click on next button', async () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');

  const setMnemonic = jest.fn();
  const useStateMock: any = (useState: any) => [useState, setMnemonic];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  const {getByText, debug} = render(<MnemonicScreen navigation={navigation} />);

  await waitFor(() => {
    fireEvent.press(getByText('Next'));
    // debug()
    // expect(navigationSpy).toBeCalled()
  });
});
