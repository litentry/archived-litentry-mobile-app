import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {AuctionsScreen} from './AuctionsScreen';

test('render the loading component view when data is fetching', () => {
  const {getByTestId} = render(<AuctionsScreen />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render the component after data is fetched', async () => {
  const {getByText, getAllByText} = render(<AuctionsScreen />);
  await waitFor(() => {
    expect(getByText('Auctions')).toBeDefined();
    expect(getByText('Active')).toBeDefined();
    expect(getByText('First - Last')).toBeDefined();
    expect(getByText('Ending period')).toBeDefined();
    expect(getByText('Total Raised')).toBeDefined();
    expect(getByText('Winning Bid')).toBeDefined();
    expect(getAllByText('ProjectID: 2030')).toBeDefined();
    expect(getAllByText('Bid: 399,696.5211 DOT (crowdloan)')).toBeDefined();
    expect(getAllByText('Block number:')).toBeDefined();
    expect(getAllByText('Leases')).toBeDefined();
  });
});
