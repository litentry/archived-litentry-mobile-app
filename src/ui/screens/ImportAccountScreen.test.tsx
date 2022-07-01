import {NavigationContainerProps, NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {debug} from 'react-native-reanimated';
import {fireEvent, render} from 'src/testUtils';
import {ImportAccount} from './ImportAccountScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<AccountsStackParamList>;

const mnemonic = 'sausage walk outdoor final inner moral unknown else upgrade slim excite seed';

const password = 'NewPassword@02';

describe('ImportAccount', () => {
  it('should render the ImportAccountScreen component', async () => {
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
    const {findByText, findByPlaceholderText, findByTestId, debug, findByLabelText} = render(
      <ImportAccount navigation={navigation} />,
    );
    await findByText('Import Seed');
    fireEvent.changeText(await findByTestId('mnemonic-seed'), mnemonic);
    expect(await findByTestId('import-seed-button')).toBeDisabled();
    // fireEvent.changeText(await findByLabelText('Descriptive name for the account'))
    // fireEvent.changeText(await findByPlaceholderText('Enter account description'))
    fireEvent.changeText(await findByTestId('account-description'), 'NewAccount');
    fireEvent.changeText(await findByTestId('password'), password);
    fireEvent.changeText(await findByTestId('confirm-password'), password);
    // expect(await findByTestId('import-seed-button')).toBeEnabled();
    debug();
  });
});
