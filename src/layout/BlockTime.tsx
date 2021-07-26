import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
import {BlockNumber} from '@polkadot/types/interfaces';
import BN from 'bn.js';

import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {monofontFamily} from 'src/styles';

type Props = {
  blockNumber: BlockNumber | BN;
};

const styles = StyleSheet.create({
  timeText: {
    fontFamily: monofontFamily,
  },
});

export function BlockTime({blockNumber}: Props) {
  const {timeStringParts} = useBlockTime(blockNumber);
  const blockTime = timeStringParts.join(' ');

  return <Text style={styles.timeText}>{`${blockTime}`}</Text>;
}
