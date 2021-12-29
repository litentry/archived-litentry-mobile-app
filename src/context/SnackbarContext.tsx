import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {Snackbar} from '@ui/library';

type Props = {
  children: React.ReactNode;
};

const SnackbarContext = React.createContext({
  showSnackbar: (_: string) => {
    return;
  },
});

export default function SnackbarProvider({children}: Props) {
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const onDismiss = () => {
    setVisible(false);
  };

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}
      <Snackbar visible={visible} onDismiss={onDismiss} duration={3000}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = React.useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context.showSnackbar;
}
