import {StyleSheet, Platform} from 'react-native';

export const standardPadding = 8;

const dividerPlain = {
  height: 2,
  width: '100%',
};

export const monofontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';
export const colorGreen = '#1BC575'; // rgba(27, 197, 117, 0.3)
export const colorGray = '#A9A9A9';
export const colorGreenLight = 'rgba(27, 197, 117, 0.3)';
export const defaultIconColor = '#778899';

export const colorRed = '#FF3D71';
export const getIconColorByTheme = (theme: 'light' | 'dark') => (theme === 'light' ? 'black' : 'white');
export const hitSlop = {top: 5, bottom: 5, left: 5, right: 5};

const inlineIconDimension = {
  width: 20,
  height: 20,
};
const iconColor = {
  color: defaultIconColor,
};
const globalStyles = StyleSheet.create({
  paddedContainer: {
    padding: standardPadding * 2,
  },
  spaceAroundRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  spaceBetweenRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  divider: {
    marginVertical: standardPadding,
    ...dividerPlain,
  },
  dividerPlain,
  fillCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {...inlineIconDimension, ...iconColor},
  icon15: {width: 15, height: 15},
  icon25: {width: 25, height: 25},
  inlineIconDimension,
  iconColor,
  dialogMinHeight: {
    minHeight: 240,
  },
  flex: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 5,
  },
  marginVertical: {
    marginVertical: standardPadding,
  },
  monoFont: {
    fontFamily: monofontFamily,
  },
  aye: {
    color: colorGreen,
  },
  nay: {
    color: colorRed,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
});

export default globalStyles;
