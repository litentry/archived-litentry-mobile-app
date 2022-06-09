import React from 'react';
import {render} from 'src/testUtils';
import {AccountsGuide} from './AccountsGuide';

test('render the component with data', () => {
  const {getByText} = render(<AccountsGuide />);
  expect(getByText('Import account')).toBeTruthy();
  expect(
    getByText(
      'Import an existing account through your mnemonics seed or a json file and sign transactions within the app',
    ),
  ).toBeTruthy();
  expect(getByText('Add external account')).toBeTruthy();
  expect(getByText('Add your public Polkadot account and sign transactions with Parity signer')).toBeTruthy();
  expect(getByText('Create new account')).toBeTruthy();
  expect(getByText('Generate a new seed and sign transactions within the app')).toBeTruthy();
});
