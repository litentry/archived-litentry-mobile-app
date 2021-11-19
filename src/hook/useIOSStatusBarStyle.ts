import {useTheme} from 'context/ThemeContext';
import {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';

export function useIOSStatusBarStyle() {
  const {theme} = useTheme();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(`${theme === 'dark' ? 'light' : 'dark'}-content`);
    }
  }, [theme]);
}
