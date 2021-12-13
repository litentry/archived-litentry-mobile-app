import React from 'react';
import {StyleSheet, TouchableOpacity, ViewProps} from 'react-native';
import {Card, Icon, Text} from '@ui-kitten/components';
import globalStyles, {standardPadding} from '@ui/styles';

type PropTypes = {
  title: string;
  onPressMore: () => void;
  children: React.ReactNode;
};

export function SectionTeaserContainer(props: PropTypes) {
  return (
    <Card appearance="filled" activeOpacity={0.8} disabled>
      <Header onPressMore={props.onPressMore} title={props.title} />
      {props.children}
    </Card>
  );
}

const Header = (props?: ViewProps & Partial<PropTypes>) => (
  <TouchableOpacity style={styles.headerContainer} onPress={props?.onPressMore}>
    <Text category="h6">{props?.title}</Text>
    <Icon
      pack="ionic"
      name="chevron-forward-outline"
      style={[globalStyles.inlineIconDimension, globalStyles.iconColor]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: standardPadding,
  },
});
