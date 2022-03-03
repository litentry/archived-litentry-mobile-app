import React from 'react';
import {StyleSheet, Text} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';

export function CalendarScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <Text>Calendar</Text>
    </SafeView>
  );
}

const styles = StyleSheet.create({});
