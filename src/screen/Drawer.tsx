import React, {useContext} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Layout, Button, Text, Divider} from '@ui-kitten/components';
import SafeView from 'presentational/SafeView';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import {ThemeContext} from 'context/ThemeProvider';
import logo from '../image/logo.png';

type PropTypes = {};

function Drawer(props: PropTypes) {
  const {toggleTheme} = useContext(ThemeContext);
  return (
    <SafeView>
      <Layout style={styles.container}>
        <Layout style={[styles.main, globalStyles.paddedContainer]}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logoImage} />
            <Text style={styles.slogan}>Decentralized Identity</Text>
          </View>
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
  logoContainer: {alignItems: 'center', flexDirection: 'row'},
  logoImage: {width: 50, height: 50},
  slogan: {
    marginLeft: standardPadding * 2,
    fontFamily: monofontFamily,
    fontSize: 12,
  },
  main: {
    height: '35%',
  },
  rest: {flex: 1},
});

export default Drawer;
