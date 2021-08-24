import * as React from 'react';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {usePolkadotDiscussions} from 'src/api/hooks/usePolkadotDiscussions';
import {Text, Card} from '@ui-kitten/components';
import {FlatList, StyleSheet, View} from 'react-native';
import {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import moment from 'moment';

export function PolkadotDiscussions() {
  const {data} = usePolkadotDiscussions();

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={data}
        renderItem={({item}) => (
          <Card disabled>
            <Text category="s2">{item.title ?? 'unknown title'}</Text>
            <Padder scale={0.4} />
            <View style={styles.ownerRow}>
              <Text>by</Text>
              <Padder scale={0.2} />
              <View style={styles.owner}>
                {item.author?.polkadot_default_address ? (
                  <AddressInlineTeaser address={item.author.polkadot_default_address} />
                ) : (
                  <Text>{item.author?.username || ''}</Text>
                )}
              </View>
              <Text category="c1">{formatDate(item.created_at)}</Text>
              <Text category="c1">{item.topic.name}</Text>
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
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: standardPadding * 2,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  owner: {
    flex: 1,
    marginRight: standardPadding * 2,
    overflow: 'hidden',
  },
});

// format date to days ago
export function formatDate(date: string) {
  const now = moment();
  const then = moment(date);
  const diff = now.diff(then, 'days');
  if (diff === 0) {
    return 'today';
  }
  if (diff === 1) {
    return 'yesterday';
  }
  return `${diff} days ago`;
}
