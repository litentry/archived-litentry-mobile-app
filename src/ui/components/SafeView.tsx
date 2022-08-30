import React from 'react';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {Layout} from '@ui/components/Layout';
import globalStyles from '@ui/styles';

export default function SafeView({children, edges}: {children: React.ReactNode; edges?: Edge[]}) {
  return (
    <Layout style={globalStyles.flex}>
      <SafeAreaView edges={edges} style={globalStyles.flex}>
        {children}
      </SafeAreaView>
    </Layout>
  );
}

export const noTopEdges: Edge[] = ['left', 'right', 'bottom'];
