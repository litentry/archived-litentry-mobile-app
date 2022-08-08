import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {Icon, Button, Card, Text, Menu, useTheme} from '@ui/library';
import {flatten} from 'lodash';
import * as dateUtils from 'src/utils/date';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {OrderByType, topicIdMap, usePolkassemblyDiscussions, Posts} from 'src/api/hooks/usePolkassemblyDiscussions';
import {PolkassemblyDiscussionStackParamList} from '@ui/navigation/navigation';
import {polkassemblyDiscussionDetail} from '@ui/navigation/routeKeys';
import {Padder} from '@ui/components/Padder';
import {ActivityIndicator} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {useNetwork} from '@atoms/network';
import {useAccount} from 'src/api/hooks/useAccount';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {SupportedNetworkType} from 'src/atoms/network';

type ScreenProps = {
  navigation: NavigationProp<PolkassemblyDiscussionStackParamList>;
};

const ItemSeparator = () => <Padder scale={0.5} />;

export function PolkassemblyDiscussions({navigation}: ScreenProps) {
  const {colors} = useTheme();
  const [orderBy, setOrderBy] = React.useState<OrderByType>('lastCommented');
  const [topicId, setTopicId] = React.useState<number>();
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = React.useState(false);
  const {data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading} = usePolkassemblyDiscussions({
    orderBy,
    topicId,
  });

  const {currentNetwork} = useNetwork();

  const toDiscussionDetail = (id: number) => {
    navigation.navigate(polkassemblyDiscussionDetail, {id});
  };

  const sortBy = (order: OrderByType) => {
    setSortMenuVisible(false);
    setOrderBy(order);
  };

  const filterBy = (topic: number) => {
    setFilterMenuVisible(false);
    setTopicId(topic);
  };

  return (
    <SafeView edges={noTopEdges}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.content}
          data={flatten(data?.pages)}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View
              style={[globalStyles.rowAlignCenter, styles.menuContainer, {backgroundColor: colors.primaryContainer}]}>
              <Menu
                visible={sortMenuVisible}
                onDismiss={() => {
                  setSortMenuVisible(false);
                }}
                anchor={
                  <TouchableOpacity
                    onPress={() => {
                      setSortMenuVisible(true);
                    }}
                    style={globalStyles.rowAlignCenter}>
                    <Text variant="titleMedium">Sort by</Text>
                    <Icon name="chevron-down" size={25} />
                  </TouchableOpacity>
                }>
                <Menu.Item
                  disabled={orderBy === 'lastCommented'}
                  title="Last Commented"
                  onPress={() => {
                    sortBy('lastCommented');
                  }}
                />
                <Menu.Item
                  disabled={orderBy === 'dateAddedNewest'}
                  title="Date Added (newest)"
                  onPress={() => {
                    sortBy('dateAddedNewest');
                  }}
                />
                <Menu.Item
                  disabled={orderBy === 'dateAddedOldest'}
                  title="Date Added (oldest)"
                  onPress={() => {
                    sortBy('dateAddedOldest');
                  }}
                />
              </Menu>
              <Padder scale={1} />
              <Menu
                visible={filterMenuVisible}
                onDismiss={() => {
                  setFilterMenuVisible(false);
                }}
                anchor={
                  <TouchableOpacity
                    onPress={() => {
                      setFilterMenuVisible(true);
                    }}
                    style={globalStyles.rowAlignCenter}>
                    <Text variant="titleMedium">Filter</Text>
                    <Icon name="chevron-down" size={25} />
                  </TouchableOpacity>
                }>
                {Object.entries(topicIdMap).map(([name, id]) => (
                  <Menu.Item
                    disabled={topicId === id}
                    key={name}
                    title={name}
                    onPress={() => {
                      filterBy(id);
                    }}
                  />
                ))}
              </Menu>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              {hasNextPage ? (
                isFetching || isFetchingNextPage ? (
                  <ActivityIndicator animating />
                ) : (
                  <Button onPress={() => fetchNextPage()}>{`Load more`}</Button>
                )
              ) : null}
            </View>
          }
          renderItem={({item}) => (
            <PolkassemblyDiscussionItem post={item} currentNetwork={currentNetwork.key} onPress={toDiscussionDetail} />
          )}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item) => String(item.id)}
        />
      )}
    </SafeView>
  );
}

type ItemProps = {
  post: Posts;
  currentNetwork: SupportedNetworkType;
  onPress: (id: number) => void;
};

function PolkassemblyDiscussionItem({post, currentNetwork, onPress}: ItemProps) {
  const polkaAddress = post.author?.polkadot_default_address ?? undefined;
  const kusamaAddress = post.author?.kusama_default_address ?? undefined;
  const address = currentNetwork === 'polkadot' ? polkaAddress : kusamaAddress;
  const {data: accountInfo} = useAccount(address);

  return (
    <Card onPress={() => onPress(post.id)}>
      <Card.Content>
        <Text variant="bodySmall" selectable numberOfLines={1}>
          {post.title}
        </Text>
        <View style={globalStyles.rowAlignCenter}>
          <Text variant="bodySmall">{`By `}</Text>
          {address && accountInfo ? (
            <AccountTeaser account={accountInfo} />
          ) : (
            <Text variant="bodySmall">{post.author?.username || ''}</Text>
          )}
        </View>
        <View style={globalStyles.rowAlignCenter}>
          <Text variant="bodySmall">{`${dateUtils.fromNow(post.created_at)} in `}</Text>
          <Text>{post.topic.name}</Text>
        </View>
        {post.content ? (
          <View style={globalStyles.justifyCenter}>
            <Padder scale={0.5} />
            <Text numberOfLines={1}>{post.content}</Text>
          </View>
        ) : null}

        <Padder scale={0.5} />
        <View style={globalStyles.rowAlignCenter}>
          {post.comments_aggregate.aggregate?.count ? (
            <>
              <View style={globalStyles.rowAlignCenter}>
                <Icon name="message-outline" size={15} />
                <Padder scale={0.3} />
                <Text variant="bodySmall">{post.comments_aggregate.aggregate.count} comments</Text>
              </View>
              <Padder scale={1} />
            </>
          ) : null}

          {post.last_update?.comment_id && post.last_update.last_update ? (
            <View style={globalStyles.rowAlignCenter}>
              <Icon name="clock-outline" size={15} />
              <Padder scale={0.3} />
              <Text variant="bodySmall">commented {dateUtils.fromNow(post.last_update.last_update)}</Text>
            </View>
          ) : null}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: standardPadding * 2,
  },
  menuContainer: {
    padding: standardPadding,
    marginBottom: standardPadding,
  },
  footer: {
    paddingTop: standardPadding * 2,
    marginBottom: standardPadding * 2,
  },
});
