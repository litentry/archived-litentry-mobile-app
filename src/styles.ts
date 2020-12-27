import {StyleSheet, Platform} from 'react-native';

export const standardPadding = 8;

const dividerPlain = {
  height: 2,
  width: '100%',
};

const globalStyles = StyleSheet.create({
  paddedContainer: {
    padding: standardPadding * 2,
  },
  divider: {
    marginVertical: standardPadding,
    ...dividerPlain,
  },
  dividerPlain,
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inlineIconDimension: {
    width: 20,
    height: 20,
  },
  dialogMinHeight: {
    minHeight: 240,
  },
  flex: {flex: 1},

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 8,
  },
});

export const monofontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';
export const colorGreen = '#1BC575'; // rgba(27, 197, 117, 0.3)

export const colorRed = '#FF3D71';
export const getIconColorByTheme = (theme: 'light' | 'dark') =>
  theme === 'light' ? 'black' : 'white';

export default globalStyles;
