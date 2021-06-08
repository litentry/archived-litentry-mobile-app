import React from 'react';
import {StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Layout, Text, Icon} from '@ui-kitten/components';
import {standardPadding, monofontFamily, colorGreen} from 'src/styles';

type PropTypes = {
  text: string;
  inline?: boolean;
  textStyles?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

function SuccessDialog(props: PropTypes) {
  const {text, inline = false, textStyles = {}, containerStyle = {}} = props;

  return (
    <Layout style={[styles.container, inline ? {} : styles.flex, containerStyle]}>
      <Layout style={styles.textContainer}>
        <Icon style={styles.icon} fill={colorGreen} name="checkmark-circle-outline" />
        <Text numberOfLines={2} style={[styles.text, styles.withIcon, textStyles]}>
          {text}
        </Text>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {flex: 1},
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

export default SuccessDialog;
