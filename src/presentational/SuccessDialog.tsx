import React from 'react';
import {StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Layout, Text, Icon, Button, Divider} from '@ui-kitten/components';
import globalStyles, {standardPadding, monofontFamily, colorGreen} from 'src/styles';

type PropTypes = {
  text: string;
  inline?: boolean;
  textStyles?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onClosePress?: () => void;
};

function SuccessDialog(props: PropTypes) {
  const {text, inline = false, textStyles = {}, containerStyle = {}, onClosePress = () => undefined} = props;

  return (
    <Layout style={[styles.container, inline ? {} : styles.flex, containerStyle]}>
      <Layout style={styles.textContainer}>
        <Icon style={styles.icon} fill={colorGreen} name="checkmark-circle-outline" />
        <Text numberOfLines={2} style={[styles.text, styles.withIcon, textStyles]}>
          {text}
        </Text>
      </Layout>
      <Divider style={styles.divider} />
      <Button appearance="ghost" onPress={onClosePress}>
        Close
      </Button>
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
  divider: {
    ...globalStyles.divider,
    width: '90%',
  },
});

export default SuccessDialog;
