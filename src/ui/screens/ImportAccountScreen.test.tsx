import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {SecureKeychain} from 'src/service/SecureKeychain';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {ImportAccount} from './ImportAccountScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<AccountsStackParamList>;

const mnemonic = 'sausage walk outdoor final inner moral unknown else upgrade slim excite seed';

const mnemonicAddress = '16DY8qDD2E8Psayy53VjQQLu9j7kTP6JAFwBw9QmKfW2xwGW';

const password = 'NewPassword@02';

const mockKeyRingImp = {
  addAccount: jest.fn(() => Promise.resolve({address: mnemonicAddress})),
  createAccount: jest.fn(() => Promise.resolve()),
};

const mockCryptoUtil = {
  validateMnemonic: jest.fn(() => Promise.resolve({isValid: true, address: mnemonicAddress})),
};

jest.mock('@polkadotApi/useKeyring', () => {
  return {
    useKeyring: () => mockKeyRingImp,
  };
});

jest.mock('@polkadotApi/useCryptoUtil', () => {
  return {
    useCryptoUtil: () => mockCryptoUtil,
  };
});

describe('ImportAccount', () => {
  it('should render the ImportAccountScreen component with initial states', async () => {
    const {findAllByText, findByText, findByTestId} = render(<ImportAccount navigation={navigation} />);
    await findByText('Import Seed');
    await findAllByText('Existing mnemonic seed');
    await findAllByText('Descriptive name for the account');
    await findAllByText('New password for the account');
    await findAllByText('75% required');
    await findAllByText('Confirm password');
    expect(await findByTestId('import-seed-button')).toBeDisabled();
  });

  it('should import an new account using the existing mnemonic seed', async () => {
    const secureKeychainSpy = jest.spyOn(SecureKeychain, 'setPasswordByServiceId');
    const navigationSpy = jest.spyOn(navigation, 'navigate');
    const {findByText, findByTestId} = render(<ImportAccount navigation={navigation} />);
    await findByText('Import Seed');
    const importSeedButton = await findByTestId('import-seed-button');
    fireEvent.changeText(await findByTestId('mnemonic-seed'), mnemonic);

    await findByText('16DY8qDD2E8Psayy53VjQQLu9j7kTP6JAFwBw9QmKfW2xwGW');

    expect(importSeedButton).toBeDisabled();

    const accountDescription = await findByTestId('account-description');
    fireEvent.changeText(accountDescription, 'New Account');

    fireEvent.changeText(await findByTestId('password'), password);

    fireEvent.changeText(await findByTestId('confirm-password'), password);
    expect(importSeedButton).toBeEnabled();

    fireEvent.press(importSeedButton);

    waitFor(() => {
      expect(secureKeychainSpy).toHaveBeenCalledTimes(1);
      expect(navigationSpy).toBeCalled();
    });
  });
});
