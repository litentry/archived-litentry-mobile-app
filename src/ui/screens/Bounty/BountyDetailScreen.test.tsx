import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {BountyDetailScreen} from './BountyDetailScreen';
import {stringShorten} from '@polkadot/util';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as StackNavigationProp<AppStackParamList>;

const route = {
  params: {
    index: '13',
  },
} as RouteProp<DashboardStackParamList, 'Bounty'>;

test('render the loading view when data is fetching', () => {
  const {getByTestId} = render(<BountyDetailScreen navigation={navigation} route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render component when the data is fetched', async () => {
  const {getByText, queryByText} = render(<BountyDetailScreen navigation={navigation} route={route} />);
  const navigationSpy = jest.spyOn(navigation, 'navigate');
  await waitFor(() => {
    expect(getByText('Proposer')).toBeTruthy();
    expect(getByText('Status')).toBeTruthy();
    expect(getByText('Value')).toBeTruthy();

    expect(getByText('Description')).toBeTruthy();
    expect(getByText('Curator')).toBeTruthy();

    expect(getByText(`Curator's Fee`)).toBeTruthy();
    expect(getByText(`Curator's Deposit`)).toBeTruthy();
    expect(getByText('Bond')).toBeTruthy();
    expect(getByText('Update at')).toBeTruthy();
    expect(queryByText('Payout at')).not.toBeTruthy();

    expect(getByText(stringShorten('ORML Security Bounty Curator', 10))).toBeTruthy();
    fireEvent.press(getByText(stringShorten('ORML Security Bounty Curator', 10)));
    expect(navigationSpy).toHaveBeenCalledTimes(1);
  });
});
