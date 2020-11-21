import React, {createContext, useState} from 'react';
import {ThemeContextValueType, ThemeType} from '../types';

export const ThemeContext = createContext<ThemeContextValueType>({
  theme: 'light',
  toggleTheme: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

export default function ThemeContextProvider({children}: PropTypes) {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
