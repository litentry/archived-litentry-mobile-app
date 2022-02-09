import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Menu, List, Caption, Icon, useTheme, Divider} from '@ui/library';
import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from './AccountInfoInlineTeaser';
import {stringShorten} from '@polkadot/util';
import {useRegistrars, RegistrarInfoWithIndex} from 'src/api/hooks/useRegistrars';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import globalStyles from '@ui/styles';
import {Padder} from '@ui/components/Padder';

type Props = {
  onSelect: (registrar: RegistrarInfoWithIndex) => void;
};

export function SelectRegistrar({onSelect}: Props) {
  const {colors} = useTheme();
  const registrars = useRegistrars();
  const [registrar, setRegistrar] = React.useState<RegistrarInfoWithIndex>();
  const [visible, setVisible] = React.useState(false);
  const {data: identity} = useAccountIdentityInfo(registrar?.account.toString());

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectAccount = (selectedRegistrar: RegistrarInfoWithIndex) => {
    setRegistrar(selectedRegistrar);
    onSelect(selectedRegistrar);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <View style={[styles.anchor, {borderColor: colors.onSurface}]}>
          <List.Item
            title={
              registrar ? (
                identity ? (
                  <Caption>
                    {identity.hasIdentity ? identity.display : stringShorten(identity.accountId.toString(), 11)}
                  </Caption>
                ) : null
              ) : (
                <Caption>{'Select registrar'}</Caption>
              )
            }
            left={() =>
              registrar ? (
                <View style={globalStyles.justifyCenter}>
                  <Identicon value={registrar?.account.toString()} size={20} />
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
        data={registrars}
        keyExtractor={(item) => item.account.toString()}
        renderItem={({item}) => <RegistrarItem onSelect={selectAccount} registrar={item} />}
      />
    </Menu>
  );
}

type RegistrarItemProps = {
  onSelect: (registrar: RegistrarInfoWithIndex) => void;
  registrar: RegistrarInfoWithIndex;
};

function RegistrarItem({onSelect, registrar}: RegistrarItemProps) {
  const address = registrar.account.toString();
  const {data: identity} = useAccountIdentityInfo(address);
  const formatBalance = useFormatBalance();
  return (
    <Menu.Item
      style={styles.menuItem}
      onPress={() => onSelect(registrar)}
      title={
        <View style={globalStyles.rowAlignCenter}>
          <Identicon value={address} size={30} />
          <Padder scale={0.5} />
          <View>
            {identity ? <AccountInfoInlineTeaser identity={identity} /> : null}
            <Caption>{`Index: ${registrar.index}`}</Caption>
            <Caption>{`Fee: ${formatBalance(registrar.fee)}`}</Caption>
          </View>
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
});
