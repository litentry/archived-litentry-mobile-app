import React, {useMemo} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useRegistrars} from 'src/api/hooks/useRegistrars';
import globalStyles, {standardPadding, monofontFamily} from 'src/styles';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {Caption, Divider, List, View} from 'src/packages/base_components';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import AccountInfoInlineTeaser from 'presentational/AccountInfoInlineTeaser';
import Identicon from '@polkadot/reactnative-identicon';
import SafeView, {noTopEdges} from 'presentational/SafeView';

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
    <SafeView edges={noTopEdges}>
      <View style={styles.infoContainer}>
        <View style={globalStyles.spaceBetweenRowContainer}>
          <StatInfoBlock title="Count">
            <Caption style={styles.number}>{String(registrarsCount)}</Caption>
          </StatInfoBlock>
          <StatInfoBlock title="Lowest Fee">{lowestFee}</StatInfoBlock>
          <StatInfoBlock title="Highest Fee">{highestFee}</StatInfoBlock>
        </View>
      </View>

      <FlatList
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
    </SafeView>
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
