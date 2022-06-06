import React from 'react';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {Caption, Headline} from '@ui/library';
import globalStyles from '@ui/styles';

export function AccountsGuide() {
  return (
    <Layout style={globalStyles.paddedContainer}>
      <Headline>Import account</Headline>
      <Caption>
        Import an existing account through your mnemonics seed or a json file and sign transactions within the app
      </Caption>
      <Padder scale={2} />
      <Headline>Add external account</Headline>
      <Caption>Add your public Polkadot account and sign transactions with Parity signer</Caption>
      <Padder scale={2} />
      <Headline>Create new account</Headline>
      <Caption>Generate a new seed and sign transactions within the app</Caption>
      <Padder scale={2} />
    </Layout>
  );
}
