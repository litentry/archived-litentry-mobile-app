import {RouteProp} from '@react-navigation/native';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import React from 'react';
import {Linking} from 'react-native';
import {fireEvent, render, waitFor} from 'src/testUtils';
import {CrowdloanFundDetailScreen} from './CrowdloanFundDetailScreen';

const route = {
  params: {
    paraId: '100',
    title: 'test-title',
  },
} as RouteProp<CrowdloansStackParamList, 'Fund Detail'>;

test('render the loading component view when data is fetching', () => {
  const {getByTestId} = render(<CrowdloanFundDetailScreen route={route} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render the component after data is fetched', async () => {
  const {getByText, getAllByText} = render(<CrowdloanFundDetailScreen route={route} />);

  await waitFor(() => {
    expect(getAllByText('Litentry').length).toBe(1);
    expect(getByText('Depositor:')).toBeDefined();
    expect(getByText('Ending:')).toBeDefined();
    expect(getByText('Status:')).toBeDefined();
    expect(getByText('Leases:')).toBeDefined();
    expect(getByText('Raised:')).toBeDefined();
    expect(getByText('Contributors:')).toBeDefined();
    expect(getByText('Homepage')).toBeDefined();
  });
});

test('Homepage navigation', async () => {
  const {getByText} = render(<CrowdloanFundDetailScreen route={route} />);
  const linkingSpy = jest.spyOn(Linking, 'canOpenURL');

  await waitFor(() => {
    expect(getByText('Homepage')).toBeDefined();
    fireEvent.press(getByText('Homepage'));
    expect(linkingSpy).toHaveBeenCalledTimes(1);
  });
});
