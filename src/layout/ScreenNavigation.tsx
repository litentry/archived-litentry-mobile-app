import React from 'react';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  IconProps,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const ScanIcon = (props: IconProps) => <Icon {...props} name="code-outline" />;

const EditIcon = (props: IconProps) => <Icon {...props} name="edit" />;

const MenuIcon = (props: IconProps) => (
  <Icon {...props} name="menu-2-outline" />
);

const QRIcon = (props: IconProps) => <Icon {...props} name="video-outline" />;

type PropTypes = {
  onMenuPress: () => void;
  renderTitle: () => React.ReactElement;
};

export default function ScreenNavigation({
  onMenuPress,
  renderTitle,
}: PropTypes) {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={ScanIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}>
      <MenuItem accessoryLeft={QRIcon} title="Scan QR code" />
      <MenuItem accessoryLeft={EditIcon} title="Manually input address" />
    </OverflowMenu>
  );

  const renderMenuButton = () => (
    <TopNavigationAction onPress={onMenuPress} icon={MenuIcon} />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment="center"
        title={renderTitle}
        accessoryLeft={renderMenuButton}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
  },
});
