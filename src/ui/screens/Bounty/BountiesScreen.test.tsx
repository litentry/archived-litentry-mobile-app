import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {BountiesScreen} from './BountiesScreen';

test('render the loading view when data is fetching', () => {
  const {getByTestId} = render(<BountiesScreen />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render when the data is fetched', async () => {
  const {getByText, getAllByText} = render(<BountiesScreen />);
  await waitFor(() => {
    expect(getByText('ORML Security Bounty')).toBeTruthy();
    expect(getByText('go')).toBeTruthy();
    expect(getByText('Polkascan Foundation Budget | Common Good Organization')).toBeTruthy();
    expect(getByText('Polkadot Pioneers Prize, an Incentive Prize Program')).toBeTruthy();
    expect(getByText('Anti-Scam Bounty')).toBeTruthy();

    expect(getAllByText('Active').length).toBe(3);
    expect(getAllByText('Proposed').length).toBe(2);
  });
});
