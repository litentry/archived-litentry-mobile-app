import React, {useContext} from 'react';
import {ThemeContext} from 'context/ThemeProvider';
import {Layout, Text, Button} from '@ui-kitten/components';

const HomeScreen = () => {
  const {toggleTheme} = useContext(ThemeContext);

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">HOME</Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </Layout>
  );
};

export default HomeScreen;
