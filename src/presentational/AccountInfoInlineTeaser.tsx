import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {monofontFamily} from 'src/styles';
import JudgmentStatus from './JudgmentStatus';

type PropTypes = {
  identity: IdentityInfo;
};

function AccountInfoInlineTeaser({identity}: PropTypes) {
  return (
    <View style={styles.container}>
      <Text category="c1" style={styles.text} ellipsizeMode="middle" numberOfLines={1}>
        {identity.display}
      </Text>
      {identity.registration?.judgements.map((judgement, i) => (
        <JudgmentStatus key={i} judgement={judgement} hasParent={Boolean(identity.registration.parent)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {fontFamily: monofontFamily, fontWeight: 'bold', flexShrink: 1},
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccountInfoInlineTeaser;
