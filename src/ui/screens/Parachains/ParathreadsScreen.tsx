import React from 'react';
import {View, FlatList, StyleSheet, Linking} from 'react-native';
import globalStyles, {standardPadding} from '@ui/styles';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {LeaseInfo, useParathreads} from 'src/api/hooks/useParaThreads';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {Text, Divider, ListItem} from '@ui-kitten/components';
import type {ParaId} from '@polkadot/types/interfaces';
import {formatNumber, bnToBn, BN_ONE} from '@polkadot/util';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {useParathreadInfo} from 'src/api/hooks/useParathreadInfo';
import Identicon from '@polkadot/reactnative-identicon';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {notEmpty} from 'src/utils';
import {BlockTime} from 'layout/BlockTime';
import {getLeasePeriodString} from 'src/api/utils/parachainLeases';

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
  const {data: manager} = useAccountIdentityInfo(parathreadInfo?.manager?.toString());

  const {periodString, blocks} = parseLeases({leasePeriod, leases});

  return (
    <ListItem
      onPress={() => toParathreadHomepage(parathreadData.homepage)}
      accessoryLeft={() => (
        <View style={styles.chainImage}>
          {parathreadInfo?.manager && <Identicon value={parathreadInfo.manager.toString()} size={30} />}
        </View>
      )}
      title={() => <View style={styles.manager}>{manager && <AccountInfoInlineTeaser identity={manager} />}</View>}
      description={() => (
        <>
          {parathreadData.name && (
            <Text category="c1" appearance="hint">
              {parathreadData.name}
            </Text>
          )}
          {periodString ? (
            <Text category="c1" appearance="hint">
              {periodString}
            </Text>
          ) : null}
          {blocks ? <BlockTime blockNumber={blocks} /> : null}
        </>
      )}
      accessoryRight={() => <Text>{formatNumber(id)}</Text>}
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
  chainImage: {
    marginRight: standardPadding,
  },
  manager: {
    marginRight: 20,
  },
});
