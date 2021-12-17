/* eslint-disable @typescript-eslint/no-namespace */
import {DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      success: string;
    }
  }
}

export const themeLight = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#85A3F2',
    accent: '#FEA34F',
    success: 'green',
    backdrop: '#eeeeee',
  },
};

export const themeDark = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#85A3F2',
    accent: '#FEA34F',
    success: 'green',
  },
};
