import {NavigationContainerProps, NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {debug} from 'react-native-reanimated';
import {render} from 'src/testUtils';
import {ImportAccount} from './ImportAccountScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<AccountsStackParamList>;

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

  //   it('should render the ImportAccountScreen component', async() => {
  //   const {findAllByText, findByText, findByTestId} = render(<ImportAccount navigation={navigation} />);
  //  await findByText('Import Seed')
  //  await findAllByText('Existing mnemonic seed')
  //  await findAllByText('Descriptive name for the account')
  //  await findAllByText('New password for the account')
  //  await findAllByText('75% required')
  //  await findAllByText('Confirm password')
  //  expect(await findByTestId('import-seed-button')).toBeDisabled()
  // });
});
