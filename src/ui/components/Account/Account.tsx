import type {ProxyAccount} from 'src/generated/litentryGraphQLTypes';

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {stringShorten} from '@polkadot/util';
import {Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {notEmpty} from 'src/utils';
import {JudgmentStatus} from '@ui/components/Account/JudgmentStatus';

type Props = {
  account: ProxyAccount;
};

export function Account({account}: Props) {
  const registrationJudgements = account.registration.judgements
    ? account.registration.judgements.filter(notEmpty)
    : [];

  return (
    <View style={styles.container}>
      <Caption style={styles.display}>{stringShorten(account.display, 12)}</Caption>
      <Padder scale={0.5} />
      {registrationJudgements.map((registrationJudgement, i) => (
        <JudgmentStatus
          key={i}
          registrationJudgement={registrationJudgement}
          hasParent={Boolean(account.registration.displayParent)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  display: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
