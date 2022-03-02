import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption} from '@ui/library';
import {useAccount} from 'src/api/hooks/useAccount';

type PropTypes = {address: string | undefined};

function MaxBalance(props: PropTypes) {
  return (
    <View style={styles.balance}>
      {!props.address ? <Caption>MAX: -- </Caption> : <AccountInfo address={props.address} />}
    </View>
  );
}

const AccountInfo = (props: {address: string}) => {
  const {data: accountInfo} = useAccount(props.address);
  return <Caption>MAX: {accountInfo?.balance.formattedFree}</Caption>;
};

const styles = StyleSheet.create({
  balance: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default MaxBalance;
