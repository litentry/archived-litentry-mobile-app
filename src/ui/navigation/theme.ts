import {Theme} from '@react-navigation/native';
import {themeDark, themeLight} from '@ui/library/theme';

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: themeDark.colors.primary,
    background: themeDark.colors.background,
    card: themeDark.colors.surface,
    text: themeDark.colors.onSurface,
    border: themeDark.colors.outline,
    notification: themeDark.colors.secondary,
  },
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: themeLight.colors.primary,
    background: themeLight.colors.background,
    card: themeLight.colors.surface,
    text: themeLight.colors.onSurface,
    border: themeLight.colors.outline,
    notification: themeLight.colors.secondary,
  },
};
