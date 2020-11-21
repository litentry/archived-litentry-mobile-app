import React, {useContext} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';
import HomeScreen from 'layout/Home';

export default () => {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <HomeScreen />
      </ApplicationProvider>
    </>
  );
};
