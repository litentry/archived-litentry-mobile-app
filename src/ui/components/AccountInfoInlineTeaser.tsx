/** @deprecated use @ui/components/Account/Account instead */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {IdentityInfo} from 'src/api/queryFunctions/getAccountIdentityInfo';
import {monofontFamily} from '@ui/styles';
import JudgmentStatus from './JudgmentStatus';
import {stringShorten} from '@polkadot/util';

type PropTypes = {
  identity: IdentityInfo;
  accountName?: string;
};

function AccountInfoInlineTeaser({identity, accountName}: PropTypes) {
  const judgements = identity.registration?.judgements;

  return (
    <View style={styles.container}>
      <Caption style={styles.text}>
        {identity.hasIdentity
          ? identity.display
          : accountName
          ? `${accountName}(${stringShorten(identity.accountId.toString(), 8)})`
          : stringShorten(identity.accountId.toString(), 12)}
      </Caption>
      {judgements?.length ? <Padder scale={0.2} /> : null}
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
