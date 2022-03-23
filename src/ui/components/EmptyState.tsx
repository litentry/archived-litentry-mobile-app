import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import EmptyList from 'image/EmptyList.png';
import {Subheading, Caption} from '@ui/library';
import {standardPadding} from '@ui/styles';

type Props = {
  subheading: string;
  caption?: string;
};

export function EmptyState({subheading, caption}: Props) {
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
    paddingVertical: standardPadding,
  },
  imageContainer: {
    width: '30%',
    height: '20%',
    paddingHorizontal: standardPadding * 2,
  },
  emptyContainer: {
    maxWidth: '90%',
    paddingHorizontal: standardPadding,
    flexWrap: 'wrap',
  },
});
