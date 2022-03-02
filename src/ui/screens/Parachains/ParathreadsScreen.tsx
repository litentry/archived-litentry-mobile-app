import React from 'react';
import {View, FlatList, StyleSheet, Linking} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {LeaseInfo, useParathreads} from 'src/api/hooks/useParaThreads';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {List, Text, Divider} from '@ui/library';
import type {ParaId} from '@polkadot/types/interfaces';
import {formatNumber, bnToBn, BN_ONE} from '@polkadot/util';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {useParathreadInfo} from 'src/api/hooks/useParathreadInfo';
import Identicon from '@polkadot/reactnative-identicon';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import {notEmpty} from 'src/utils';
import {BlockTime} from '@ui/components/BlockTime';
import {getLeasePeriodString} from 'src/api/utils/parachainLeases';
import {useAccount} from 'src/api/hooks/useAccount';
import {Account} from '@ui/components/Account/Account';

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
  const {data: parathreads, isLoading, isIdle} = useParathreads();

  if (isLoading || isIdle) {
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
          renderItem={({item}) => <ParathreadItem id={item.id} leases={item.leases} leasePeriod={leasePeriod} />}
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
  leasePeriod: LeasePeriod;
};

function ParathreadItem({id, leases, leasePeriod}: ParathreadItemProps) {
  const {data: parathreadInfo} = useParathreadInfo(id);
  const parathreadData = useParathreadData(id);
  const {data: manager} = useAccount(parathreadInfo?.manager?.toString());

  const {periodString, blocks} = parseLeases({leasePeriod, leases});

  return (
    <List.Item
      onPress={() => toParathreadHomepage(parathreadData.homepage)}
      left={() => (
        <View style={globalStyles.justifyCenter}>
          {parathreadInfo?.manager && <Identicon value={parathreadInfo.manager.toString()} size={30} />}
        </View>
      )}
      title={() => <View style={styles.manager}>{manager && <Account account={manager} />}</View>}
      description={() => (
        <>
          {parathreadData.name && <Text>{parathreadData.name}</Text>}
          {periodString ? <Text>{periodString}</Text> : null}
          {blocks ? <BlockTime blockNumber={blocks} /> : null}
        </>
      )}
      right={() => (
        <View style={globalStyles.justifyCenter}>
          <Text>{formatNumber(id)}</Text>
        </View>
      )}
    />
  );
}

function parseLeases({leases, leasePeriod}: {leases: LeaseInfo[]; leasePeriod: LeasePeriod}) {
  const leasesPeriods = leases?.map((lease) => lease?.period).filter(notEmpty);
  const periodString = getLeasePeriodString(leasePeriod.currentPeriod, leasesPeriods);

  const periods = leasePeriod?.currentPeriod ? leasesPeriods : undefined;
  const firstPeriod = periods?.[0];

  const blocks =
    leasePeriod && firstPeriod && bnToBn(firstPeriod).sub(BN_ONE).imul(leasePeriod.length).iadd(leasePeriod.remainder);

  return {periodString, blocks};
}

function useParathreadData(id: ParaId) {
  const endpoints = useParaEndpoints(id);
  const parathread: ParathreadData = {};
  if (endpoints != null && endpoints.length > 0) {
    const endpoint = endpoints[endpoints.length - 1];
    parathread.name = endpoint?.text ? String(endpoint.text) : undefined;
    parathread.homepage = endpoint != null && 'homepage' in endpoint ? endpoint.homepage : undefined;
  }
  return parathread;
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
