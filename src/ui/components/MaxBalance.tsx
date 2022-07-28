import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@ui/library';
import {Account} from 'src/api/hooks/useAccount';

type PropTypes = {address: Account | undefined};

function MaxBalance(props: PropTypes) {
  return (
    <View style={styles.balance}>
      {!props.address ? (
        <Text variant="bodySmall">MAX: -- </Text>
      ) : (
        <Text variant="bodySmall">MAX: {props.address?.balance?.formattedFree}</Text>
      )}
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
