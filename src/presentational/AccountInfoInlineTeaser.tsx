import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RegistrationJudgement} from '@polkadot/types/interfaces';
import {Text} from '@ui-kitten/components';
import {monofontFamily} from 'src/styles';
import {Vec} from '@polkadot/types';
import JudgmentStatus from './JudgmentStatus';

type PropTypes = {
  display: string;
  judgements?: Vec<RegistrationJudgement>;
};

function AccountInfoInlineTeaser({display, judgements}: PropTypes) {
  return (
    <View style={styles.container}>
      <Text
        category="s1"
        style={[{fontFamily: monofontFamily}, styles.text]}
        ellipsizeMode="middle"
        numberOfLines={1}>
        {display}
      </Text>
      {judgements && judgements.length
        ? judgements.map((judgement, i) => (
            <JudgmentStatus key={i} judgement={judgement} />
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    maxWidth: 140,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccountInfoInlineTeaser;
