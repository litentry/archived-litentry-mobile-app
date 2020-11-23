import {StyleSheet} from 'react-native';

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

export default globalStyles;
