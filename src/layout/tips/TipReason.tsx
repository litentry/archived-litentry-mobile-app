import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Hash} from '@polkadot/types/interfaces';
import {Text} from '@ui-kitten/components';
import {useTipReason} from 'src/api/hooks/useTipReason';
import {LoadingItem} from 'presentational/LoadingBox';
import {monofontFamily} from 'src/styles';

type Props = {
  reasonHash: Hash;
};

export function TipReason({reasonHash}: Props) {
  const {data, isLoading} = useTipReason(reasonHash);

  if (isLoading) {
    return <LoadingItem width={80} />;
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text category="c1" style={styles.title}>{`Reason`}</Text>
      </View>
      <Text category="c1" style={styles.tipReasonText}>
        {data}
      </Text>
    </View>
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
  title: {
    fontFamily: monofontFamily,
  },
  titleContainer: {
    marginBottom: 5,
  },
});
