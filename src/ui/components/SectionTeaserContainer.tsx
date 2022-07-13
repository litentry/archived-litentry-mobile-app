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
    <Card onPress={onPress} style={styles.container}>
      <Card.Title title={title} right={TitleRight} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  icon: {
    marginRight: standardPadding,
  },
});
