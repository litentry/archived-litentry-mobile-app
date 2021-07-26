import Identicon from '@polkadot/reactnative-identicon';
import {u8aToString} from '@polkadot/util';
import {useNavigation} from '@react-navigation/native';
import {Card, Text} from '@ui-kitten/components';
import {TipReason} from 'layout/tips/TipReason';
import Padder from 'presentational/Padder';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Tip} from 'src/api/hooks/useTips';
import {Account} from 'src/layout/Account';
import {tipDetailScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';

type TipTeaserProps = {
  tip: Tip;
};

export function TipTeaser({tip}: TipTeaserProps) {
  const navigation = useNavigation();
  const {who, reason} = tip[1];
  const tipHash = tip[0];

  return (
    <Card style={styles.card} onPress={() => navigation.navigate(tipDetailScreen, {hash: tipHash})}>
      <Account id={who.toString()}>
        {({info, accountId}) => (
          <View style={styles.row}>
            <Identicon value={accountId} size={30} />
            <Padder scale={0.3} />
            <Text numberOfLines={1} category={'c1'} ellipsizeMode="middle" style={globalStyles.flex}>
              {info ? u8aToString(info.display.asRaw) : accountId.toString()}
            </Text>
          </View>
        )}
      </Account>
      <TipReason reasonHash={reason} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: standardPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identIconContainer: {
    marginRight: 15,
  },
});
