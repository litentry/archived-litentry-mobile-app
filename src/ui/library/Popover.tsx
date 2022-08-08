import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from '@ui/library';
import {Popable} from 'react-native-popable';

export type PopoverProps = {
  content: string;
  children?: React.ReactNode;
};

export function Popover({content, children}: PopoverProps) {
  const {colors} = useTheme();

  return (
    <Popable
      content={
        <View style={styles.container}>
          <Text variant="bodySmall" style={styles.text}>
            {content}
          </Text>
        </View>
      }
      backgroundColor={colors.primary}>
      {children}
    </Popable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    textAlign: 'center',
    // @TODO: Use color from theme
    color: '#171414',
  },
});
