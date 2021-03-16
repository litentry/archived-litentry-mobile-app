import React from 'react';
import Identicon from '@polkadot/reactnative-identicon';
import {StyleSheet, View} from 'react-native';
import {ListItem} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

import {Tip} from 'src/hook/useTips';
import {tipDetail} from 'src/navigation/routeKeys';
import TipReason from 'layout/tips/TipReason';
import {Address} from 'layout/Address';

const styles = StyleSheet.create({
  identIconContainer: {
    marginRight: 15,
  },
});

type TipTeaserProps = {
  tip: Tip;
};

function TipTeaser({tip}: TipTeaserProps) {
  const navigation = useNavigation();
  const {who, reason} = tip[1];
  const tipHash = tip[0];

  return (
    <ListItem
      title={() => <Address address={who} />}
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
