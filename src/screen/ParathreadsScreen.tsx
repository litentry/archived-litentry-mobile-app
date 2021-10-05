import React from 'react';
import {View, FlatList, StyleSheet, Linking} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {LeaseInfo, useParathreads} from 'src/api/hooks/useParaThreads';
import {useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {Card, Text, Divider} from '@ui-kitten/components';
import type {ParaId} from '@polkadot/types/interfaces';
import {formatNumber} from '@polkadot/util';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {useParathreadInfo} from 'src/api/hooks/useParathreadInfo';
import Identicon from '@polkadot/reactnative-identicon';
import Padder from 'presentational/Padder';
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
    <Card style={styles.card} onPress={() => toParathreadHomepage(parathreadData.homepage)}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <View style={styles.row}>
          {parathreadInfo?.manager && (
            <View style={styles.chainImage}>
              <Identicon value={parathreadInfo.manager} size={30} />
            </View>
          )}
          {parathreadData.name && (
            <Text category="s1" numberOfLines={1} status="info">
              {parathreadData.name}
            </Text>
          )}
        </View>
        <Text category={'c1'} numberOfLines={1} ellipsizeMode="middle" appearance="hint">
          {formatNumber(id)}
        </Text>
      </View>

      {parathreadInfo?.manager && (
        <View style={[styles.row, styles.marginTop]}>
          <Text category="c1" appearance="hint">
            manager:{' '}
          </Text>
          <Account id={parathreadInfo.manager.toString()}>
            {(identity) => (
              <View style={styles.accountsRow}>
                {identity?.accountId && <Identicon value={identity.accountId} size={20} />}
                <Padder scale={0.3} />
                {identity?.display && (
                  <View style={styles.row}>
                    <Text numberOfLines={1} category={'c1'}>
                      {identity.display}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </Account>
        </View>
      )}
      {/* @TODO: Add leases information */}
    </Card>
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
  card: {
    marginBottom: standardPadding,
  },
  marginTop: {
    marginTop: standardPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chainImage: {
    marginRight: 5,
  },
  accountsRow: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
  },
});
