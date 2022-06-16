import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {render, fireEvent, waitFor} from 'src/testUtils';
import {DemocracyScreen} from './DemocracyScreen';
import {debug} from 'react-native-reanimated';

jest.useFakeTimers();

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<DashboardStackParamList>;

test('render the loading component when data is fetching', () => {
  const {getByTestId} = render(<DemocracyScreen navigation={navigation} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render DemocracyScreen component when the data is fetched', async () => {
  const {getByText, debug} = render(<DemocracyScreen navigation={navigation} />);
  await waitFor(() => {
    expect(getByText('Referenda')).toBeTruthy();
    expect(getByText('Proposals')).toBeTruthy();
    expect(getByText('There are no active proposals')).toBeTruthy();
    expect(getByText('Submit proposal')).toBeTruthy();
    debug();
  });
});

// TODO: need to fix the incoming data
test('click on polkassembly', async () => {
  const {getAllByText} = render(<DemocracyScreen navigation={navigation} />);
  await waitFor(() => {
    // expect(getAllByText('Polkassembly')).toBe()
  });
});
