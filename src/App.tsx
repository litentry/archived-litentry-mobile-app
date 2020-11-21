import React, {useContext} from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ThemeContext} from './context/ThemeProvider';

const HomeScreen = () => {
  const {toggleTheme} = useContext(ThemeContext);

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">HOME</Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </Layout>
  );
};

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
