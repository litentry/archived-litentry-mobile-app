import {NavigationProp} from '@react-navigation/native';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {ParachainsOverviewScreen} from './OverviewScreen';

let navigation: NavigationProp<ParachainsStackParamList>;

test('render the loading component view when data is fetching', async () => {
  const {getByTestId} = render(<ParachainsOverviewScreen navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('renders the component when data is fetched', async () => {
  const {getByText} = render(<ParachainsOverviewScreen navigation={navigation} />);
  await waitFor(() => {
    expect(getByText('Parachains:')).toBeDefined();
    expect(getByText('Total period:')).toBeDefined();
    expect(getByText('Remaining:')).toBeDefined();
    expect(getByText('Lease Period')).toBeDefined();
    expect(getByText('Current lease:')).toBeDefined();

    expect(getByText('Parachains')).toBeDefined();
    expect(getByText('Leases')).toBeDefined();

    expect(getByText('Statemint')).toBeTruthy();
    expect(getByText('Acala')).toBeTruthy();
    expect(getByText('Clover')).toBeTruthy();
    expect(getByText('Moonbeam')).toBeTruthy();
    expect(getByText('Astar')).toBeTruthy();
    expect(getByText('Equilibrium')).toBeTruthy();
    expect(getByText('Parallel')).toBeTruthy();
    expect(getByText('Composable Finance')).toBeTruthy();
    expect(getByText('Efinity')).toBeTruthy();
    expect(getByText('Nodle')).toBeTruthy();
  });
});
