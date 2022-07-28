import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isString} from 'lodash';
import {Text} from '@ui/library';

type PropTypes = {
  title: string;
  children: string | React.ReactNode;
  testID?: string;
};

function StatInfoBlock(props: PropTypes) {
  const {children, title, testID} = props;

  return (
    <View testID={testID}>
      <Text variant="bodySmall">{title}</Text>
      {isString(children) ? (
        <Text variant="bodySmall" style={styles.stat}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    textAlign: 'left',
    fontSize: 16,
  },
});

export default StatInfoBlock;
