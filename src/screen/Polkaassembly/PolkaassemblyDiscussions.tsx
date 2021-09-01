import {NavigationProp} from '@react-navigation/native';
import {Button, Card, Divider, Icon, MenuItem, OverflowMenu, Text, useTheme} from '@ui-kitten/components';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import {flatten} from 'lodash';
import moment from 'moment';
import {Label} from 'presentational/Label';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import * as React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {OrderByType, topicIdMap, usePolkaassemblyDiscussions} from 'src/api/hooks/usePolkaassemblyDiscussions';
import {PolkaassemblyDiscussionStackParamList} from 'src/navigation/navigation';
import globalStyles, {standardPadding} from 'src/styles';

export function PolkaassemblyDiscussions({
  navigation,
}: {
  navigation: NavigationProp<PolkaassemblyDiscussionStackParamList>;
}) {
  const [orderBy, setOrderBy] = React.useState<OrderByType>('lastCommented');
  const [topicId, setTopicId] = React.useState<number>();
  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = React.useState(false);
  const {data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage} = usePolkaassemblyDiscussions({
    orderBy,
    topicId,
  });

  const theme = useTheme();

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={flatten(data?.pages)}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View style={[styles.header, {backgroundColor: theme['background-basic-color-1']}]}>
            <View style={globalStyles.rowAlignCenter}>
              <View style={globalStyles.rowAlignCenter}>
                <Padder scale={0.5} />
                <Text category="c1">Sort by</Text>
                <OverflowMenu
                  anchor={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setSortMenuVisible(true);
                      }}>
                      <Icon
                        name="arrow-ios-downward-outline"
                        style={globalStyles.icon}
                        fill={globalStyles.iconColor.color}
                      />
                    </TouchableOpacity>
                  )}
                  placement="bottom end"
                  style={styles.overflowMenu}
                  visible={sortMenuVisible}
                  onSelect={({row}: {row: number}) => {
                    setSortMenuVisible(false);
                    switch (row) {
                      case 0:
                        setOrderBy('lastCommented');
                        break;
                      case 1:
                        setOrderBy('dateAddedNewest');
                        break;
                      case 2:
                        setOrderBy('dateAddedOldest');
                        break;
                    }
                  }}
                  onBackdropPress={() => setSortMenuVisible(false)}>
                  <MenuItem title="Last Commented" style={orderBy === 'lastCommented' && styles.selectedItem} />
                  <MenuItem title="Date Added (newest)" style={orderBy === 'dateAddedNewest' && styles.selectedItem} />
                  <MenuItem title="Date Added (oldest)" style={orderBy === 'dateAddedOldest' && styles.selectedItem} />
                </OverflowMenu>
              </View>
              <Padder scale={1} />
              <View style={globalStyles.rowAlignCenter}>
                <Padder scale={0.5} />
                <Text category="c1">Filter</Text>
                <OverflowMenu
                  anchor={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setFilterMenuVisible(true);
                      }}>
                      <Icon
                        name="arrow-ios-downward-outline"
                        style={globalStyles.icon}
                        fill={globalStyles.iconColor.color}
                      />
                    </TouchableOpacity>
                  )}
                  placement="bottom end"
                  style={styles.overflowMenu}
                  visible={filterMenuVisible}
                  onSelect={({row}: {row: number}) => {
                    setFilterMenuVisible(false);
                    if (topicId && row === topicId - 1) {
                      setTopicId(undefined);
                    } else {
                      setTopicId(row + 1);
                    }
                  }}
                  onBackdropPress={() => setFilterMenuVisible(false)}>
                  {Object.entries(topicIdMap).map(([name, id]) => (
                    <MenuItem key={name} title={name} style={topicId === id && styles.selectedItem} />
                  ))}
                </OverflowMenu>
              </View>
            </View>
            <Padder scale={0.6} />
            <Divider />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {hasNextPage ? (
              isFetching || isFetchingNextPage ? (
                <ActivityIndicator />
              ) : (
                <Button onPress={() => fetchNextPage()}>Load more ...</Button>
              )
            ) : null}
          </View>
        )}
        renderItem={({item}) => (
          <Card onPress={() => navigation.navigate('PolkaassemblyDiscussionDetail', {id: item.id})}>
            <Text category="s2" numberOfLines={1}>
              {item.title ?? 'unknown title'}
            </Text>
            <Padder scale={0.4} />
            <View style={styles.ownerRow}>
              <Text category="c1">by</Text>
              <Padder scale={0.2} />
              <View style={styles.owner}>
                {item.author?.polkadot_default_address ? (
                  <AddressInlineTeaser address={item.author.polkadot_default_address} />
                ) : (
                  <Text category="c2">{item.author?.username || ''}</Text>
                )}
              </View>
              <Text category="label" appearance="hint">
                {moment(item.created_at).fromNow()}
              </Text>
              <Padder scale={0.2} />
              <Label text={item.topic.name} />
            </View>
            <Padder scale={0.4} />
            {item.content ? (
              <Text numberOfLines={1} category="c1">
                {item.content}
              </Text>
            ) : null}
            <Padder scale={0.4} />
            <View style={globalStyles.rowAlignCenter}>
              {item.comments_aggregate.aggregate?.count ? (
                <>
                  <View style={globalStyles.rowAlignCenter}>
                    <Icon name="message-circle-outline" style={globalStyles.icon15} fill="#ccc" animation="pulse" />
                    <Padder scale={0.3} />
                    <Text category="label" appearance="hint">
                      {item.comments_aggregate.aggregate.count} comments
                    </Text>
                  </View>
                  <Padder scale={1} />
                </>
              ) : null}

              {item.last_update?.comment_id && item.last_update.last_update ? (
                <View style={globalStyles.rowAlignCenter}>
                  <Icon name="undo-outline" style={globalStyles.icon15} fill="#ccc" animation="pulse" />
                  <Padder scale={0.3} />
                  <Text category="label" appearance="hint">
                    commented {moment(item.last_update.last_update).fromNow()}
                  </Text>
                </View>
              ) : null}
            </View>
          </Card>
        )}
        ItemSeparatorComponent={() => <Padder scale={0.5} />}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: standardPadding * 2,
    marginBottom: standardPadding * 2,
  },
  container: {flex: 1},
  content: {paddingHorizontal: standardPadding * 2},
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  owner: {
    flex: 1,
    marginRight: standardPadding * 2,
    overflow: 'hidden',
  },
  overflowMenu: {
    minWidth: 200,
  },
  selectedItem: {
    backgroundColor: '#dde',
  },
  footer: {
    paddingTop: standardPadding * 2,
    marginBottom: standardPadding * 2,
  },
});
