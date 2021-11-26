import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import {LoadingItem} from 'presentational/LoadingBox';
import {Padder} from 'src/packages/base_components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';

type PropTypes = {
  address: string;
};

function AddressInlineTeaser(props: PropTypes) {
  const {address} = props;
  const {data, isLoading} = useAccountIdentityInfo(address);

  if (isLoading) {
    return <LoadingItem />;
  }

  return (
    <View style={styles.container}>
      <Identicon value={address} size={20} />
      <Padder scale={0.5} />
      {data && <AccountInfoInlineTeaser identity={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default AddressInlineTeaser;
