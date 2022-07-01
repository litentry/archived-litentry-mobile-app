import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render} from 'src/testUtils';
import {ImportAccountWithJsonFileScreen} from './ImportAccountWithJsonFileScreen';

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<AccountsStackParamList>;

describe('ImportAccountWithJsonFileScreen', () => {
  it('should render the ImportAccountScreen component', async () => {
    const {findByText, findAllByText} = render(<ImportAccountWithJsonFileScreen navigation={navigation} />);
    await findByText('Add via backup file');
    await findByText('Supply a backed-up JSON file, encrypted with your account-specific password.');
    await findByText('Pick the json file');
    await findAllByText('Password');
    await findByText('Restore');
  });
});
