import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
import {AccountId} from '@polkadot/types/interfaces';

import {ChainApiContext} from 'context/ChainApiContext';
import {NetworkContext} from 'context/NetworkContext';
import useAccountDetail from 'src/hook/useAccountDetail';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import {monofontFamily} from 'src/styles';

type Props = {
  address: AccountId;
};

const styles = StyleSheet.create({
  bareAddress: {
    fontWeight: 'bold',
    fontSize: 13,
    width: 140,
    maxWidth: 140,
    fontFamily: monofontFamily,
  },
});

export function Address({address}: Props) {
  const {api} = useContext(ChainApiContext);
  const {currentNetwork} = useContext(NetworkContext);
  const {display, detail} = useAccountDetail(currentNetwork?.key, String(address), api);

  if (display) {
    return <AccountInfoInlineTeaser display={display} judgements={detail?.data?.judgements} />;
  }
  return (
    <Text style={styles.bareAddress} numberOfLines={1} ellipsizeMode="middle">
      {String(address)}
    </Text>
  );
}
