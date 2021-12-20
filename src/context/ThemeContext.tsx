/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {createContext, useCallback, useContext, useEffect, useMemo} from 'react';
import {Platform, StatusBar} from 'react-native';
import {ApplicationProvider} from '@ui-kitten/components';
import {mapping} from '@eva-design/material';
import {usePersistedState} from '@hooks/usePersistedState';
import customMapping from 'src/mapping.json';
import {darkMaterialThemeOverride, lightMaterialThemeOverride} from '@ui/navigation/theme';
import {Provider as PaperProvider} from '@ui/library';
import {themeDark, themeLight} from '@ui/library/theme';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

export default function ThemeProvider({children}: PropTypes) {
  const [theme, setTheme] = usePersistedState<Theme>('theme', 'light');

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(`${theme === 'dark' ? 'light' : 'dark'}-content`);
    }
  }, [theme]);

  const value = useMemo(() => ({theme, toggleTheme}), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ApplicationProvider
        theme={value.theme === 'dark' ? darkMaterialThemeOverride : lightMaterialThemeOverride}
        mapping={mapping}
        customMapping={customMapping as any}>
        <PaperProvider theme={value.theme === 'dark' ? themeDark : themeLight}>{children}</PaperProvider>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
}

export function useToggleTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
