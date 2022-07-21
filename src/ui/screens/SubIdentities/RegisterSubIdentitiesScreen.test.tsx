import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {fireEvent, render} from 'src/testUtils';
import {RegisterSubIdentitiesScreen} from './RegisterSubIdentitiesScreen';
import {registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';
import {Alert} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';

const navigation = {
  navigate: () => jest.fn(),
  setOptions: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof registerSubIdentitiesScreen>;

describe('RegisterSubIdentitiesScreen', () => {
  it('should render the AddSubIdentity component', async () => {
    const {findByText, findByTestId} = render(<RegisterSubIdentitiesScreen navigation={navigation} route={route} />);
    await findByText('Set sub-identities after adding/removing your accounts.');
    expect(await findByText('Set Sub-identities')).toBeEnabled();
    await findByText('Sub-identities (1)');
    await findByText('Set sub-identities after adding/removing your accounts.');
    expect(await findByTestId('set-sub-identity-button')).toBeDisabled();
  });

  it('should be able to delete the sub-identities', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const {findAllByTestId} = render(<RegisterSubIdentitiesScreen navigation={navigation} route={route} />);
    fireEvent.press((await findAllByTestId('delete-button'))[0] as ReactTestInstance);
    expect(alertSpy).toBeCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(
      'Remove sub-identity',
      'Do you want to remove account: \n 14ghKTz5mjZPgGYvgVC9VnFw1HYZmmsnYvSSHFgFTJfMvwQS ?',
      [
        {onPress: expect.any(Function), text: 'Yes'},
        {style: 'cancel', text: 'Cancel'},
      ],
      {cancelable: false},
    );
  });
});
