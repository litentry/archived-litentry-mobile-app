import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Icon, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';

type Props = {
  title: string;
  msg: string;
  type: 'error' | 'warning';
};

export function MessageTeaser({title, msg, type}: Props) {
  const {colors} = useTheme();
  const iconName = type === 'error' ? 'close-circle-outline' : 'alert-circle-outline';

  return (
    <View style={globalStyles.fillCenter}>
      <View style={styles.titleContainer}>
        <Icon size={50} color={colors[type]} name={iconName} />
        <Text variant="titleLarge">{title}</Text>
      </View>
      <Text style={styles.msg}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    paddingHorizontal: standardPadding * 2,
    textAlign: 'center',
    marginTop: standardPadding * 2,
  },
});
