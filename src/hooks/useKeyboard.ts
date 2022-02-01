import React from 'react';
import {Keyboard} from 'react-native';

export function useKeyboard() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setIsVisible(true);
    });

    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsVisible(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return isVisible;
}
