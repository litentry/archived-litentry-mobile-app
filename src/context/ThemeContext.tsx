import React, {createContext, useCallback, useContext, useMemo} from 'react';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import {usePersistedState} from 'src/hook/usePersistedState';
import mapping from 'src/mapping.json';

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

  const value = useMemo(() => (theme ? {theme, toggleTheme} : undefined), [theme, toggleTheme]);

  if (!value) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      <ApplicationProvider {...eva} theme={eva[value.theme]} customMapping={mapping as any}>
        {children}
      </ApplicationProvider>
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
