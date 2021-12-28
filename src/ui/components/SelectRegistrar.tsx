import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Menu, List, Caption, Icon, useTheme, Divider} from '@ui/library';
import Identicon from '@polkadot/reactnative-identicon';
import AccountInfoInlineTeaser from './AccountInfoInlineTeaser';
import {stringShorten} from '@polkadot/util';
import {useRegistrars, RegistrarInfoWithIndex} from 'src/api/hooks/useRegistrars';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';

type Props = {
  onSelect: (registrar: RegistrarInfoWithIndex) => void;
};

export function SelectRegistrar({onSelect}: Props) {
  const {colors} = useTheme();
  const registrars = useRegistrars();
  const [registrar, setRegistrar] = React.useState<RegistrarInfoWithIndex>();
  const [visible, setVisible] = React.useState(false);

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
              <Caption>{registrar ? stringShorten(registrar.account.toString(), 12) : 'Select registrar'}</Caption>
            }
            onPress={openMenu}
            right={() => <Icon name="chevron-down" />}
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
    <List.Item
      style={styles.item}
      onPress={() => {
        onSelect(registrar);
      }}
      title={
        identity ? (
          <View style={styles.row}>
            <Caption>{`#${registrar.index} `}</Caption>
            <AccountInfoInlineTeaser identity={identity} />
          </View>
        ) : null
      }
      description={formatBalance(registrar.fee)}
      left={() => (
        <View style={styles.justifyCenter}>
          <Identicon value={address} size={30} />
        </View>
      )}
    />
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
  justifyCenter: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
