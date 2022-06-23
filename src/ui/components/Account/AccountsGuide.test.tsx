import React from 'react';
import {render} from 'src/testUtils';
import {AccountsGuide} from './AccountsGuide';

describe('AccountsGuide', () => {
  it('should render the AccountsGuide component with data', async () => {
    const {findByText} = render(<AccountsGuide />);
    await findByText('Import account');
    await findByText(
      'Import an existing account through your mnemonics seed or a json file and sign transactions within the app',
    );
    await findByText('Add external account');
    await findByText('Add your public Polkadot account and sign transactions with Parity signer');
    await findByText('Create new account');
    await findByText('Generate a new seed and sign transactions within the app');
  });
});
