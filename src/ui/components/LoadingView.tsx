import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from '@ui/components/Layout';
import {Text, ActivityIndicator} from '@ui/library';
import globalStyles, {standardPadding, monofontFamily} from '@ui/styles';

type PropTypes = {
  text?: string;
  renderIcon?: () => ReactNode;
  size?: React.ComponentProps<typeof ActivityIndicator>['size'];
  appearance?: 'secondary' | 'primary';
};

function LoadingView(props: PropTypes) {
  const {text, renderIcon, size, appearance} = props;

  return (
    <Layout style={globalStyles.centeredContainer}>
      <Layout style={styles.textContainer}>
        {renderIcon && renderIcon()}
        <Text style={[styles.text, renderIcon ? styles.withIcon : {}, styles[appearance || 'primary']]}>{text}</Text>
      </Layout>
      <ActivityIndicator size={size || 'large'} animating />
    </Layout>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  withIcon: {
    paddingLeft: standardPadding,
  },
  text: {
    fontFamily: monofontFamily,
  },
  primary: {
    fontWeight: 'bold',
    padding: standardPadding * 4,
  },
  secondary: {
    fontSize: 14,
    padding: standardPadding * 2,
  },
});

export default LoadingView;
