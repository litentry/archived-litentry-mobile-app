import React from 'react';
import {StyleSheet, View} from 'react-native';
import {stringShorten} from '@polkadot/util';
import {Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import {JudgmentStatus} from '@ui/components/Account/JudgmentStatus';
import type {Account as AccountType} from 'src/api/hooks/useAccount';

type Props = {
  account: AccountType;
  name?: string;
};

export function Account({account, name}: Props) {
  const display = name || stringShorten(account.display, 10);

  return (
    <View style={styles.container}>
      <Caption style={styles.display}>{display}</Caption>
      <Padder scale={0.5} />
      {account.registration?.judgements?.map((judgement, i) => {
        if (judgement) {
          return (
            <JudgmentStatus
              key={i}
              registrationJudgement={judgement}
              hasParent={Boolean(account?.registration?.displayParent)}
            />
          );
        }
      })}
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
