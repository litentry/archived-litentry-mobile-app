import React from 'react';
import {StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {LoadingItem} from '@ui/components/LoadingBox';
import {Padder} from '@ui/components/Padder';
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
