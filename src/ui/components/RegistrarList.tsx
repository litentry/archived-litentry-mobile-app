import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {Text, Divider} from '@ui/library';
import {useRegistrarsSummary, RegistrarsSummary} from 'src/api/hooks/useRegistrarsSummary';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import globalStyles, {standardPadding, monofontFamily} from '@ui/styles';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import {EmptyView} from '@ui/components/EmptyView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@ui/navigation/navigation';
import {accountScreen} from '@ui/navigation/routeKeys';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

function RegistrarListHeader({registrarsSummary}: {registrarsSummary: RegistrarsSummary}) {
  const {registrarsCount, formattedLowestFee, formattedHighestFee} = registrarsSummary;

  return (
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
  );
}

function RegistrarList() {
  const {data: registrarsSummary, loading} = useRegistrarsSummary();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  if (loading) {
    return <LoadingView />;
  }

  if (!registrarsSummary) {
    return null;
  }

  const {list: registrarsList} = registrarsSummary;

  const toAccountDetails = (address: string) => {
    navigation.navigate(accountScreen, {address});
  };

  return (
    <FlatList
      ListHeaderComponent={<RegistrarListHeader registrarsSummary={registrarsSummary} />}
      contentContainerStyle={styles.flatList}
      data={registrarsList}
      renderItem={({item}) => (
        <View style={globalStyles.marginVertical}>
          <AccountTeaser
            testID="registrar_item"
            account={item.account}
            identiconSize={25}
            onPress={() => toAccountDetails(item.account.address)}>
            <View style={globalStyles.rowAlignCenter}>
              <Text variant="bodySmall">{`Index: ${item.id}`}</Text>
              <Padder />
              <Text variant="bodySmall">{`Fee: ${item.formattedFee}`}</Text>
            </View>
          </AccountTeaser>
        </View>
      )}
      keyExtractor={(item) => item.account.address}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyView}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: standardPadding * 2,
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
