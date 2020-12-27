import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  IconProps,
} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import globalStyles from 'src/styles';

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
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <TopNavigation
          alignment="center"
          title={renderTitle}
          accessoryLeft={renderMenuButton}
          accessoryRight={renderBalanceButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
  },
});
