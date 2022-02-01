import React from 'react';
import {Keyboard} from 'react-native';

export function useKeyboardStatus() {
  const [status, setStatus] = React.useState<'visible' | 'hidden'>('hidden');

  React.useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setStatus('visible');
    });

    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setStatus('hidden');
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return {status};
}
