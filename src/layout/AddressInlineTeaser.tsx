import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import Identicon from '@polkadot/reactnative-identicon';
import {Registration} from '@polkadot/types/interfaces';
import {ChainApiContext} from 'context/ChainApiContext';
import Padder from 'presentational/Padder';
import {standardPadding} from 'src/styles';

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

  if (!account) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Identicon value={address} size={20} />
      <Padder scale={0.5} />
      <AccountInfoInlineTeaser
        info={account.info}
        judgements={account.judgements}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: standardPadding,
  },
});

export default AddressInlineTeaser;
