import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption} from '@ui/library';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {BN_ZERO} from '@polkadot/util';
import {useAccountInfo} from 'src/api/hooks/useAccountInfo';

type PropTypes = {address: string};

function MaxBalance(props: PropTypes) {
  const formatBalance = useFormatBalance();
  const {data: accountInfo} = useAccountInfo(props.address);
  return (
    <View style={styles.balance}>
      <Caption>MAX: {formatBalance(accountInfo?.data.free ?? BN_ZERO)}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default MaxBalance;
