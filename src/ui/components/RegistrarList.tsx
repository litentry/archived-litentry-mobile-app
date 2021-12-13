import React, {useMemo} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {Caption, Divider, List} from '@ui/library';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useRegistrars} from 'src/api/hooks/useRegistrars';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import globalStyles, {standardPadding, monofontFamily} from '@ui/styles';

function RegistrarList() {
  const registrars = useRegistrars();
  const registrarsCount = registrars.length;
  const formatBalance = useFormatBalance();

  const sortedRegistrars = useMemo(
    () => [...registrars].sort((a, b) => (a.fee.toNumber() > b.fee.toNumber() ? 1 : -1)),
    [registrars],
  );

  if (registrarsCount === 0) {
    return (
      <View style={globalStyles.centeredContainer}>
        <Caption>No Registrar available.</Caption>
      </View>
    );
  }

  const lowestFee = formatBalance(sortedRegistrars[0]?.fee ?? '');
  const highestFee = formatBalance(sortedRegistrars[sortedRegistrars.length - 1]?.fee ?? '');

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.infoContainer}>
          <View style={globalStyles.spaceBetweenRowContainer}>
            <StatInfoBlock title="Count">
              <Caption style={styles.number}>{String(registrarsCount)}</Caption>
            </StatInfoBlock>
            <StatInfoBlock title="Lowest Fee">{lowestFee}</StatInfoBlock>
            <StatInfoBlock title="Highest Fee">{highestFee}</StatInfoBlock>
          </View>
        </View>
      )}
      contentContainerStyle={styles.flatList}
      data={registrars}
      renderItem={({item: registrar}) => (
        <RegistrarItem
          key={registrar.account.toString()}
          address={registrar.account.toString()}
          fee={formatBalance(registrar.fee)}
          index={registrar.index}
        />
      )}
      keyExtractor={(item) => item.account.toString()}
      ItemSeparatorComponent={Divider}
    />
  );
}

type RegistrarItemProps = {
  address: string;
  fee?: string;
  index: number;
};

function RegistrarItem({address, fee, index}: RegistrarItemProps) {
  const {data: identity} = useAccountIdentityInfo(address);
  return (
    <List.Item
      title={
        identity ? (
          <View style={styles.row}>
            <Caption>{`#${index} `}</Caption>
            <AccountInfoInlineTeaser identity={identity} />
          </View>
        ) : null
      }
      description={fee}
      left={() => (
        <View style={styles.justifyCenter}>
          <Identicon value={address} size={30} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: standardPadding,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  infoContainer: {
    marginTop: standardPadding * 3,
    marginHorizontal: standardPadding * 3,
  },
  row: {flexDirection: 'row'},
  number: {
    fontSize: 20,
    fontFamily: monofontFamily,
    paddingVertical: standardPadding,
  },
});

export default RegistrarList;
