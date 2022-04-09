import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Icon} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import globalStyles, {standardPadding, monofontFamily, colorRed} from '@ui/styles';

type PropTypes = {
  text: string;
  msg: string;
};

function ErrorDialog(props: PropTypes) {
  const {text, msg} = props;

  return (
    <Layout style={globalStyles.fillCenter}>
      <Layout style={styles.textContainer}>
        <Icon size={20} color={colorRed} name="close-circle-outline" />
        <Text style={[styles.text, styles.withIcon]}>{text}</Text>
      </Layout>
      <Text style={styles.msg}>{msg}</Text>
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
    padding: standardPadding * 2,
  },
  msg: {
    paddingHorizontal: standardPadding * 2,
    textAlign: 'center',
  },
});

export default ErrorDialog;
