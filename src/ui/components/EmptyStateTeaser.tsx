import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import EmptyList from 'image/EmptyList.png';
import {Subheading, Caption} from '@ui/library';

type Props = {
  subheading: string;
  caption?: string;
};

export function EmptyStateTeaser({subheading, caption}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={EmptyList} resizeMode="contain" />
      </View>
      <View style={styles.emptyContainer}>
        <Subheading>{subheading}</Subheading>
        <Caption>{caption}</Caption>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 3,
  },
});
