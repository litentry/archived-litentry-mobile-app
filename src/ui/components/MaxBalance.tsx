import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption} from '@ui/library';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {BN_ZERO} from '@polkadot/util';
import {useAccountInfo} from 'src/api/hooks/useAccountInfo';

type PropTypes = {address: string | undefined};

function MaxBalance(props: PropTypes) {
  return (
    <View style={styles.balance}>
      {!props.address ? <Caption>MAX: -- </Caption> : <AccountInfo address={props.address} />}
    </View>
  );
}

const AccountInfo = (props: {address: string}) => {
  const {data: accountInfo} = useAccountInfo(props.address);
  const formatBalance = useFormatBalance();
  return <Caption>MAX: {formatBalance(accountInfo?.data.free ?? BN_ZERO)}</Caption>;
};

const styles = StyleSheet.create({
  balance: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default MaxBalance;
