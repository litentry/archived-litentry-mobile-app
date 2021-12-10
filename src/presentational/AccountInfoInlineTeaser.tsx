import React from 'react';
import {Padder, Caption} from 'src/packages/base_components';
import {StyleSheet, View} from 'react-native';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {monofontFamily} from 'src/styles';
import JudgmentStatus from './JudgmentStatus';
import {stringShorten} from '@polkadot/util';

type PropTypes = {
  identity: IdentityInfo;
};

function AccountInfoInlineTeaser({identity}: PropTypes) {
  const judgements = identity.registration?.judgements;

  return (
    <View style={styles.container}>
      <Caption style={styles.text}>
        {identity.hasIdentity ? identity.display : stringShorten(identity.display, 12)}
      </Caption>
      {judgements?.length ? <Padder scale={0.5} /> : null}
      {judgements?.map((judgement, i) => (
        <JudgmentStatus key={i} judgement={judgement} hasParent={Boolean(identity.registration?.parent)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: monofontFamily,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccountInfoInlineTeaser;
