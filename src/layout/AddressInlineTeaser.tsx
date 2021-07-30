import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import Padder from 'presentational/Padder';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';

type PropTypes = {
  address: string;
};

function AddressInlineTeaser(props: PropTypes) {
  const {address} = props;
  const {data} = useAccountIdentityInfo(address);

  return (
    <View style={styles.container}>
      <Identicon value={address} size={20} />
      <Padder scale={0.5} />
      <AccountInfoInlineTeaser display={data?.display ?? ''} judgements={data?.registration?.judgements} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddressInlineTeaser;
