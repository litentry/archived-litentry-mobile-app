import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {AppStackParamList} from 'src/navigation/navigation';
import {Caption, Headline, Layout, Padder, StyleSheet} from 'src/packages/base_components';
import {standardPadding} from 'src/styles';

export function AccountsGuideScreen({navigation}: {navigation: NavigationProp<AppStackParamList>}) {
  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    modalRef.current?.open();
  }, []);

  return (
    <Modalize ref={modalRef} adjustToContentHeight onClose={navigation.goBack} panGestureEnabled={false}>
      <Layout style={styles.container}>
        <Headline>Internal Accounts</Headline>
        <Caption>This account allows you to hold and sign transactions within our app.</Caption>
        <Padder scale={2} />
        <Headline>Other accounts (external)</Headline>
        <Caption>To sign transactions with these accounts you'll have to go through Parity Signer.</Caption>
        <Padder scale={5} />
      </Layout>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 2,
  },
});
