import React from 'react';
import {StyleSheet} from 'react-native';
import {Hash} from '@polkadot/types/interfaces';
import {Text} from '@ui-kitten/components';
import {useTipReason} from 'src/api/hooks/useTipReason';

type Props = {
  reasonHash: Hash;
};

export function TipReason({reasonHash}: Props) {
  const reasonText = useTipReason(reasonHash);

  return (
    <Text category="c1" style={styles.tipReasonText}>
      {reasonText}
    </Text>
  );
}

const styles = StyleSheet.create({
  tipReasonText: {
    color: '#99a7a3',
    textAlign: 'justify',
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
