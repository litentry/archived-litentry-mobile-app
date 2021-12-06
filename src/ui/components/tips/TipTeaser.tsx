import {Card} from '@ui-kitten/components';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import {TipReason} from 'layout/tips/TipReason';
import {Padder} from 'src/packages/base_components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Tip} from 'src/api/hooks/useTips';
import {standardPadding} from 'src/styles';

type TipTeaserProps = {
  tip: Tip;
  onPress: (hash: string) => void;
};

export function TipTeaser({tip, onPress}: TipTeaserProps) {
  const {who, reason} = tip[1];
  const tipHash = tip[0];

  return (
    <Card style={styles.card} onPress={() => onPress(tipHash)}>
      <AddressInlineTeaser address={String(who)} />
      <Padder scale={0.5} />
      <TipReason reasonHash={reason} />
    </Card>
  );
}

export const MemoizedTipTeaser = React.memo(TipTeaser);

const styles = StyleSheet.create({
  card: {
    marginBottom: standardPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identIconContainer: {
    marginRight: 15,
  },
});
