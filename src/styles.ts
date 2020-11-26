import {StyleSheet, Platform} from 'react-native';

export const standardPadding = 8;

const globalStyles = StyleSheet.create({
  paddedContainer: {
    padding: standardPadding * 2,
  },
  divider: {
    marginVertical: standardPadding,
    width: '100%',
  },
});

export const monofontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

export default globalStyles;
