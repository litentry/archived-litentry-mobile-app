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
const BalanceIcon = (props: IconProps) => (
  <Icon {...props} name="credit-card-outline" />
);

type PropTypes = {
  onMenuPress: () => void;
  onBalancePress: () => void;
  renderTitle: () => React.ReactElement;
};

export default function ScreenNavigation({
  onMenuPress,
  onBalancePress,
  renderTitle,
}: PropTypes) {
  const renderMenuButton = () => (
    <TopNavigationAction onPress={onMenuPress} icon={MenuIcon} />
  );
  const renderBalanceButton = () => (
    <TopNavigationAction onPress={onBalancePress} icon={BalanceIcon} />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment="center"
        title={renderTitle}
        accessoryLeft={renderMenuButton}
        accessoryRight={renderBalanceButton}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
  },
});
