/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line no-restricted-imports
import {MD3Theme, MD3LightTheme, MD3DarkTheme, useTheme as usePaperTheme} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      success: string;
      warning: string;
    }
  }
}

export const themeLight: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4348e2',
    onPrimary: '#ffffff',
    primaryContainer: '#e1e0ff',
    onPrimaryContainer: '#03006d',
    secondary: '#5a5b7e',
    onSecondary: '#ffffff',
    secondaryContainer: '#e1e0ff',
    onSecondaryContainer: '#171837',
    tertiary: '#854b71',
    onTertiary: '#ffffff',
    tertiaryContainer: '#ffd8ed',
    onTertiaryContainer: '#36072b',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    outline: '#777680',
    background: '#fffbff',
    onBackground: '#1b1b1f',
    surface: '#fffbff',
    onSurface: '#1b1b1f',
    surfaceVariant: '#e4e1ec',
    onSurfaceVariant: '#46464f',
    inverseSurface: '#313034',
    inverseOnSurface: '#f3eff4',
  },
};

export const themeDark: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#c0c1ff',
    onPrimary: '#0900ab',
    primaryContainer: '#2728ca',
    onPrimaryContainer: '#e1e0ff',
    secondary: '#c3c3eb',
    onSecondary: '#2c2e4d',
    secondaryContainer: '#434465',
    onSecondaryContainer: '#e1e0ff',
    tertiary: '#f8b1dc',
    onTertiary: '#501e41',
    tertiaryContainer: '#6a3459',
    onTertiaryContainer: '#ffd8ed',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffb4ab',
    outline: '#918f9a',
    background: '#1b1b1f',
    onBackground: '#e5e1e6',
    surface: '#1b1b1f',
    onSurface: '#e5e1e6',
    surfaceVariant: '#46464f',
    onSurfaceVariant: '#c7c5d0',
    inverseSurface: '#e5e1e6',
    inverseOnSurface: '#313034',
  },
};

export function useTheme(): MD3Theme {
  return usePaperTheme();
}
