import React from 'react';
import {render} from 'src/testUtils';
import AddressInfoPreview from './AddressPreview';

describe('AddressInfoPreview', () => {
  const address = '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a';
  it('should render the loading view when data is fetching', () => {
    const {getByTestId} = render(<AddressInfoPreview address={address} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the AddressInfoPreview component after data is fetched', async () => {
    const {findByText} = render(<AddressInfoPreview address={'14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a'} />);
    await findByText('Address');
    await findByText('Display');
    await findByText('Judgment');
    await findByText('Network');
  });
});
