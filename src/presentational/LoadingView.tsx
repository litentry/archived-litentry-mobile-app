import React, {ReactNode} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';

type PropTypes = {
  text: string;
  renderIcon?: () => ReactNode;
};

function LoadingView(props: PropTypes) {
  const {text, renderIcon} = props;

  return (
    <Layout style={globalStyles.centeredContainer}>
      <Layout style={styles.textContainer}>
        {renderIcon && renderIcon()}
        <Text style={[styles.text, renderIcon ? styles.withIcon : {}]}>
          {text}
        </Text>
      </Layout>
      <ActivityIndicator size="large" />
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

export default LoadingView;
