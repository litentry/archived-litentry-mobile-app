import {Theme} from '@react-navigation/native';

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FFFFFF' /*text-alternative-color*/,
    background: '#222B45' /*background-alternative-color-1*/,
    card: '#222B45' /*background-alternative-color-1*/,
    text: '#FFFFFF' /*text-alternative-color*/,
    border: '#222B45',
    notification: '#222B45',
  },
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#222B45' /*text-basic-color*/,
    background: '#FFFFFF' /*background-alternative-color-1*/,
    card: '#FFFFFF',
    text: '#222B45' /*text-basic-color*/,
    border: '#FFFFFF',
    notification: '#FFFFFF',
  },
};
