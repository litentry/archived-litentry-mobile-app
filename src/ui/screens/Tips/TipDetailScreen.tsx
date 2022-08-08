import React from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Card, Text, Divider, useTheme} from '@ui/library';
import {TipReason} from '@ui/components/Tips/TipReason';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useTip, Tip} from 'src/api/hooks/useTip';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {EmptyView} from '@ui/components/EmptyView';
import {Padder} from '@ui/components/Padder';
import {AppStackParamList} from '@ui/navigation/navigation';
import {accountScreen} from '@ui/navigation/routeKeys';

type TipDetailProps = {
  tip: Tip;
  toAccountDetails: (address: string) => void;
};

function TipDetailContent({tip, toAccountDetails}: TipDetailProps) {
  return (
    <>
      <Card>
        <Card.Content>
          <View style={styles.whoContainer}>
            <View style={styles.sectionTextContainer}>
              <Text variant="titleMedium">Who</Text>
            </View>
            <View style={styles.addressContainer}>
              <AccountTeaser account={tip.who} onPress={() => toAccountDetails(tip.who.address)} />
            </View>
          </View>
          {tip.finder ? (
            <View style={styles.finderContainer}>
              <View style={styles.sectionTextContainer}>
                <Text variant="titleMedium">Finder</Text>
              </View>
              <View style={styles.addressContainer}>
                <AccountTeaser
                  account={tip.finder}
                  onPress={() => {
                    if (tip.finder?.address) {
                      toAccountDetails(tip.finder.address);
                    }
                  }}
                />
              </View>
            </View>
          ) : null}
        </Card.Content>
      </Card>
      <Padder scale={1} />
      <TipReason reason={tip.reason} />
      {tip.closes ? (
        <View style={styles.closesAtContainer}>
          <Text variant="titleMedium">{`Closes at`}</Text>
          <Text variant="titleMedium">{tip.closesTime?.slice(0, 2).join(' ')}</Text>
        </View>
      ) : null}
      <View style={styles.containerSpacing}>
        <Text variant="titleMedium">Tippers {tip.tippersCount > 0 ? `(${tip.tippersCount})` : ''}</Text>
        {tip.formattedMedianTipValue ? <Text variant="bodySmall">{tip.formattedMedianTipValue}</Text> : null}
      </View>
    </>
  );
}

type ScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Tip'>;
};

export function TipDetailScreen({route, navigation}: ScreenProps) {
  const id = route.params?.id;
  const {data: tip, loading, refetching, refetch} = useTip(id);
  const {colors} = useTheme();

  if (loading && !tip) {
    return <LoadingView />;
  }

  const toAccountDetails = (address: string) => {
    navigation.navigate(accountScreen, {address});
  };

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        ListHeaderComponent={tip ? <TipDetailContent tip={tip} toAccountDetails={toAccountDetails} /> : null}
        data={tip?.tippers}
        style={[globalStyles.paddedContainer, styles.container]}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => (
          <View style={globalStyles.marginVertical}>
            <AccountTeaser account={item.account} onPress={() => toAccountDetails(item.account.address)}>
              <Text variant="bodySmall" testID={'account-details'}>
                {item.formattedBalance}
              </Text>
            </AccountTeaser>
          </View>
        )}
        ListEmptyComponent={<EmptyView height={200}>{`There are no tippers yet`}</EmptyView>}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={refetching}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sectionTextContainer: {
    flex: 1,
  },
  addressContainer: {
    flex: 4,
    paddingRight: 20,
    paddingVertical: 5,
  },
  finderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closesAtContainer: {
    marginTop: standardPadding * 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  containerSpacing: {
    marginTop: 20,
  },
});

export default TipDetailScreen;
