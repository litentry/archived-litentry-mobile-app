import React from 'react';
import {render} from 'src/testUtils';
import AddressInfoPreview from './AddressPreview';

const address = '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a';

describe('AddressInfoPreview', () => {
  it('should render the loading view when data is fetching', () => {
    const {getByTestId} = render(<AddressInfoPreview address={address} />);
    expect(getByTestId('loading_view')).toBeTruthy();
  });

  it('should render the AddressInfoPreview component after data is fetched', async () => {
    const {findByText} = render(<AddressInfoPreview address={address} />);
    await findByText('Address');
    await findByText('14yx4v…hhS29a');
    await findByText('Display');
    await findByText('PureStake/01');
    await findByText('Balance');
    await findByText('19,980.8923 DOT');
    await findByText('Judgment');
    await findByText('"Reasonable" provided by Registrar #1');
    await findByText('Network');
    await findByText('Polkadot');
  });
});
