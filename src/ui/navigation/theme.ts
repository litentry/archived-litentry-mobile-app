import {Theme} from '@react-navigation/native';
import {themeDark, themeLight} from '@ui/library/theme';

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: themeDark.colors.primary,
    background: themeDark.colors.background,
    card: themeDark.colors.surface,
    text: themeDark.colors.text,
    border: themeDark.colors.disabled,
    notification: themeDark.colors.notification,
  },
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: themeLight.colors.primary,
    background: themeLight.colors.background,
    card: themeLight.colors.surface,
    text: themeLight.colors.text,
    border: themeLight.colors.disabled,
    notification: themeLight.colors.notification,
  },
};
