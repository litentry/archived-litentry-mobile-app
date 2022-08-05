import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useBounties, Bounty} from 'src/api/hooks/useBounties';
import {EmptyView} from '@ui/components/EmptyView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import LoadingView from '@ui/components/LoadingView';
import {Text, Caption, Card, Headline, List, Button, useBottomSheet, FlatList} from '@ui/library';
import {bountyDetailScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {AddBounty} from '@ui/components/AddBounty';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
};

const ItemSeparator = () => <Padder scale={0.5} />;

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
          keyExtractor={({index}) => index.toString()}
          ListHeaderComponent={
            <View style={styles.bounty}>
              <Button icon="plus" mode="outlined" onPress={openBottomSheet}>
                Add Bounty
              </Button>
            </View>
          }
          renderItem={({item}) => <BountyItem bounty={item} onPress={toBountyDetails} />}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={EmptyView}
          estimatedItemSize={bounties?.length}
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

  const ItemLeft = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Headline>{index.toString()}</Headline>
      </View>
    ),
    [index],
  );

  const getItemRight = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Text>{formattedValue}</Text>
      </View>
    ),
    [formattedValue],
  );

  return (
    <Card onPress={() => onPress(index)} style={styles.bountyCard}>
      <List.Item
        left={ItemLeft}
        title={<Text>{bountyStatus.status}</Text>}
        description={<Caption>{description}</Caption>}
        right={getItemRight}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  bounty: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    paddingRight: standardPadding,
  },
  bountyCard: {
    marginHorizontal: standardPadding,
  },
});
