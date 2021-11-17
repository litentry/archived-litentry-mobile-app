import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import {mapping} from '@eva-design/material';
import {usePersistedState} from 'src/hook/usePersistedState';
import customMapping from 'src/mapping.json';
import {darkMaterialThemeOverride, lightMaterialThemeOverride} from 'src/navigation/theme';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#85A3F2',
    accent: '#FEA34F',
    background: 'red',
    surface: 'red',
    error: 'red',
    text: 'red',
    onSurface: 'red',
    disabled: 'red',
    placeholder: 'red',
    backdrop: 'red',
    notification: 'red',
  },
};

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

  const value = useMemo(() => ({theme, toggleTheme}), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={paperTheme}>
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
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
