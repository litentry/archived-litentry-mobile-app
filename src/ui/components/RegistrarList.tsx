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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {memberDetailsScreen} from '@ui/navigation/routeKeys';

function RegistrarList() {
  const {data: registrarsSummary, loading} = useRegistrarsSummary();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

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
            <StatInfoBlock title="Count" testID="registrars_count">
              {String(registrarsCount)}
            </StatInfoBlock>
            <StatInfoBlock title="Lowest Fee" testID="registrars_lowest_fee">
              {formattedLowestFee}
            </StatInfoBlock>
            <StatInfoBlock title="Highest Fee" testID="registrars_highest_fee">
              {formattedHighestFee}
            </StatInfoBlock>
          </View>
          <Padder scale={1} />
        </View>
      )}
      contentContainerStyle={styles.flatList}
      data={registrars}
      renderItem={({item: registrar}) => (
        <RegistrarItem
          testID="registrar_item"
          registrar={registrar}
          onPress={() => navigation.navigate(memberDetailsScreen, {address: registrar.address})}
        />
      )}
      keyExtractor={(item) => item.account.address}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyView}
    />
  );
}

type RegistrarItemProps = {
  testID: string;
  registrar: Registrar;
  onPress?: () => void;
};

function RegistrarItem({registrar, testID, onPress}: RegistrarItemProps) {
  const {account, id, formattedFee} = registrar;

  return (
    <List.Item
      testID={testID}
      left={() => (
        <View style={globalStyles.rowAlignCenter}>
          <Identicon value={account.address} size={30} />
        </View>
      )}
      title={<Account account={account} onPress={onPress} />}
      description={
        <>
          <Caption>{`Index: ${id}`}</Caption>
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
