import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {exportAccountWithJsonFileScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {fireEvent, render} from 'src/testUtils';
import {ExportAccountWithJsonFileScreen} from './ExportAccountWithJsonFileScreen';

jest.useFakeTimers();

const navigation = {} as unknown as NavigationProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof exportAccountWithJsonFileScreen>;

describe('ExportAccountWithJsonFileScreen', () => {
  it('should render the ExportAccountWithJsonFileScreen component', async () => {
    const {findByText, findAllByText} = render(
      <ExportAccountWithJsonFileScreen navigation={navigation} route={route} />,
    );
    await findByText('14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a');
    await findAllByText('Password');
    await findByText('Export');
  });

  it('should backup the account details into JSON file', async () => {
    const {findByTestId, findByPlaceholderText} = render(
      <ExportAccountWithJsonFileScreen navigation={navigation} route={route} />,
    );
    const exportButton = await findByTestId('export-button');
    expect(exportButton).toBeDisabled();
    const password = await findByPlaceholderText('Enter account password');
    fireEvent.changeText(password, 'NewPassword');
    expect(exportButton).toBeEnabled();
  });
});
