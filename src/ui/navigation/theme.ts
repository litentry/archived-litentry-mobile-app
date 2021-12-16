import {Theme} from '@react-navigation/native';
import {light, dark} from '@eva-design/material';
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

const materialThemeCommonOverrides = {
  'color-primary-100': '#E7F0FE',
  'color-primary-200': '#CFE0FD',
  'color-primary-300': '#B7CDFB',
  'color-primary-400': '#A3BDF7',
  'color-primary-500': '#85A3F2',
  'color-primary-600': '#617CD0',
  'color-primary-700': '#435AAE',
  'color-primary-800': '#2A3D8C',
  'color-primary-900': '#192874',
  'color-success-100': '#F0FBD7',
  'color-success-200': '#DFF8B0',
  'color-success-300': '#C2EA84',
  'color-success-400': '#A2D662',
  'color-success-500': '#78BC34',
  'color-success-600': '#5DA126',
  'color-success-700': '#45871A',
  'color-success-800': '#306D10',
  'color-success-900': '#225A09',
  'color-info-100': '#EEF9FE',
  'color-info-200': '#DEF2FE',
  'color-info-300': '#CDE8FD',
  'color-info-400': '#C0DFFC',
  'color-info-500': '#ABD1FB',
  'color-info-600': '#7DA3D7',
  'color-info-700': '#567AB4',
  'color-info-800': '#365491',
  'color-info-900': '#203978',
  'color-warning-100': '#FEF3DB',
  'color-warning-200': '#FEE5B8',
  'color-warning-300': '#FED295',
  'color-warning-400': '#FEC07A',
  'color-warning-500': '#FEA34F',
  'color-warning-600': '#DA7E39',
  'color-warning-700': '#B65D27',
  'color-warning-800': '#934019',
  'color-warning-900': '#792C0F',
  'color-danger-100': '#FDE8DA',
  'color-danger-200': '#FCCCB6',
  'color-danger-300': '#F7A790',
  'color-danger-400': '#EF8473',
  'color-danger-500': '#E55047',
  'color-danger-600': '#C43337',
  'color-danger-700': '#A42331',
  'color-danger-800': '#84162B',
  'color-danger-900': '#6D0D28',
};

export const lightMaterialThemeOverride = {
  ...light,
  ...materialThemeCommonOverrides,
};

export const darkMaterialThemeOverride = {
  ...dark,
  ...materialThemeCommonOverrides,
};
