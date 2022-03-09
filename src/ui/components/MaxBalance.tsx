import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption} from '@ui/library';
import {Account} from 'src/api/hooks/useAccount';

type PropTypes = {address: Account | undefined};

function MaxBalance(props: PropTypes) {
  return (
    <View style={styles.balance}>
      {!props.address ? <Caption>MAX: -- </Caption> : <Caption>MAX: {props.address?.balance.formattedFree}</Caption>}
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
