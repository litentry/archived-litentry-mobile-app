import React from 'react';
import {StyleSheet} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {Layout} from 'src/packages/base_components';

export default function SafeView({children, edges}: {children: React.ReactNode; edges?: Edge[]}) {
  return (
    <Layout style={styles.container}>
      <SafeAreaView edges={edges} style={styles.container}>
        {children}
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export const noTopEdges: Edge[] = ['left', 'right', 'bottom'];
