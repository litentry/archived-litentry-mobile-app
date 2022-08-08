import React from 'react';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {Text} from '@ui/library';
import globalStyles from '@ui/styles';

export function AccountsGuide() {
  return (
    <Layout style={globalStyles.paddedContainer}>
      <Text variant="headlineSmall">Import account</Text>
      <Text variant="bodySmall">
        Import an existing account through your mnemonics seed or a json file and sign transactions within the app
      </Text>
      <Padder scale={2} />
      <Text variant="headlineSmall">Add external account</Text>
      <Text variant="bodySmall">Add your public Polkadot account and sign transactions with Parity signer</Text>
      <Padder scale={2} />
      <Text variant="headlineSmall">Create new account</Text>
      <Text variant="bodySmall">Generate a new seed and sign transactions within the app</Text>
      <Padder scale={2} />
    </Layout>
  );
}
