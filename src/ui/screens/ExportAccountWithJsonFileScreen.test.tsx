import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {exportAccountWithJsonFileScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {ExportAccountWithJsonFileScreen} from './ExportAccountWithJsonFileScreen';
import Share from 'react-native-share';

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
    const blobToBase64Spy = jest.spyOn(FileReader.prototype, 'readAsDataURL');
    const backUpAccountDetailsSpy = jest.spyOn(Share, 'open');
    const {findByTestId} = render(<ExportAccountWithJsonFileScreen navigation={navigation} route={route} />);
    const exportButton = await findByTestId('export-button');
    expect(exportButton).toBeDisabled();
    const password = await findByTestId('password-id');
    fireEvent.changeText(password, 'NewPassword');
    expect(exportButton).toBeEnabled();
    fireEvent.press(exportButton);
    waitFor(() => {
      expect(backUpAccountDetailsSpy).not.toBeCalled();
    });
    expect(blobToBase64Spy).toBeCalled();
  });
});
