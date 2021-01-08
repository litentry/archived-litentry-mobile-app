import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import Identicon from '@polkadot/reactnative-identicon';
import {Registration} from '@polkadot/types/interfaces';
import {ChainApiContext} from 'context/ChainApiContext';
import Padder from 'presentational/Padder';
import {standardPadding, monofontFamily} from 'src/styles';
import {Text} from '@ui-kitten/components';

type PropTypes = {
  address: string;
};

function AddressInlineTeaser(props: PropTypes) {
  const {address} = props;
  const [account, setAccount] = useState<Registration>();
  const {api} = useContext(ChainApiContext);

  useEffect(() => {
    if (api) {
      api.query.identity.identityOf(address).then((data) => {
        setAccount(data.unwrapOr(undefined));
      });
    }
  }, [address, api]);

  return (
    <View style={styles.container}>
      <Identicon value={address} size={20} />
      <Padder scale={0.5} />
      {account ? (
        <AccountInfoInlineTeaser
          info={account.info}
          judgements={account.judgements}
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
