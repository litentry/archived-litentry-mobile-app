import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';

export default function SafeView({children}: {children: React.ReactNode}) {
  return (
    <Layout style={styles.container}>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
