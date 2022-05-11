import React from 'react';
import {render, waitFor, within} from 'src/testUtils';
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
  const {getByTestId} = render(<AddressInfoPreview address={address} network={polka_network} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render the component after data fetched', async () => {
  const {getByText, queryByText} = render(<AddressInfoPreview address={address} network={polka_network} />);

  await waitFor(() => {
    expect(getByText('Address')).toBeTruthy();
    expect(getByText('Display')).toBeTruthy();
    // expect(getByText('Balance')).toBeTruthy();
    expect(getByText('Judgment')).toBeTruthy();
    expect(queryByText('No judgements provided')).toBeTruthy();

    expect(getByText('Network')).toBeTruthy();
  });
});
