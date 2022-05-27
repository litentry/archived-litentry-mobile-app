import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppStackParamList, ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Linking} from 'react-native';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {ParachainDetailScreen} from './ParachainDetailScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<AppStackParamList>;

const route = {
  params: {
    parachainId: '100',
  },
} as unknown as RouteProp<ParachainsStackParamList, 'Parachain'>;

test('render the loading component view when data is fetching', () => {
  const {getByTestId} = render(<ParachainDetailScreen navigation={navigation} route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render the component view when data is fetched', async () => {
  const {getByText} = render(<ParachainDetailScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Moonbeam')).toBeDefined();
    expect(getByText('Included')).toBeDefined();
    expect(getByText('Backed')).toBeDefined();
    expect(getByText('Lease')).toBeDefined();
    expect(getByText('Lifecycle')).toBeDefined();
    expect(getByText('Homepage')).toBeDefined();
    expect(getByText('Val. Group (0)')).toBeDefined();
    expect(getByText('Non-Voters (200)')).toBeDefined();
  });
});

test('component navigation', async () => {
  const {getByText} = render(<ParachainDetailScreen navigation={navigation} route={route} />);
  const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  await waitFor(() => {
    fireEvent.press(getByText('Homepage'));
    expect(linkingSpy).toHaveBeenCalledTimes(1);
    fireEvent.press(getByText('BINANCE_STAKE_9'));
    expect(navigationSpy).toHaveBeenCalledTimes(1);
  });
});
