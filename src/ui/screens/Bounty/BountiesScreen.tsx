import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useBounties, Bounty} from 'src/api/hooks/useBounties';
import {EmptyView} from '@ui/components/EmptyView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import LoadingView from '@ui/components/LoadingView';
import {Text, Caption, Card, Headline, List, Button, useBottomSheet} from '@ui/library';
import {bountyDetailScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {AddBounty} from '@ui/components/AddBounty';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
};

export function BountiesScreen({navigation}: ScreenProps) {
  const {openBottomSheet, closeBottomSheet, BottomSheet} = useBottomSheet();
  const {data: bounties, loading} = useBounties();

  const toBountyDetails = (index: string) => {
    navigation.navigate(bountyDetailScreen, {index});
  };

  return (
    <SafeView edges={noTopEdges}>
      {loading && !bounties ? (
        <LoadingView />
      ) : (
        <FlatList
          data={bounties}
          style={globalStyles.flex}
          contentContainerStyle={styles.listContent}
          keyExtractor={({index}) => index.toString()}
          ListHeaderComponent={
            <View style={styles.bounty}>
              <Button style={{}} icon="plus" mode="outlined" onPress={openBottomSheet}>
                Add Bounty
              </Button>
            </View>
          }
          renderItem={({item}) => <BountyItem bounty={item} onPress={toBountyDetails} />}
          ItemSeparatorComponent={() => <Padder scale={0.5} />}
          ListEmptyComponent={EmptyView}
        />
      )}

      <BottomSheet>
        <AddBounty onClose={closeBottomSheet} />
      </BottomSheet>
    </SafeView>
  );
}

type BountyItemProps = {
  bounty: Bounty;
  onPress: (index: string) => void;
};

function BountyItem({bounty, onPress}: BountyItemProps) {
  const {formattedValue, index, bountyStatus, description} = bounty;

  return (
    <Card onPress={() => onPress(index)}>
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
  bounty: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 15,
  },
});
