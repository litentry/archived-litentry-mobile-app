import React from 'react';
import {StyleSheet, Text} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';

export function EventsCalendarScreen() {
  return (
    <SafeView edges={noTopEdges}>
      <Text>Events Calendar</Text>
    </SafeView>
  );
}

const styles = StyleSheet.create({});
