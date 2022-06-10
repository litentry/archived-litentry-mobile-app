import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {DashboardScreen} from './DashboardScreen';

const navigation = {
  navigate: () => jest.fn(),
  canGoBack: () => jest.fn(),
} as unknown as NativeStackNavigationProp<DashboardStackParamList, 'Dashboard'>;

const route = {} as RouteProp<DashboardStackParamList, 'Dashboard'>;

const navigationSpy = jest.spyOn(navigation, 'navigate');

jest.mock('src/hooks/useParachainAppEnabled', () => ({
  useParachainAppEnabled: () => {
    return {parachainAppEnabled: false};
  },
}));

test('render the loading view while data is fetching', () => {
  const {getAllByTestId} = render(<DashboardScreen navigation={navigation} route={route} />);
  expect(getAllByTestId('loading_box').length).toBe(5);
});

test('render various component when data is fetched', async () => {
  const {getByText} = render(<DashboardScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Upcoming events')).toBeTruthy();
    expect(getByText('Democracy')).toBeTruthy();
    expect(getByText('Council')).toBeTruthy();
    expect(getByText('Treasury')).toBeTruthy();
    expect(getByText('Bounties')).toBeTruthy();
  });
});

test('Navigation test case for eventsCalendarScreen', async () => {
  const {getByText} = render(<DashboardScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Upcoming events')).toBeTruthy();
    fireEvent.press(getByText('Upcoming events'));
    expect(navigationSpy).toBeCalledWith('Events');
  });
});

test('Navigation test case for DemocracySummaryTeaser', async () => {
  const {getByText} = render(<DashboardScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Democracy')).toBeTruthy();
    fireEvent.press(getByText('Democracy'));
    expect(navigationSpy).toBeCalledWith('Democracy');
  });
});

test('Navigation test case for DemocracySummaryTeaser', async () => {
  const {getByText} = render(<DashboardScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Democracy')).toBeTruthy();
    fireEvent.press(getByText('Democracy'));
    expect(navigationSpy).toBeCalledWith('Democracy');
  });
});

test('Navigation test case for CouncilSummaryTeaser', async () => {
  const {getByText} = render(<DashboardScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Council')).toBeTruthy();
    fireEvent.press(getByText('Council'));
    expect(navigationSpy).toBeCalledWith('Council');
  });
});

test('Navigation test case for TreasurySummaryTeaser', async () => {
  const {getByText} = render(<DashboardScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Treasury')).toBeTruthy();
    fireEvent.press(getByText('Treasury'));
    expect(navigationSpy).toBeCalledWith('Treasury');
  });
});

test('Navigation test case for BountySummaryTeaser', async () => {
  const {getByText} = render(<DashboardScreen navigation={navigation} route={route} />);
  await waitFor(() => {
    expect(getByText('Bounties')).toBeTruthy();
    fireEvent.press(getByText('Bounties'));
    expect(navigationSpy).toBeCalledWith('Bounties');
  });
});
