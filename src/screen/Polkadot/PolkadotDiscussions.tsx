import * as React from 'react';
import SafeView from 'presentational/SafeView';
import {usePolkadotDiscussions} from 'src/api/hooks/usePolkadotDiscussions';
import {Text} from '@ui-kitten/components';
import {FlatList} from 'react-native';

export function PolkadotDiscussions() {
  const {data} = usePolkadotDiscussions();

  return (
    <SafeView>
      <FlatList
        data={data}
        renderItem={({item}) => <Text>{item.title ?? 'unknown title'}</Text>}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeView>
  );
}
