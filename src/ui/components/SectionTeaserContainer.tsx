import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Icon} from '@ui/library';
import {standardPadding} from '@ui/styles';

type PropTypes = {
  title: string;
  onPress: () => void;
  children: React.ReactNode;
};

export function SectionTeaserContainer({children, title, onPress}: PropTypes) {
  return (
    <Card onPress={onPress}>
      <Card.Title
        title={title}
        right={() => (
          <View style={styles.icon}>
            <Icon name="chevron-right" />
          </View>
        )}
      />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: standardPadding,
  },
});
