import React, {useMemo, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {formatNumber, formatBalance} from '@polkadot/util';
import {BlockNumber} from '@polkadot/types/interfaces';
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
  containerSpacing: {
    marginTop: 20,
  },
  closesAtContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tippersListContainer: {
    marginTop: 10,
  },
});

function TipDetailScreen({navigation, route}: ScreenProps) {
  const {api} = useContext(ChainApiContext);
  const hash = route.params?.hash;
  const tip = useTip(hash);
  const bestNumber = useCall<BlockNumber>(api?.derive.chain.bestNumber);

  const tipState = useMemo(() => {
    if (tip) {
      return extractTipState(tip, []); // TODO: pass allAccounts when available here
    }
  }, [tip]);

  if (!tip || !tipState) {
    return null;
  }

  const {closesAt, median} = tipState;

  return (
    <GenericNavigationLayout
      title="Tip"
      onBackPressed={() => navigation.goBack()}>
      <ScrollView style={[globalStyles.paddedContainer, styles.container]}>
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
            Tippers ({tip.tips.length})
          </Text>
          <Text>{formatBalance(median)}</Text>
          <View style={styles.tippersListContainer}>
            <List
              data={tip.tips}
              ItemSeparatorComponent={Divider}
              renderItem={({item}) => {
                const [tipper, balance] = item;
                return (
                  <ListItem
                    title={() => <Address address={tipper} />}
                    description={() => <Text>{formatBalance(balance)}</Text>}
                    accessoryLeft={() => (
                      <View style={{marginRight: 15}}>
                        <Identicon value={tipper} size={35} />
                      </View>
                    )}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </GenericNavigationLayout>
  );
}

export default TipDetailScreen;
