import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Layout} from '@ui-kitten/components';

export default function SafeView({children}: {children: React.ReactNode}) {
  return (
    <Layout style={styles.container}>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.container}>
        {children}
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
