import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@ui/library';
import {TipReason} from '@ui/components/Tips/TipReason';
import {Padder} from '@ui/components/Padder';
import {Tip} from 'src/api/hooks/useTips';
import {standardPadding} from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {fromNow} from 'src/utils/date';

type TipTeaserProps = {
  tip: Tip;
  onPress: (id: string) => void;
};

function Teaser({tip, onPress}: TipTeaserProps) {
  const {id, who, reason, createdAt, status} = tip;

  return (
    <Card style={styles.card} onPress={() => onPress(id)}>
      <Card.Content>
        <AccountTeaser account={who} />
        <View style={styles.row}>
          <Text variant="bodySmall">Created:</Text>
          <Text variant="bodySmall">{fromNow(createdAt)}</Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodySmall">Status:</Text>
          <Text variant="bodySmall">{status}</Text>
        </View>
        <Padder scale={0.5} />
        <TipReason reason={reason} />
      </Card.Content>
    </Card>
  );
}

export const TipTeaser = React.memo(Teaser);

const styles = StyleSheet.create({
  card: {
    marginBottom: standardPadding,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
