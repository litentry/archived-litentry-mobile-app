import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {Icon, Button, Card, Caption, Text, Menu, Subheading, useTheme} from '@ui/library';
import AddressInlineTeaser from '@ui/components/AddressInlineTeaser';
import {flatten} from 'lodash';
import * as dateUtils from 'src/utils/date';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {OrderByType, topicIdMap, usePolkassemblyDiscussions} from 'src/api/hooks/usePolkassemblyDiscussions';
import {PolkassemblyDiscussionStackParamList} from '@ui/navigation/navigation';
import {polkassemblyDiscussionDetail} from '@ui/navigation/routeKeys';
import {Padder} from '@ui/components/Padder';
import {ActivityIndicator} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';

export function PolkassemblyDiscussions({
  navigation,
}: {
  navigation: NavigationProp<PolkassemblyDiscussionStackParamList>;
}) {
  const {colors} = useTheme();
  const [orderBy, setOrderBy] = React.useState<OrderByType>('lastCommented');
  const [topicId, setTopicId] = React.useState<number>();
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = React.useState(false);
  const {data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading} = usePolkassemblyDiscussions({
    orderBy,
    topicId,
  });

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
            <View style={[globalStyles.rowAlignCenter, styles.menuContainer, {backgroundColor: colors.primary}]}>
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
                    <Subheading>Sort by</Subheading>
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
                    <Subheading>Filter</Subheading>
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
          ListFooterComponent={() => (
            <View style={styles.footer}>
              {hasNextPage ? (
                isFetching || isFetchingNextPage ? (
                  <ActivityIndicator animating />
                ) : (
                  <Button onPress={() => fetchNextPage()}>{`Load more`}</Button>
                )
              ) : null}
            </View>
          )}
          renderItem={({item}) => (
            <View>
              <Card onPress={() => navigation.navigate(polkassemblyDiscussionDetail, {id: item.id})}>
                <Card.Content>
                  <Caption selectable numberOfLines={1}>
                    {item.title}
                  </Caption>
                  {/* <View style={globalStyles.rowAlignCenter}>
                    <Caption>{`By `}</Caption>
                    {item.author?.polkadot_default_address ? (
                      <AddressInlineTeaser address={item.author.polkadot_default_address} />
                    ) : (
                      <Caption>{item.author?.username || ''}</Caption>
                    )}
                  </View> */}
                  <View style={globalStyles.rowAlignCenter}>
                    <Caption>{`${dateUtils.fromNow(item.created_at)} in `}</Caption>
                    <Text>{item.topic.name}</Text>
                  </View>
                  {item.content ? (
                    <View style={globalStyles.justifyCenter}>
                      <Padder scale={0.5} />
                      <Text numberOfLines={1}>{item.content}</Text>
                    </View>
                  ) : null}

                  <Padder scale={0.5} />
                  <View style={globalStyles.rowAlignCenter}>
                    {item.comments_aggregate.aggregate?.count ? (
                      <>
                        <View style={globalStyles.rowAlignCenter}>
                          <Icon name="message-outline" size={15} />
                          <Padder scale={0.3} />
                          <Caption>{item.comments_aggregate.aggregate.count} comments</Caption>
                        </View>
                        <Padder scale={1} />
                      </>
                    ) : null}

                    {item.last_update?.comment_id && item.last_update.last_update ? (
                      <View style={globalStyles.rowAlignCenter}>
                        <Icon name="clock-outline" size={15} />
                        <Padder scale={0.3} />
                        <Caption>commented {dateUtils.fromNow(item.last_update.last_update)}</Caption>
                      </View>
                    ) : null}
                  </View>
                </Card.Content>
              </Card>
            </View>
          )}
          ItemSeparatorComponent={() => <Padder scale={0.5} />}
          keyExtractor={(item) => String(item.id)}
        />
      )}
    </SafeView>
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
