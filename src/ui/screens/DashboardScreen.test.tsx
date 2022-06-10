import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {DashboardScreen} from './DashboardScreen';

const navigation = {
  navigate: () => jest.fn(),
  canGoBack: () => jest.fn(),
} as unknown as NativeStackNavigationProp<DashboardStackParamList, 'Dashboard'>;

const route = {} as RouteProp<DashboardStackParamList, 'Dashboard'>;

jest.mock('src/hooks/useParachainAppEnabled', () => ({
  useParachainAppEnabled: () => {
    return {parachainAppEnabled: false};
  },
}));

test('render the loading view while data is fetching', () => {
  const {getAllByTestId} = render(<DashboardScreen navigation={navigation} route={route} />);
  expect(getAllByTestId('loading_box').length).toBe(5);
});
