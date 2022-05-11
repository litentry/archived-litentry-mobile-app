import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {addBountyScreen} from '@ui/navigation/routeKeys';
import React from 'react';
import {render, waitFor, fireEvent} from 'src/testUtils';
import {BountiesScreen} from './BountiesScreen';

const navigation = {
  navigate: () => jest.fn(),
  goBack: () => jest.fn,
} as unknown as NavigationProp<DashboardStackParamList, typeof addBountyScreen>;

test('render the loading view when data is fetching', () => {
  const {getByTestId} = render(<BountiesScreen navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render when the data is fetched', async () => {
  const {getByText, getAllByText} = render(<BountiesScreen navigation={navigation} />);
  await waitFor(() => {
    expect(getByText('ORML Security Bounty')).toBeTruthy();
    expect(getByText('go')).toBeTruthy();
    expect(getByText('Polkascan Foundation Budget | Common Good Organization')).toBeTruthy();
    expect(getByText('Polkadot Pioneers Prize, an Incentive Prize Program')).toBeTruthy();
    expect(getByText('Anti-Scam Bounty')).toBeTruthy();

    expect(getAllByText('Active').length).toBe(3);
    expect(getAllByText('Proposed').length).toBe(2);

    expect(getByText(/Add Bounty/i)).toBeDefined();
  });
});

test('add bounty, bounty details and back button clicked', async () => {
  const {getByText} = render(<BountiesScreen navigation={navigation} />);
  await waitFor(() => {
    const navigationSpy = jest.spyOn(navigation, 'navigate');

    fireEvent.press(getByText('Add Bounty'));
    expect(navigationSpy).toHaveBeenCalledTimes(1);

    fireEvent.press(getByText('ORML Security Bounty'));
    expect(navigationSpy).toHaveBeenCalledTimes(1);

    fireEvent.press(getByText('go'));
    expect(navigationSpy).toHaveBeenCalledTimes(1);

    fireEvent.press(getByText('Polkascan Foundation Budget | Common Good Organization'));
    expect(navigationSpy).toHaveBeenCalledTimes(1);

    fireEvent.press(getByText('Polkadot Pioneers Prize, an Incentive Prize Program'));
    expect(navigationSpy).toHaveBeenCalledTimes(1);
  });
});
