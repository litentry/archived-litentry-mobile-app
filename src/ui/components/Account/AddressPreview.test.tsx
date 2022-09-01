import React from 'react';
import {render} from 'src/testUtils';
import {AddressInfoPreview} from './AddressPreview';

const address = '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a';

describe('AddressPreview', () => {
  it('should render the loading view while data is fetching', async () => {
    const {findByTestId} = render(<AddressInfoPreview address={address} />);
    await findByTestId('loading_view');
  });
});

it('should render the AddressInfoPreview component after fetched', async () => {
  const {findByText} = render(<AddressInfoPreview address={address} />);
  await findByText('Address');
  await findByText('14yx4v…hhS29a');
  await findByText('Display');
  await findByText('PureStake/01');
  await findByText('Judgment');
  await findByText('"Reasonable" provided by Registrar #1');
  await findByText('Network');
  await findByText('Polkadot');
});
