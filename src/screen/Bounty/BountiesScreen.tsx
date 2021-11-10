import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Divider, Layout, Spinner, Text, Card} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {useBounties} from 'src/api/hooks/useBounties';
import {EmptyView} from 'presentational/EmptyView';
import Padder from 'presentational/Padder';
import {Account} from 'layout/Account';
import Identicon from '@polkadot/reactnative-identicon';
import {Bounty, BountyIndex} from '@polkadot/types/interfaces';
import {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
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
    <Card style={styles.card} disabled>
      <View style={styles.row}>
        <Text category="s1" appearance="hint">
          {index.toString()}
        </Text>
        <Text style={styles.description} category={'c1'} numberOfLines={1} ellipsizeMode="middle">
          {description}
        </Text>
        <View style={styles.itemRight}>
          <Text category={'c2'}>{formatBalance(value)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        {bountyStatus.curator && (
          <>
            <Text category="c1">curator: </Text>
            <Account id={bountyStatus.curator.toString()}>
              {(identity) => (
                <View style={[styles.row, styles.accountsRow]}>
                  {identity?.accountId && <Identicon value={identity.accountId} size={20} />}
                  <Padder scale={0.3} />
                  {identity?.display && (
                    <Text numberOfLines={1} category={'c1'} ellipsizeMode="middle">
                      {identity.display}
                    </Text>
                  )}
                </View>
              )}
            </Account>
          </>
        )}
      </View>
      <View style={styles.row}>
        <Text category="c1">status: </Text>
        <Text category={'c1'} numberOfLines={1} ellipsizeMode="middle" status="info">
          {bountyStatus.status}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
  },
  accountsRow: {
    flex: 1,
    marginRight: 20,
  },
  card: {
    marginBottom: standardPadding,
  },
  description: {
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: standardPadding,
  },
});
