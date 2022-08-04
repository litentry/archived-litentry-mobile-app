import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {Menu, useTheme, List, Caption, Divider, Paragraph} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';
import {Icon} from './Icon';
import {standardPadding} from '@ui/styles';
import {FlashList} from '@shopify/flash-list';

type Item = {
  text: string;
  value: number;
};

type Props = {
  items: Item[];
  onSelect: (item: Item) => void;
};

const ItemRight = () => <Icon name="chevron-down" />;

export function Select({items, onSelect}: Props) {
  const {colors} = useTheme();
  const [selectedItem, setSelectedItem] = React.useState<Item>({text: '', value: 0});
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectItem = (item: Item) => {
    setSelectedItem(item);
    onSelect(item);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <View style={[styles.anchor, {borderColor: colors.onSurface}]}>
          <List.Item
            title={<Caption>{selectedItem.text ? selectedItem.text : 'Select item'}</Caption>}
            onPress={openMenu}
            right={ItemRight}
          />
        </View>
      }>
      <FlashList
        ItemSeparatorComponent={Divider}
        data={items}
        keyExtractor={(item) => String(item.value)}
        renderItem={({item}) => (
          <Menu.Item
            style={[styles.menuItem]}
            onPress={() => {
              selectItem(item);
            }}
            title={
              <View>
                <Paragraph>{item.text}</Paragraph>
              </View>
            }
          />
        )}
        estimatedItemSize={items.length}
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  anchor: {
    borderWidth: 0.5,
    borderRadius: 5,
  },
  menuItem: {
    marginVertical: standardPadding,
    maxHeight: 250,
  },
});
