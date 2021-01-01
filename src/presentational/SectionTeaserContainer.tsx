import React from 'react';
import {StyleSheet, View, ViewProps, TouchableOpacity} from 'react-native';
import {Card, Text, Icon} from '@ui-kitten/components';
import globalStyles, {hitSlop, standardPadding} from 'src/styles';

type PropTypes = {
  title: string;
  onMorePress: () => void;
  children: React.ReactNode;
};

const Header = (props?: ViewProps & Partial<PropTypes>) => (
  <View style={styles.headerContainer}>
    <Text category="h6">{props?.title}</Text>
    <TouchableOpacity onPress={props?.onMorePress} hitSlop={hitSlop}>
      <Icon
        pack="ionic"
        name="chevron-forward-outline"
        style={[globalStyles.inlineIconDimension, globalStyles.iconColor]}
      />
    </TouchableOpacity>
  </View>
);

function SeactionTeaserContainer(props: PropTypes) {
  return (
    <Card appearance="filled" status="control" activeOpacity={0.8} disabled>
      <Header onMorePress={props.onMorePress} title={props.title} />
      {props.children}
    </Card>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: standardPadding,
  },
});

export default SeactionTeaserContainer;
