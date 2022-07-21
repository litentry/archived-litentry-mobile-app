import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Menu, Caption, useTheme, Divider} from '@ui/library';
import {useRegistrarsSummary, Registrar} from 'src/api/hooks/useRegistrarsSummary';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {AccountTeaser} from './Account/AccountTeaser';

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
        <TouchableOpacity
          style={[styles.anchor, {borderColor: colors.onSurface}]}
          onPress={openMenu}
          testID="select-registrar">
          {registrar ? <AccountTeaser account={registrar.account} /> : <Caption>{'Select registrar'}</Caption>}
        </TouchableOpacity>
      }>
      <FlatList
        style={styles.items}
        ItemSeparatorComponent={Divider}
        data={registrarsSummary.list}
        keyExtractor={(item) => item.account.address}
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
  const {account, id, formattedFee} = registrar;

  return (
    <View style={globalStyles.paddedContainer}>
      <AccountTeaser account={account} onPress={() => onSelect(registrar)}>
        <View style={globalStyles.rowAlignCenter}>
          <Caption>{`Index: ${id}`}</Caption>
          <Padder scale={0.5} />
          <Caption>{`Fee: ${formattedFee}`}</Caption>
        </View>
      </AccountTeaser>
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    paddingLeft: standardPadding * 1.5,
  },
  items: {
    maxHeight: 250,
  },
  menuItem: {
    height: 70,
  },
  fullWidth: {
    width: '100%',
  },
});
