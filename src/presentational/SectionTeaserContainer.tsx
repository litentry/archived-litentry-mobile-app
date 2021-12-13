import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Icon, View} from 'src/packages/base_components';
import {standardPadding} from 'src/styles';

type PropTypes = {
  title: string;
  onPressMore: () => void;
  children: React.ReactNode;
};

export function SectionTeaserContainer({children, title, onPressMore}: PropTypes) {
  return (
    <Card onPress={onPressMore}>
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
