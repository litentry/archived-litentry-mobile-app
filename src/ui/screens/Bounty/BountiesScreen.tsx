import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useBounties, BountyData} from 'src/api/hooks/useBounties';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {EmptyView} from '@ui/components/EmptyView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import LoadingView from '@ui/components/LoadingView';
import {Text, Caption, Card, Headline} from '@ui/library';
import {bountyDetailScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';

export function BountiesScreen() {
  const {data, isLoading} = useBounties();
  const bounties = React.useMemo(() => {
    return data ? Object.values(data).sort((a, b) => b.index.cmp(a.index)) : [];
  }, [data]);

  return (
    <SafeView edges={noTopEdges}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={bounties}
          style={globalStyles.flex}
          contentContainerStyle={styles.listContent}
          keyExtractor={({index}) => index.toString()}
          renderItem={({item}) => {
            const {index, bounty, description, proposals, bountyStatus} = item;
            return (
              <BountyItem
                bounty={bounty}
                description={description}
                index={index}
                proposals={proposals}
                bountyStatus={bountyStatus}
              />
            );
          }}
          ListEmptyComponent={EmptyView}
        />
      )}
    </SafeView>
  );
}

function BountyItem({bounty, description, index, bountyStatus}: BountyData) {
  const navigation = useNavigation();
  const formatBalance = useFormatBalance();
  const {value} = bounty;

  return (
    <Card
      onPress={() => navigation.navigate(bountyDetailScreen, {index: index.toString()})}
      style={styles.itemContainer}>
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
