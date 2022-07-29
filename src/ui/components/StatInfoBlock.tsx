import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isString} from 'lodash';
import {Text} from '@ui/library';
import {standardPadding} from '@ui/styles';

type PropTypes = {
  title: string;
  children: string | React.ReactNode;
  testID?: string;
};

function StatInfoBlock(props: PropTypes) {
  const {children, title, testID} = props;

  return (
    <View testID={testID}>
      <Text variant="bodyMedium">{title}</Text>
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
    marginTop: standardPadding,
  },
});

export default StatInfoBlock;
