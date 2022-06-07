import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {TipDetailScreen} from './TipDetailScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ReactTestInstance} from 'react-test-renderer';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NativeStackNavigationProp<AppStackParamList>;

const route = {
  parm: {
    id: '0xe72fd92707ea62a5df6f2472e366cee5e99fbcd0a68f2940879ff9e420bbc489',
  },
} as unknown as RouteProp<DashboardStackParamList, 'Tip'>;

test('render the loading view when data is fetching', () => {
  const {getByTestId} = render(<TipDetailScreen navigation={navigation} route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render the component when data is fetched', async () => {
  const {getByText, queryByText} = render(<TipDetailScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Who')).toBeTruthy();
    expect(getByText('Finder')).toBeTruthy();
    expect(getByText('Reason')).toBeTruthy();
    expect(getByText('Tippers (2)')).toBeTruthy();
    expect(queryByText('There are no tippers yet')).not.toBeTruthy();
  });
});

test('render the component and test accounts click events', async () => {
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  const {getAllByTestId} = render(<TipDetailScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    fireEvent.press(getAllByTestId('account-details').at(0) as ReactTestInstance);
    expect(navigationSpy).toHaveBeenCalledTimes(1);
  });
});
