import * as React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {OrderByType, usePolkadotDiscussions} from 'src/api/hooks/usePolkadotDiscussions';
import {Text, Card, Icon, Divider, OverflowMenu, MenuItem} from '@ui-kitten/components';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import moment from 'moment';
import {Label} from 'presentational/Label';

export function PolkadotDiscussions() {
  const [orderBy, setOrderBy] = React.useState<OrderByType>('lastCommented');
  const [topicId, setTopicId] = React.useState<number>();
  const {data} = usePolkadotDiscussions({orderBy, topicId});
  const [sortVisible, setSortVisible] = React.useState(false);
  const [filterVisible, setFilterVisible] = React.useState(false);

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={data}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={globalStyles.rowAlignCenter}>
              <View style={globalStyles.rowAlignCenter}>
                <Padder scale={0.5} />
                <Text category="c1">Sort by</Text>
                <OverflowMenu
                  anchor={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setSortVisible(true);
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
                  visible={sortVisible}
                  onSelect={({row}: {row: number}) => {
                    setSortVisible(false);
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
                  onBackdropPress={() => setSortVisible(false)}>
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
                        setFilterVisible(true);
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
                  visible={filterVisible}
                  onSelect={({row}: {row: number}) => {
                    setFilterVisible(false);
                    if (topicId && row === topicId - 1) {
                      setTopicId(undefined);
                    } else {
                      setTopicId(row + 1);
                    }
                  }}
                  onBackdropPress={() => setFilterVisible(false)}>
                  <MenuItem title="Democracy" style={topicId === 1 && styles.selectedItem} />
                  <MenuItem title="Council" style={topicId === 2 && styles.selectedItem} />
                  <MenuItem title="Tech Committee" style={topicId === 3 && styles.selectedItem} />
                  <MenuItem title="Treasury" style={topicId === 4 && styles.selectedItem} />
                  <MenuItem title="General" style={topicId === 5 && styles.selectedItem} />
                </OverflowMenu>
              </View>
            </View>
            <Padder scale={0.6} />
            <Divider />
          </View>
        )}
        renderItem={({item}) => (
          <Card disabled>
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
                {formatDate(item.created_at)}
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
                    <Text category="c1" appearance="hint">
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
                  <Text category="c1" appearance="hint">
                    {formatDate(item.last_update.last_update)}
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
  header: {paddingVertical: standardPadding * 2},
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
});

// format date to days ago
export function formatDate(date: string) {
  const now = moment();
  const then = moment(date);
  const diff = now.diff(then, 'days');

  if (diff === 0) {
    const hoursDiff = now.diff(then, 'hours');
    if (hoursDiff === 0) {
      return now.diff(then, 'minutes') + ' minutes ago';
    }
    return `${hoursDiff} hours ago`;
  }
  if (diff === 1) {
    return 'yesterday';
  }
  return `${diff} days ago`;
}
