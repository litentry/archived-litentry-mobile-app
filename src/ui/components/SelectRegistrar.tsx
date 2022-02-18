import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Menu, List, Caption, Icon, useTheme, Divider} from '@ui/library';
import Identicon from '@polkadot/reactnative-identicon';
import {useRegistrarsSummary, Registrar} from 'src/api/hooks/useRegistrarsSummary';
import globalStyles from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {Account} from '@ui/components/Account/Account';

type Props = {
  onSelect: (registrar: Registrar) => void;
};

export function SelectRegistrar({onSelect}: Props) {
  const {colors} = useTheme();
  const {data: registrarsSummary} = useRegistrarsSummary();
  const [registrar, setRegistrar] = React.useState<Registrar>();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectRegistrar = (selectedRegistrar: Registrar) => {
    setRegistrar(selectedRegistrar);
    onSelect(selectedRegistrar);
    closeMenu();
  };

  if (!registrarsSummary) {
    return null;
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <View style={[styles.anchor, {borderColor: colors.onSurface}]}>
          <List.Item
            title={
              registrar ? (
                <View style={globalStyles.justifyCenter}>
                  <Account account={registrar.account} />
                </View>
              ) : (
                <Caption>{'Select registrar'}</Caption>
              )
            }
            left={() =>
              registrar ? (
                <View style={globalStyles.justifyCenter}>
                  <Identicon value={registrar?.address} size={25} />
                </View>
              ) : null
            }
            onPress={openMenu}
            right={() => (
              <View style={globalStyles.justifyCenter}>
                <Icon name="chevron-down" />
              </View>
            )}
          />
        </View>
      }>
      <FlatList
        style={styles.items}
        ItemSeparatorComponent={Divider}
        data={registrarsSummary.list}
        keyExtractor={(item) => item.address}
        renderItem={({item}) => <RegistrarItem onSelect={selectRegistrar} registrar={item} />}
      />
    </Menu>
  );
}

type RegistrarItemProps = {
  onSelect: (registrar: Registrar) => void;
  registrar: Registrar;
};

function RegistrarItem({onSelect, registrar}: RegistrarItemProps) {
  const {account, id, address, formattedFee} = registrar;

  return (
    <Menu.Item
      style={styles.menuItem}
      onPress={() => onSelect(registrar)}
      title={
        <View style={styles.fullWidth}>
          <View style={[globalStyles.rowAlignCenter, styles.fullWidth]}>
            <Identicon value={address} size={20} />
            <Padder scale={0.5} />
            <Account account={account} />
          </View>
          <Caption>{`Index: ${id}`}</Caption>
          <Caption>{`Fee: ${formattedFee}`}</Caption>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  anchor: {
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
  },
  items: {
    maxHeight: 250,
  },
  menuItem: {
    height: 90,
  },
  fullWidth: {
    width: '100%',
  },
});
