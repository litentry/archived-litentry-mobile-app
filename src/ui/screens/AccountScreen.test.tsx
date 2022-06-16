import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {AccountScreen} from './AccountScreen';
import {accountScreen} from '@ui/navigation/routeKeys';

const route = {
  params: {
    address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
  },
} as RouteProp<AppStackParamList, typeof accountScreen>;

test('render the loading view when data is fetching', () => {
  const {getByTestId} = render(<AccountScreen route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

// test('render the AccountScreen component after data is fetched', async () => {
//   const {getByText, debug} = render(<AccountScreen route={route} />);
//   await waitFor(() => {
//     // expect(getByText('ADDRESS')).toBeTruthy();
//     debug()
//   });
// });
