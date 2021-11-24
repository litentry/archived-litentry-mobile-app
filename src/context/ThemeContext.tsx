/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {createContext, useCallback, useContext, useEffect, useMemo} from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import {mapping} from '@eva-design/material';
import {usePersistedState} from 'src/hook/usePersistedState';
import customMapping from 'src/mapping.json';
import {darkMaterialThemeOverride, lightMaterialThemeOverride} from 'src/navigation/theme';
import {
  themeDark,
  themeLight,
  Provider as PaperProvider,
  useTheme as useRNPaperTheme,
} from 'src/packages/base_components';
import {Platform, StatusBar} from 'react-native';

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
      <PaperProvider theme={value.theme === 'dark' ? themeDark : themeLight}>
        <ApplicationProvider
          theme={value.theme === 'dark' ? darkMaterialThemeOverride : lightMaterialThemeOverride}
          mapping={mapping}
          customMapping={customMapping as any}>
          {children}
        </ApplicationProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const rnPaperTheme = useRNPaperTheme();
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {...context, ...rnPaperTheme};
}
