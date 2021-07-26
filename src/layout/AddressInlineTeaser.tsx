import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import Identicon from '@polkadot/reactnative-identicon';
import {ChainApiContext} from 'context/ChainApiContext';
import Padder from 'presentational/Padder';
import {monofontFamily} from 'src/styles';
import {Text} from '@ui-kitten/components';
import useAccountDetail from 'src/api/hooks/useAccountDetail';
import {NetworkContext} from 'context/NetworkContext';

type PropTypes = {
  address: string;
};

function AddressInlineTeaser(props: PropTypes) {
  const {address} = props;
  const {api} = useContext(ChainApiContext);
  const {currentNetwork} = useContext(NetworkContext);
  const {display, detail} = useAccountDetail(currentNetwork?.key, address, api);

  return (
    <View style={styles.container}>
      <Identicon value={address} size={20} />
      <Padder scale={0.5} />
      <AccountInfoInlineTeaser display={display} judgements={detail?.data?.judgements} />
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
