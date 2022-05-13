import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Icon, useTheme} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import globalStyles, {standardPadding, monofontFamily} from '@ui/styles';

type PropTypes = {
  text: string;
  msg: string;
};

export function WarningDialog(props: PropTypes) {
  const {text, msg} = props;
  const {colors} = useTheme();

  return (
    <Layout style={globalStyles.fillCenter}>
      <Layout style={styles.textContainer}>
        <Icon size={20} color={colors.warning} name="alert-circle-outline" />
        <Text style={[styles.text, styles.withIcon]}>{text}</Text>
      </Layout>
      <Text>{msg}</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withIcon: {
    paddingLeft: standardPadding,
  },
  text: {
    fontWeight: 'bold',
    fontFamily: monofontFamily,
    padding: standardPadding * 4,
  },
});
