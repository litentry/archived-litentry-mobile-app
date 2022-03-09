import React from 'react';
import {View, FlatList, StyleSheet, Linking} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useParathreads} from 'src/api/hooks/useParaThreads';
import {List, Text, Divider} from '@ui/library';
import Identicon from '@polkadot/reactnative-identicon';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import type {Parathread} from 'src/api/hooks/useParaThreads';
import {Account} from '@ui/components/Account/Account';

const toParathreadHomepage = (url?: string) => {
  if (url && Linking.canOpenURL(url)) {
    Linking.openURL(url);
  }
};

export function ParathreadsScreen() {
  const {data: parathreads, loading} = useParathreads();

  if (loading && !parathreads) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      {parathreads ? (
        <FlatList
          style={globalStyles.flex}
          contentContainerStyle={styles.content}
          keyExtractor={(item) => item.id.toString()}
          data={parathreads}
          renderItem={({item}) => <ParathreadItem parathreadInfo={item} />}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={EmptyView}
        />
      ) : (
        <EmptyView />
      )}
    </SafeView>
  );
}

type ParathreadItemProps = {
  parathreadInfo: Parathread;
};

function ParathreadItem({parathreadInfo}: ParathreadItemProps) {
  const [days, hours] = parathreadInfo.lease?.blockTime || [];

  return (
    <List.Item
      onPress={() => toParathreadHomepage(parathreadInfo.homepage?.toString())}
      left={() => (
        <View style={globalStyles.justifyCenter}>
          {parathreadInfo?.manager && <Identicon value={parathreadInfo.manager.address.toString()} size={30} />}
        </View>
      )}
      title={() => (
        <View style={styles.manager}>
          {parathreadInfo.manager && <Account account={parathreadInfo.manager.account} />}
        </View>
      )}
      description={() => (
        <>
          {parathreadInfo.name && <Text>{parathreadInfo.name}</Text>}
          {parathreadInfo.lease ? <Text>{parathreadInfo.lease.period}</Text> : null}
          {days ? <Text>{days || hours ? `${days || ''} ${hours || ''}` : null}</Text> : null}
        </>
      )}
      right={() => (
        <View style={globalStyles.justifyCenter}>
          <Text>{parathreadInfo.id}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
  },
  manager: {
    marginRight: 20,
  },
});
