import React, {ReactNode} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import globalStyles, {
  standardPadding,
  monofontFamily,
  colorGreen,
} from 'src/styles';

type PropTypes = {
  text?: string;
  renderIcon?: () => ReactNode;
  size?: ActivityIndicatorProps['size'];
  appearance?: 'secondary' | 'primary';
};

function LoadingView(props: PropTypes) {
  const {text, renderIcon, size, appearance} = props;

  return (
    <Layout style={globalStyles.centeredContainer}>
      <Layout style={styles.textContainer}>
        {renderIcon && renderIcon()}
        <Text
          style={[
            styles.text,
            renderIcon ? styles.withIcon : {},
            styles[appearance || 'primary'],
          ]}>
          {text}
        </Text>
      </Layout>
      <ActivityIndicator size={size || 'large'} color={colorGreen} />
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
