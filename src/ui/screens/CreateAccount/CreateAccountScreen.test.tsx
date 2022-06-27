import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
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

describe('CreateAccountScreen', () => {
  it('should render the CreateAccountScreen component', async () => {
    const {findByText, findAllByText, findByTestId} = render(
      <CreateAccountScreen navigation={navigation} route={route} />,
    );
    const submitButton = await findByTestId('submit-button');
    await findAllByText('Mnemonic seed');
    await findByText(
      'Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.',
    );
    await findByText('Descriptive name for the account');
    await findByText('New password for the account');
    await findByText('Confirm password');
    await findByText('Password is too weak');
    await findByText('75% required');
    expect(submitButton).toBeDisabled();
  });

  it('should test if the entered password is weak or strong', async () => {
    const {getByPlaceholderText, getByText, findByTestId, debug} = render(
      <CreateAccountScreen navigation={navigation} route={route} />,
    );
    const weakPassword = await findByTestId('weak-password');
    fireEvent.changeText(getByPlaceholderText('New password'), 'weak');
    expect(weakPassword).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('New password'), 'NotWeakPassword');
    // expect(weakPassword).toBeFalsy()
  });

  it('should input all the fields to add a new account', async () => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByPlaceholderText, getByText, findByTestId, findByLabelText} = render(
      <CreateAccountScreen navigation={navigation} route={route} />,
    );
    const submitButton = await findByTestId('submit-button');
    expect(submitButton).toBeDisabled();
    fireEvent.changeText(await findByPlaceholderText('Descriptive name'), 'New Account');
    fireEvent.changeText(await findByPlaceholderText('New password'), 'NotWeakPassword');
    fireEvent.changeText(await findByPlaceholderText('Confirm password'), 'NotWeakPassword');
    // expect(getByText('Password is too weak')).toBe(null)
    expect(submitButton).toBeEnabled();
    fireEvent.press(submitButton);
    // expect(navigationSpy).toBeCalledWith('')
  });
});
