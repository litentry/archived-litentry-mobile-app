import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {AppStackParamList} from '@ui/navigation/navigation';
import {Caption, Headline} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {standardPadding} from '@ui/styles';

export function AccountsGuideScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);

  return (
    <Modalize ref={modalRef} adjustToContentHeight onClose={navigation.goBack} panGestureEnabled={false}>
      <Layout style={styles.container}>
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
    </Modalize>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 2,
  },
});
