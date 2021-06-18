import React, {useMemo, useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {formatNumber, formatBalance} from '@polkadot/util';
import {BlockNumber, OpenTip} from '@polkadot/types/interfaces';
import Identicon from '@polkadot/reactnative-identicon';
import {Card, Text, List, Divider, ListItem} from '@ui-kitten/components';

import GenericNavigationLayout from 'presentational/GenericNavigationLayout';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import {useTip} from 'src/hook/useTip';
import TipReason from 'layout/tips/TipReason';
import globalStyles, {monofontFamily} from 'src/styles';
import {Address} from 'layout/Address';
import {useCall} from 'src/hook/useCall';
import {ChainApiContext} from 'context/ChainApiContext';
import {BlockTime} from 'layout/BlockTime';
import {extractTipState} from 'layout/tips/utils';
import NoDataImage from 'image/no_data.png';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'TipDetail'>;
};

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
  sectionText: {
    fontFamily: monofontFamily,
  },
  addressContainer: {
    flex: 4,
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
  emptyTippersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyTippersImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  emptyTippersText: {
    fontFamily: monofontFamily,
    marginBottom: 10,
  },
  tipperIconContainer: {marginRight: 15},
});

type TipDetailContentProps = {
  tip: OpenTip;
  bestNumber: BlockNumber | undefined;
};

function TipDetailContent({tip, bestNumber}: TipDetailContentProps) {
  const tipState = useMemo(() => {
    if (tip) {
      return extractTipState(tip, []); // TODO: pass allAccounts when available here
    }
  }, [tip]);

  if (!tipState) {
    return null;
  }

  const {closesAt, median} = tipState;
  const tippersCount = tip.tips.length;

  return (
    <>
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
        <Text category="s1" style={styles.sectionText}>
          Reason
        </Text>
        <TipReason reasonHash={tip.reason} />
      </View>
      {closesAt && bestNumber ? (
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
        {Number(median) > 0 ? <Text>{formatBalance(median)}</Text> : null}
      </View>
    </>
  );
}

function EmptyTippers() {
  return (
    <Card style={styles.emptyTippersContainer}>
      <Image source={NoDataImage} style={styles.emptyTippersImage} />
      <Text category="c2" style={styles.emptyTippersText}>
        There are no tippers yet.
      </Text>
    </Card>
  );
}

function TipDetailScreen({navigation, route}: ScreenProps) {
  const {api} = useContext(ChainApiContext);
  const hash = route.params?.hash;
  const tip = useTip(hash);
  const bestNumber = useCall<BlockNumber>(api?.derive.chain.bestNumber);

  if (!tip) {
    return null;
  }

  return (
    <GenericNavigationLayout title="Tip" onBackPressed={() => navigation.goBack()}>
      <List
        ListHeaderComponent={<TipDetailContent tip={tip} bestNumber={bestNumber} />}
        data={tip.tips}
        style={[globalStyles.paddedContainer, styles.container]}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => {
          const [tipper, balance] = item;
          return (
            <ListItem
              title={() => <Address address={tipper} />}
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
        ListEmptyComponent={<EmptyTippers />}
      />
    </GenericNavigationLayout>
  );
}

export default TipDetailScreen;
