import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card, Subheading, Caption, Divider, List} from '@ui/library';
import {TipReason} from '@ui/components/Tips/TipReason';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useTip, Tip} from 'src/api/hooks/useTip';
import {Account} from '@ui/components/Account/Account';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {EmptyView} from '@ui/components/EmptyView';
import {Padder} from '@ui/components/Padder';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Tip'>;
};

type TipDetailContentProps = {
  tip: Tip;
};

function TipDetailContent({tip}: TipDetailContentProps) {
  return (
    <>
      <Card>
        <Card.Content>
          <View style={styles.whoContainer}>
            <View style={styles.sectionTextContainer}>
              <Subheading>Who</Subheading>
            </View>
            <View style={styles.addressContainer}>
              <AccountTeaser account={tip.who.account} />
            </View>
          </View>
          {tip.finder ? (
            <View style={styles.finderContainer}>
              <View style={styles.sectionTextContainer}>
                <Subheading>Finder</Subheading>
              </View>
              <View style={styles.addressContainer}>
                <AccountTeaser account={tip.finder.account} />
              </View>
            </View>
          ) : null}
        </Card.Content>
      </Card>
      <Padder scale={1} />
      <TipReason reason={tip.reason} />
      {tip.closes ? (
        <View style={styles.closesAtContainer}>
          <Subheading>Closes at</Subheading>
          <Subheading>#{tip.closes}</Subheading>
        </View>
      ) : null}
      <View style={styles.containerSpacing}>
        <Subheading>Tippers {tip.tippersCount > 0 ? `(${tip.tippersCount})` : ''}</Subheading>
        {Number(tip.median) > 0 ? <Caption>{tip.formattedMedian ?? ''}</Caption> : null}
      </View>
    </>
  );
}

function TipDetailScreen({route}: ScreenProps) {
  const id = route.params?.id;
  const {data: tip, loading} = useTip(id);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        ListHeaderComponent={tip ? <TipDetailContent tip={tip} /> : null}
        data={tip?.tippers}
        style={[globalStyles.paddedContainer, styles.container]}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => {
          return (
            <List.Item
              title={() => <Account account={item.account} />}
              description={() => <Caption>{item.formattedBalance}</Caption>}
              left={() => (
                <View style={globalStyles.justifyCenter}>
                  <Identicon value={item.account.address} size={35} />
                </View>
              )}
            />
          );
        }}
        ListEmptyComponent={<EmptyView height={200}>{`There are no tippers yet`}</EmptyView>}
        showsVerticalScrollIndicator={false}
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
    marginHorizontal: standardPadding,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  containerSpacing: {
    marginTop: 20,
  },
});

export default TipDetailScreen;
