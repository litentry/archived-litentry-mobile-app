import React from 'react';
import {StyleSheet, View} from 'react-native';
import {stringShorten} from '@polkadot/util';
import {Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {notEmpty} from 'src/utils';
import {JudgmentStatus} from '@ui/components/Account/JudgmentStatus';
import type {Account as AccountType} from 'src/api/hooks/useAccount';

type Props = {
  account: AccountType;
  name?: string;
  onPress?: () => void;
};

export function Account({account, name, onPress}: Props) {
  const registrationJudgements = account.registration.judgements
    ? account.registration.judgements.filter(notEmpty)
    : [];
  const display = name || stringShorten(account.display, 12);
  return (
    <View style={styles.container}>
      <Caption style={styles.display} onPress={onPress}>
        {display}
      </Caption>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  display: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
