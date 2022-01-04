import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Icon} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import globalStyles, {standardPadding, monofontFamily} from '@ui/styles';

type PropTypes = {
  text: string;
  msg: string;
};

function WarningDialog(props: PropTypes) {
  const {text, msg} = props;

  return (
    <Layout style={globalStyles.centeredContainer}>
      <Layout style={styles.textContainer}>
        <Icon size={20} color={'#ffcc00'} name="alert-circle-outline" />
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
export default WarningDialog;
