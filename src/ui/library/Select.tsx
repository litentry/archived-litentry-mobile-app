import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {Menu, useTheme, List, Caption, Divider} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';
import {Icon} from './Icon';

type Item = {
  text: string;
  value: number;
};

type Props = {
  items: Item[];
  onSelect: (item: Item) => void;
};

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
            right={() => <Icon name="chevron-down" />}
          />
        </View>
      }>
      <FlatList
        style={styles.items}
        ItemSeparatorComponent={Divider}
        data={items}
        keyExtractor={(item) => String(item.value)}
        renderItem={({item}) => (
          <List.Item
            style={styles.item}
            titleNumberOfLines={3}
            onPress={() => {
              selectItem(item);
            }}
            title={item.text}
          />
        )}
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  anchor: {
    borderWidth: 0.5,
    borderRadius: 5,
  },
  items: {
    maxHeight: 250,
  },
  item: {
    width: 300,
  },
});
