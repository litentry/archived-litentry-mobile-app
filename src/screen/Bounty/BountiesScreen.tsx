import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Divider, Layout, Spinner, Text, useTheme} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {useBounties} from 'src/api/hooks/useBounties';
import {EmptyView} from 'presentational/EmptyView';
import type {Bounty, BountyIndex} from '@polkadot/types/interfaces';
import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {BountyStatusInfo, getBountyStatus} from './helper/getBountyStatus';

type BountyItemProps = {
  bounty: Bounty;
  bountyStatus: BountyStatusInfo;
  description: string;
  index: BountyIndex;
  proposals?: DeriveCollectiveProposal[];
};

export function BountiesScreen() {
  const {data, isLoading} = useBounties();
  const bounties = data?.bounties
    .sort((a, b) => b.index.cmp(a.index))
    .map(({bounty, description, index, proposals}) => ({
      bounty,
      bountyStatus: getBountyStatus(bounty.status),
      description,
      index,
      proposals,
    }));

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {isLoading ? (
          <View style={globalStyles.centeredContainer}>
            <Spinner />
          </View>
        ) : (
          <FlatList
            style={globalStyles.flex}
            contentContainerStyle={styles.content}
            keyExtractor={(item) => item.index.toString()}
            data={bounties}
            renderItem={({item}) => (
              <BountyItem
                bounty={item.bounty}
                description={item.description}
                index={item.index}
                proposals={item.proposals}
                bountyStatus={item.bountyStatus}
              />
            )}
            ItemSeparatorComponent={Divider}
            ListEmptyComponent={EmptyView}
          />
        )}
      </SafeView>
    </Layout>
  );
}

function BountyItem({bounty, description, index, bountyStatus}: BountyItemProps) {
  const formatBalance = useFormatBalance();
  const {value} = bounty;

  return (
    <View style={[styles.container, styles.content]}>
      <View style={styles.itemLeft}>
        <Text category="s1" appearance="hint">
          {index.toString()}
        </Text>
      </View>
      <View style={styles.itemMiddle}>
        <Text category="s1">{description}</Text>
        <Text category="c2" status="info">
          {bountyStatus.status}
        </Text>
      </View>
      <View style={[styles.container, styles.itemRight]}>
        <Text appearance="hint">{formatBalance(value)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemLeft: {
    flex: 1,
  },
  itemMiddle: {
    flex: 5,
  },
  itemRight: {
    flex: 4,
    justifyContent: 'flex-end',
  },
  content: {
    paddingVertical: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
