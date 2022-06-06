import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {NetworkType} from 'src/types';
import AddressInfoPreview from './AddressPreview';

const polka_network = {
  color: '#800000',
  key: 'polkadot',
  name: 'Polkadot',
  ss58Format: 0,
  ws: ['wss://rpc.polkadot.io'],
} as NetworkType;

const address = '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a';

test('render the loading view when rendered with no data', async () => {
  const {getByTestId, getByText} = render(<AddressInfoPreview address={address} />);
  expect(getByTestId('loading_view')).toBeTruthy();
  expect(getByText('Fetching Address Info')).toBeTruthy();
});

test('render the component after data fetched', async () => {
  const {getByText, queryByText} = render(<AddressInfoPreview address={address} />);

  await waitFor(() => {
    expect(getByText('Address')).toBeTruthy();
    expect(getByText('Display')).toBeTruthy();
    expect(getByText('Judgment')).toBeTruthy();
    expect(queryByText('No judgements provided')).toBeTruthy();
    expect(getByText('Network')).toBeTruthy();
  });
});
