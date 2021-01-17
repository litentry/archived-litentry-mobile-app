import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import Identicon from '@polkadot/reactnative-identicon';
import {ChainApiContext} from 'context/ChainApiContext';
import Padder from 'presentational/Padder';
import {standardPadding, monofontFamily} from 'src/styles';
import {Text} from '@ui-kitten/components';
import useAccountDetail from 'src/hook/useAccountDetail';
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
      {display ? (
        <AccountInfoInlineTeaser
          display={display}
          judgements={detail?.data?.judgements}
        />
      ) : (
        <Text
          style={styles.bareAddress}
          numberOfLines={1}
          ellipsizeMode="middle">
          {address}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: standardPadding,
  },
  bareAddress: {
    fontWeight: 'bold',
    fontSize: 13,
    width: 140,
    fontFamily: monofontFamily,
  },
});

export default AddressInlineTeaser;
