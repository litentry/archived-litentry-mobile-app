import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import EmptyList from 'image/EmptyList.png';
import {Text} from '@ui/library';
import {standardPadding} from '@ui/styles';

type Props = {
  subheading: string;
  caption?: string;
};

export function EmptyStateTeaser({subheading, caption = 'Please check back for updates'}: Props) {
  return (
    <View style={styles.container} testID={'empty_state'}>
      <View style={styles.imageContainer}>
        <Image source={EmptyList} resizeMode="contain" />
      </View>
      <View style={styles.emptyContainer}>
        <Text variant="titleMedium">{subheading}</Text>
        <Text variant="bodySmall">{caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: standardPadding,
  },
  imageContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 3,
  },
});
