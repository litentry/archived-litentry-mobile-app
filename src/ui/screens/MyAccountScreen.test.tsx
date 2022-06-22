import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList, AppStackParamList, CompleteNavigatorParamList} from '@ui/navigation/navigation';
import {manageIdentityScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {MyAccountScreen} from './MyAccountScreen';

jest.useFakeTimers();

const navigation = {} as unknown as NavigationProp<CompleteNavigatorParamList>;

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AccountsStackParamList, typeof manageIdentityScreen>;

// TODO: fix stringShorten error
test('render the loading component when data is fetching', () => {
  const {getByTestId} = render(<MyAccountScreen navigation={navigation} route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});
