import React from 'react';
import {Text} from '@ui/library';
import {BlockNumber} from '@polkadot/types/interfaces';
import BN from 'bn.js';
import {useBlockTime} from 'src/api/hooks/useBlockTime';

type Props = {
  blockNumber: BlockNumber | BN;
};

export function BlockTime({blockNumber}: Props) {
  const {timeStringParts} = useBlockTime(blockNumber);
  const [days, hours, minutes, seconds] = timeStringParts;
  let blockTime = '';

  if (days || hours) {
    blockTime = `${days || ''} ${hours || ''}`;
  } else if (minutes || seconds) {
    blockTime = `${minutes || ''} ${seconds || ''}`;
  }

  return <Text>{blockTime}</Text>;
}
