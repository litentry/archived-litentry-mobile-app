import React from 'react';
import {View, FlatList, StyleSheet, Linking} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {LeaseInfo, useParathreads} from 'src/api/hooks/useParaThreads';
import {useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {Text, Divider, ListItem} from '@ui-kitten/components';
import type {ParaId} from '@polkadot/types/interfaces';
import {formatNumber} from '@polkadot/util';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {useParathreadInfo} from 'src/api/hooks/useParathreadInfo';
import Identicon from '@polkadot/reactnative-identicon';
import {Account} from 'layout/Account';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';

type ParathreadData = {
  name?: string;
  homepage?: string;
};

const toParathreadHomepage = (url?: string) => {
  if (url && Linking.canOpenURL(url)) {
    Linking.openURL(url);
  }
};

export function ParathreadsScreen() {
  const {data: leasePeriod} = useParachainsLeasePeriod();
  const {data: parathreads, isLoading} = useParathreads();

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      {leasePeriod ? (
        <FlatList
          style={globalStyles.flex}
          contentContainerStyle={styles.content}
          keyExtractor={(item) => item.id.toString()}
          data={parathreads}
          renderItem={({item}) => <ParathreadItem id={item.id} leases={item.leases} />}
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
  id: ParaId;
  leases: LeaseInfo[];
};

function ParathreadItem({id}: ParathreadItemProps) {
  const {data: parathreadInfo} = useParathreadInfo(id);
  const parathreadData = useParathreadData(id);

  return (
    <ListItem
      onPress={() => toParathreadHomepage(parathreadData.homepage)}
      accessoryLeft={() => (
        <View style={styles.chainImage}>
          {parathreadInfo?.manager && <Identicon value={parathreadInfo.manager.toString()} size={30} />}
        </View>
      )}
      description={() => (
        <>
          {parathreadInfo?.manager && (
            <Account id={parathreadInfo?.manager?.toString()}>
              {(identity) => (
                <Text category="c1" numberOfLines={1} appearance="hint">
                  {identity?.display}
                </Text>
              )}
            </Account>
          )}
        </>
      )}
      title={() => <Text>{parathreadData.name}</Text>}
      accessoryRight={() => <Text>{formatNumber(id)}</Text>}
    />
  );
}

function useParathreadData(id: ParaId) {
  const endpoints = useParaEndpoints(id);
  const parathread: ParathreadData = {};
  if (endpoints != null && endpoints.length > 0) {
    const endpoint = endpoints[endpoints.length - 1];
    parathread.name = endpoint?.text ? String(endpoint.text) : undefined;
    parathread.homepage = endpoint != null && 'homepage' in endpoint ? (endpoint as any).homepage : undefined;
  }
  return parathread;
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
  },
  chainImage: {
    marginRight: standardPadding,
  },
});
