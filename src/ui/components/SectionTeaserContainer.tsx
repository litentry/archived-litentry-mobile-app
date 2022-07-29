import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Icon} from '@ui/library';
import {standardPadding} from '@ui/styles';

type Props = {
  title: string;
  onPress: () => void;
  children: React.ReactNode;
};

const TitleRight = () => (
  <View style={styles.icon}>
    <Icon name="chevron-right" />
  </View>
);

export function SectionTeaserContainer({children, title, onPress}: Props) {
  return (
    <Card onPress={onPress}>
      <Card.Title title={title} right={TitleRight} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: standardPadding,
  },
});
