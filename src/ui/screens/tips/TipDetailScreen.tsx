import React, {useContext, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {BlockNumber} from '@polkadot/types/interfaces';
import type {PalletTipsOpenTip} from '@polkadot/types/lookup';
import {formatNumber} from '@polkadot/util';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Card, Divider, ListItem, Text} from '@ui-kitten/components';
import {useAccounts} from 'context/AccountsContext';
import {ChainApiContext} from 'context/ChainApiContext';
import AddressInlineTeaser from '@ui/components/AddressInlineTeaser';
import {BlockTime} from '@ui/components/BlockTime';
import {TipReason} from '@ui/components/tips/TipReason';
import {extractTipState} from 'src/utils/tips';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useTip} from 'src/api/hooks/useTip';
import {useCall} from '@hooks/useCall';
import {Account} from '@ui/components/Account';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import globalStyles, {monofontFamily, standardPadding} from '@ui/styles';
import {EmptyView} from '@ui/components/EmptyView';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Tip'>;
};

type TipDetailContentProps = {
  tip: PalletTipsOpenTip;
  bestNumber: BlockNumber | undefined;
};

function TipDetailContent({tip, bestNumber}: TipDetailContentProps) {
  const formatBalance = useFormatBalance();
  const {accounts} = useAccounts();
  const tipState = useMemo(() => {
    if (tip) {
      return extractTipState(tip, Object.keys(accounts));
    }
  }, [tip, accounts]);

  if (!tipState) {
    return null;
  }

  const {closesAt, median} = tipState;
  const tippersCount = tip.tips.length;

  return (
    <View style={styles.header}>
      <Card>
        <View style={styles.whoContainer}>
          <View style={styles.sectionTextContainer}>
            <Text category="s1" style={styles.sectionText}>
              Who
            </Text>
          </View>
          <View style={styles.addressContainer}>
            <AddressInlineTeaser address={String(tip.who)} />
          </View>
        </View>
        <View style={styles.finderContainer}>
          <View style={styles.sectionTextContainer}>
            <Text category="s1" style={styles.sectionText}>
              Finder
            </Text>
          </View>
          <View style={styles.addressContainer}>
            <AddressInlineTeaser address={String(tip.finder)} />
          </View>
        </View>
      </Card>
      <View style={styles.containerSpacing}>
        <TipReason reasonHash={tip.reason} />
      </View>
      {closesAt && bestNumber && closesAt.gt(bestNumber) ? (
        <View style={styles.closesAtContainer}>
          <Text category="s1" style={styles.sectionText}>
            Closes at
          </Text>
          <>
            <BlockTime blockNumber={closesAt.sub(bestNumber)} />
            <Text style={styles.sectionText}>#{formatNumber(closesAt)}</Text>
          </>
        </View>
      ) : null}
      <View style={styles.containerSpacing}>
        <Text category="s1" style={styles.sectionText}>
          Tippers {tippersCount > 0 ? `(${tippersCount})` : ''}
        </Text>
        {Number(median) > 0 ? <Text>{formatBalance(median ?? '')}</Text> : null}
      </View>
    </View>
  );
}

function TipDetailScreen({route}: ScreenProps) {
  const formatBalance = useFormatBalance();
  const {api} = useContext(ChainApiContext);
  const hash = route.params?.hash;
  const {data: tip, isLoading} = useTip(hash);
  const bestNumber = useCall<BlockNumber>(api?.derive.chain.bestNumber);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        ListHeaderComponent={tip ? <TipDetailContent tip={tip} bestNumber={bestNumber} /> : null}
        data={tip?.tips.toArray()}
        style={[globalStyles.paddedContainer, styles.container]}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => {
          const [tipper, balance] = item;

          return (
            <ListItem
              title={() => {
                return (
                  <Account id={tipper.toString()}>
                    {(identity) => {
                      return identity ? <AccountInfoInlineTeaser identity={identity} /> : <Text>{String(tipper)}</Text>;
                    }}
                  </Account>
                );
              }}
              description={() => {
                return <Text>{formatBalance(balance)}</Text>;
              }}
              accessoryLeft={() => (
                <View style={styles.tipperIconContainer}>
                  <Identicon value={tipper} size={35} />
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
  header: {
    marginBottom: standardPadding,
  },
  whoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionText: {
    fontFamily: monofontFamily,
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
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  containerSpacing: {
    marginTop: 20,
  },
  tipperIconContainer: {marginRight: 15},
});

export default TipDetailScreen;
