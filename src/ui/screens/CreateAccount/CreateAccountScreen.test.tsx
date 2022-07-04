import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent} from 'src/testUtils';
import {CreateAccountScreen} from './CreateAccountScreen';
import {createAccountScreen} from '@ui/navigation/routeKeys';
import {useKeyring} from '@polkadotApi/useKeyring';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    mnemonic: 'west bar upon arena all remove return era local spoon edge use',
  },
} as RouteProp<AccountsStackParamList, typeof createAccountScreen>;

const mockCreateAddressFromMnemonic = jest.fn(() => Promise.resolve());
const mockAddAccount = jest.fn(() => Promise.resolve());

jest.mock('@polkadotApi/useKeyring', () => {
  return {
    useKeyring: () => ({
      createAddressFromMnemonic: mockCreateAddressFromMnemonic,
      addAccount: mockAddAccount,
    }),
  };
});

const accountName = 'New Account';
const accountStrongPassword = 'NotWeakPassword@01';
const accountWeakPassword = 'weak';

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
    const {getByPlaceholderText, findByTestId} = render(<CreateAccountScreen navigation={navigation} route={route} />);
    const weakPassword = await findByTestId('weak-password');
    fireEvent.changeText(getByPlaceholderText('New password'), accountWeakPassword);
    expect(weakPassword).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('New password'), accountStrongPassword);
  });

  it('should input all the fields to add a new account', async () => {
    mockAddAccount.mockImplementation(() => Promise.resolve());
    const {findByPlaceholderText, findByTestId} = render(<CreateAccountScreen navigation={navigation} route={route} />);
    const submitButton = await findByTestId('submit-button');
    expect(submitButton).toBeDisabled();
    fireEvent.changeText(await findByPlaceholderText('Descriptive name'), accountName);
    fireEvent.changeText(await findByPlaceholderText('New password'), accountStrongPassword);
    fireEvent.changeText(await findByPlaceholderText('Confirm password'), accountStrongPassword);
    expect(submitButton).toBeEnabled();
    fireEvent.press(submitButton);
    expect(mockAddAccount).toHaveBeenCalledWith({
      mnemonic: route.params.mnemonic,
      name: accountName,
      network: 'polkadot',
      password: accountStrongPassword,
      isExternal: false,
      isFavorite: false,
    });
  });
});
