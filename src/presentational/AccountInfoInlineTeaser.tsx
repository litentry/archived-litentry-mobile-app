import React from 'react';
import {StyleSheet} from 'react-native';
import {IdentityInfo, RegistrationJudgement} from '@polkadot/types/interfaces';
import {Layout, Text} from '@ui-kitten/components';
import {u8aToString} from '@polkadot/util';
import {monofontFamily} from 'src/styles';
import {Vec} from '@polkadot/types';
import JudgmentStatus from './JudgmentStatus';

type PropTypes = {
  info: IdentityInfo;
  judgements?: Vec<RegistrationJudgement>;
};

function AccountInfoInlineTeaser({info, judgements}: PropTypes) {
  const displayName = u8aToString(info.display.asRaw) || 'untitled account';

  return (
    <Layout style={styles.container}>
      <Text category="s1" style={{fontFamily: monofontFamily}}>
        {displayName}
      </Text>
      {judgements && judgements.length
        ? judgements.map((judgement) => (
            <JudgmentStatus judgement={judgement} />
          ))
        : null}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccountInfoInlineTeaser;
