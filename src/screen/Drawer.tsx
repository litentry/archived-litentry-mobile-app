import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Button, Text, Divider} from '@ui-kitten/components';
import SafeView from 'presentational/SafeView';
import globalStyles from 'src/styles';
import {ThemeContext} from 'context/ThemeProvider';

type PropTypes = {};

function Drawer(props: PropTypes) {
  const {toggleTheme} = useContext(ThemeContext);
  return (
    <SafeView>
      <Layout style={styles.container}>
        <Layout style={[styles.main, globalStyles.paddedContainer]}>
          <Text>For logo, account info</Text>
        </Layout>
        <Divider />
        <Layout style={[styles.rest, globalStyles.paddedContainer]} level="2">
          <Text category="h6">Settings</Text>
          <Button appearance="ghost" onPress={toggleTheme}>
            Toggle Theme
          </Button>
        </Layout>
      </Layout>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  main: {
    height: '35%',
  },
  rest: {flex: 1},
});

export default Drawer;
