import React from 'react';
import {render, waitFor} from 'src/testUtils';
import AddressInfoPreview from './AddressPreview';

test('render the loading view when data is fetching', () => {
  const {getByTestId} = render(<AddressInfoPreview address={'14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a'} />);
  expect(getByTestId('loading_view')).toBeTruthy();
});

test('render the component after data fetched', async () => {
  const {getByText} = render(<AddressInfoPreview address={'14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a'} />);
  await waitFor(() => {
    expect(getByText('Address')).toBeTruthy();
    expect(getByText('Display')).toBeTruthy();
    expect(getByText('Judgment')).toBeTruthy();
    expect(getByText('Network')).toBeTruthy();
  });
});
