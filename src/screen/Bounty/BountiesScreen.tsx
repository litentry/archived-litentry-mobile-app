import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Layout} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {useBounties, BountyStatusInfo} from 'src/api/hooks/useBounties';
import {EmptyView} from 'presentational/EmptyView';
import {Bounty, BountyIndex} from '@polkadot/types/interfaces';
import {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import LoadingView from 'presentational/LoadingView';
import {Text, Caption, Card, Headline} from 'src/packages/base_components/index';

type BountyItemProps = {
  bounty: Bounty;
  bountyStatus: BountyStatusInfo;
  description: string;
  index: BountyIndex;
  proposals?: DeriveCollectiveProposal[];
};

export function BountiesScreen() {
  const {data, isLoading} = useBounties();

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            data={data}
            style={globalStyles.flex}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item) => item.index.toString()}
            renderItem={({item}) => {
              return (
                <BountyItem
                  bounty={item.bounty}
                  description={item.description}
                  index={item.index}
                  proposals={item.proposals}
                  bountyStatus={item.bountyStatus}
                />
              );
            }}
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
    <Card onPress={() => console.log('navigate to detail screen')} style={styles.itemContainer}>
      <Card.Content style={styles.itemContent}>
        <View style={styles.itemRight}>
          <View style={styles.bountyIndexContainer}>
            <Headline>{index.toString()}</Headline>
          </View>
          <Text>{description}</Text>
        </View>
        <View style={styles.itemLeft}>
          <Text>{formatBalance(value)}</Text>
          <Caption>{bountyStatus.status}</Caption>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
  },
  accountsRow: {
    flex: 1,
    marginRight: 20,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeft: {alignItems: 'flex-end'},
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {marginBottom: 10},
  bountyIndexContainer: {marginRight: 15},
});
