import React, {createContext, useState, useEffect} from 'react';
import {ThemeContextValueType, ThemeType} from '../types';
import {useAsyncStorage} from '@react-native-community/async-storage';

export const ThemeContext = createContext<ThemeContextValueType>({
  theme: 'light',
  toggleTheme: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

export default function ThemeContextProvider({children}: PropTypes) {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  const {getItem, setItem} = useAsyncStorage('theme');

  useEffect(() => {
    getItem((_, result) => {
      setTheme((result || 'light') as ThemeType);
    });
  }, [getItem]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setItem(nextTheme, () => {
      setTheme(nextTheme);
    });
  };

  if (!theme) {
    return null;
  }

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
