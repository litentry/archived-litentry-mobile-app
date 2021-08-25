import React from 'react';
import {View, Text} from 'react-native';
import SafeView, {noTopEdges} from 'presentational/SafeView';

export function RegisterSubIdentitiesScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <Text>Register sub identitites</Text>
    </SafeView>
  );
}
