import {DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper';

export const themeLight: typeof PaperDefaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#85A3F2',
    accent: '#FEA34F',
    // background: 'white',
    // surface: 'red',
    // error: 'red',
    // text: 'red',
    // onSurface: 'red',
    // disabled: 'red',
    // placeholder: 'red',
    // backdrop: 'red',
    // notification: 'red',
  },
};

export const themeDark: typeof PaperDarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#85A3F2',
    accent: '#FEA34F',
    // background: 'white',
    // surface: 'red',
    // error: 'red',
    // text: 'red',
    // onSurface: 'red',
    // disabled: 'red',
    // placeholder: 'red',
    // backdrop: 'red',
    // notification: 'red',
  },
};
