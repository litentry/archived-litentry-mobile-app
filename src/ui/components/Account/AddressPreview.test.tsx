import React from 'react';
import {render, waitFor} from 'src/testUtils';
import {AddressInfoPreview} from './AddressPreview';

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
