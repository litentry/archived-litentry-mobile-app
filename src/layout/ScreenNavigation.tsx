import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  IconProps,
  useTheme,
} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const MenuIcon = (props: IconProps) => (
  <Icon {...props} name="menu-2-outline" />
);
const BalanceIcon = (props: IconProps) => (
  <Icon {...props} name="credit-card-outline" />
);

type PropTypes = {
  onMenuPress?: () => void;
  onBalancePress?: () => void;
  renderTitle: () => React.ReactElement;
};

export default function ScreenNavigation({
  onMenuPress,
  onBalancePress,
  renderTitle,
}: PropTypes) {
  const themeVars = useTheme();

  const renderMenuButton = onMenuPress
    ? () => <TopNavigationAction onPress={onMenuPress} icon={MenuIcon} />
    : undefined;
  const renderBalanceButton = onBalancePress
    ? () => <TopNavigationAction onPress={onBalancePress} icon={BalanceIcon} />
    : undefined;

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      style={{backgroundColor: themeVars['background-basic-color-1']}}>
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
