import React, {useContext} from 'react';
import Identicon from '@polkadot/reactnative-identicon';
import {StyleSheet, View} from 'react-native';
import {Text, ListItem} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {AccountId} from '@polkadot/types/interfaces';

import {Tip} from 'src/hook/useTips';
import {tipDetail} from 'src/navigation/routeKeys';
import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import useAccountDetail from 'src/hook/useAccountDetail';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import TipReason from 'layout/tips/TipReason';
import {monofontFamily} from 'src/styles';

const styles = StyleSheet.create({
  bareAddress: {
    fontWeight: 'bold',
    fontSize: 13,
    width: 140,
    maxWidth: 140,
    fontFamily: monofontFamily,
  },
  identIconContainer: {
    marginRight: 15,
  },
});

type WhoProps = {
  address: AccountId;
};

function Who({address}: WhoProps) {
  const {api} = useContext(ChainApiContext);
  const {currentNetwork} = useContext(NetworkContext);
  const {display, detail} = useAccountDetail(
    currentNetwork?.key,
    String(address),
    api,
  );

  if (display) {
    return (
      <AccountInfoInlineTeaser
        display={display}
        judgements={detail?.data?.judgements}
      />
    );
  }
  return (
    <Text style={styles.bareAddress} numberOfLines={1} ellipsizeMode="middle">
      {String(address)}
    </Text>
  );
}

type TipTeaserProps = {
  tip: Tip;
};

function TipTeaser({tip}: TipTeaserProps) {
  const navigation = useNavigation();
  const {who, reason} = tip[1];
  const tipHash = tip[0];

  return (
    <ListItem
      title={() => <Who address={who} />}
      description={() => <TipReason reasonHash={reason} />}
      accessoryLeft={() => (
        <View style={styles.identIconContainer}>
          <Identicon value={who} size={40} />
        </View>
      )}
      onPress={() => navigation.navigate(tipDetail, {hash: tipHash})}
    />
  );
}

export default TipTeaser;
