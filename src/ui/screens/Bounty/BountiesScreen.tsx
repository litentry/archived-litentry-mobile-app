import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useBounties, Bounty} from 'src/api/hooks/useBounties';
import {EmptyView} from '@ui/components/EmptyView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import LoadingView from '@ui/components/LoadingView';
import {Text, Caption, Card, Headline, List} from '@ui/library';
import {bountyDetailScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';

export function BountiesScreen() {
  const {data: bounties, loading} = useBounties();

  return (
    <SafeView edges={noTopEdges}>
      {loading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={bounties}
          style={globalStyles.flex}
          contentContainerStyle={styles.listContent}
          keyExtractor={({index}) => index.toString()}
          renderItem={({item}) => <BountyItem bounty={item} />}
          ItemSeparatorComponent={() => <Padder scale={0.5} />}
          ListEmptyComponent={EmptyView}
        />
      )}
    </SafeView>
  );
}

function BountyItem({bounty}: {bounty: Bounty}) {
  const navigation = useNavigation();
  const {formattedValue, index, bountyStatus, description} = bounty;

  return (
    <Card onPress={() => navigation.navigate(bountyDetailScreen, {index})}>
      <List.Item
        left={() => (
          <View style={globalStyles.justifyCenter}>
            <Headline>{index.toString()}</Headline>
          </View>
        )}
        title={<Text>{bountyStatus.status}</Text>}
        description={<Caption>{description}</Caption>}
        right={() => (
          <View style={globalStyles.justifyCenter}>
            <Text>{formattedValue}</Text>
          </View>
        )}
      />
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
