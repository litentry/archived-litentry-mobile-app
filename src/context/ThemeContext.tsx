import React, {createContext, useCallback, useContext, useEffect, useMemo} from 'react';
import {Platform, StatusBar} from 'react-native';
import {usePersistedState} from '@hooks/usePersistedState';
import {Provider as PaperProvider} from '@ui/library';
import {themeDark, themeLight} from '@ui/library/theme';
import {LitentryApiClientProvider} from './LitentryApiContext';
import {QueryClient, QueryClientProvider} from 'react-query';

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

const queryClient = new QueryClient();

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
    <LitentryApiClientProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={value}>
          <PaperProvider theme={value.theme === 'dark' ? themeDark : themeLight}>{children}</PaperProvider>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </LitentryApiClientProvider>
  );
}

export function useToggleTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
