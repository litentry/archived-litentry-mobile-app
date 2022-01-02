import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from '@ui/library';
import AddressInlineTeaser from '@ui/components/AddressInlineTeaser';
import {TipReason} from '@ui/components/tips/TipReason';
import {Padder} from '@ui/components/Padder';
import {Tip} from 'src/api/hooks/useTips';
import {standardPadding} from '@ui/styles';

type TipTeaserProps = {
  tip: Tip;
  onPress: (hash: string) => void;
};

export function TipTeaser({tip, onPress}: TipTeaserProps) {
  const {who, reason} = tip[1];
  const tipHash = tip[0];

  return (
    <Card style={styles.card} onPress={() => onPress(tipHash)}>
      <Card.Content>
        <AddressInlineTeaser address={String(who)} />
        <Padder scale={0.5} />
        <TipReason reasonHash={reason} />
      </Card.Content>
    </Card>
  );
}

export const MemoizedTipTeaser = React.memo(TipTeaser);

const styles = StyleSheet.create({
  card: {
    marginBottom: standardPadding,
  },
});
