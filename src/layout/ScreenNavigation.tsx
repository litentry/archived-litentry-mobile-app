import React from 'react';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  IconProps,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const MenuIcon = (props: IconProps) => (
  <Icon {...props} name="menu-2-outline" />
);

type PropTypes = {
  onMenuPress: () => void;
  renderTitle: () => React.ReactElement;
};

export default function ScreenNavigation({
  onMenuPress,
  renderTitle,
}: PropTypes) {
  const renderMenuButton = () => (
    <TopNavigationAction onPress={onMenuPress} icon={MenuIcon} />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment="center"
        title={renderTitle}
        accessoryLeft={renderMenuButton}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
  },
});
