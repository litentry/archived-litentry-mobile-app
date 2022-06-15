import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from '@ui/navigation/navigation';
import {render} from 'src/testUtils';
import {RegisterSubIdentitiesScreen} from './RegisterSubIdentitiesScreen';
import {registerSubIdentitiesScreen} from '@ui/navigation/routeKeys';

jest.useFakeTimers();

const navigation = {
  navigate: () => jest.fn(),
  setOptions: () => jest.fn,
} as unknown as NavigationProp<AccountsStackParamList>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof registerSubIdentitiesScreen>;

test('render the AddSubIdentity component', () => {
  const {getByText} = render(<RegisterSubIdentitiesScreen navigation={navigation} route={route} />);
  expect(getByText('Set Sub-identities')).toBeTruthy();
  expect(getByText('Sub-identities (0)')).toBeTruthy();
  expect(getByText('Set sub-identities after adding/removing your accounts.')).toBeTruthy();
  expect(getByText('No sub-identities set.')).toBeTruthy();
});
