import {NavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountsStackParamList, AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {MotionDetailScreen} from './MotionDetailScreen';

const navigation = {} as unknown as NativeStackNavigationProp<AppStackParamList>;

const route = {
  params: {
    hash: '',
  },
} as RouteProp<DashboardStackParamList, 'Motion'>;

test('render the loading component when data is fetching', () => {
  const {getByTestId} = render(<MotionDetailScreen navigation={navigation} route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

// TODO: mock the MotionDetails
test('render the MotionDetailScreen component when data is fetched', async () => {
  const {getByText} = render(<MotionDetailScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('ID')).toBeTruthy();
  });
});
