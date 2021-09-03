import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text, Icon} from '@ui-kitten/components';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';

type PropTypes = {
  text: string;
  msg: string;
};

function WarningDialog(props: PropTypes) {
  const {text, msg} = props;

  return (
    <Layout style={globalStyles.centeredContainer}>
      <Layout style={styles.textContainer}>
        <Icon style={styles.icon} fill={'#ffcc00'} name="alert-circle-outline" />
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
  icon: {width: 20, height: 20},
  text: {
    fontWeight: 'bold',
    fontFamily: monofontFamily,
    padding: standardPadding * 4,
  },
});
export default WarningDialog;
