import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Caption, Divider, List} from '@ui/library';
import {useRegistrarsSummary, Registrar} from 'src/api/hooks/useRegistrarsSummary';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import globalStyles, {standardPadding, monofontFamily} from '@ui/styles';
import LoadingView from '@ui/components/LoadingView';
import {Account} from '@ui/components/Account/Account';
import Identicon from '@polkadot/reactnative-identicon';
import {Padder} from '@ui/components/Padder';
import {EmptyView} from '@ui/components/EmptyView';

function RegistrarList() {
  const {data: registrarsSummary, loading} = useRegistrarsSummary();

  if (loading) {
    return <LoadingView />;
  }

  if (!registrarsSummary) {
    return null;
  }

  const {list: registrars, registrarsCount, formattedLowestFee, formattedHighestFee} = registrarsSummary;

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.infoContainer}>
          <View style={globalStyles.spaceBetweenRowContainer}>
            <StatInfoBlock title="Count">{String(registrarsCount)}</StatInfoBlock>
            <StatInfoBlock title="Lowest Fee">{formattedLowestFee}</StatInfoBlock>
            <StatInfoBlock title="Highest Fee">{formattedHighestFee}</StatInfoBlock>
          </View>
          <Padder scale={1} />
        </View>
      )}
      contentContainerStyle={styles.flatList}
      data={registrars}
      renderItem={({item: registrar}) => <RegistrarItem registrar={registrar} />}
      keyExtractor={(item) => item.address}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyView}
    />
  );
}

type RegistrarItemProps = {
  registrar: Registrar;
};

function RegistrarItem({registrar}: RegistrarItemProps) {
  const {account, id, formattedFee} = registrar;

  return (
    <List.Item
      left={() => (
        <View style={globalStyles.rowAlignCenter}>
          <Identicon value={account.address} size={30} />
        </View>
      )}
      title={<Account account={account} />}
      description={
        <>
          <Caption>{`Index: : ${id}`}</Caption>
          <Padder scale={1} />
          <Caption>{`Fee: ${formattedFee}`}</Caption>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: standardPadding,
  },
  infoContainer: {
    marginTop: standardPadding * 3,
    marginHorizontal: standardPadding * 3,
  },
  number: {
    fontSize: 20,
    fontFamily: monofontFamily,
    paddingVertical: standardPadding,
  },
});

export default RegistrarList;
