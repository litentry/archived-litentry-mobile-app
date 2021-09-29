import {Card, Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React, {useMemo} from 'react';
import {FlatList, SectionList, StyleSheet, View} from 'react-native';
import type BN from 'bn.js';
import useFunds, {Campaign} from 'src/api/hooks/useFunds';
import LoadingView from 'presentational/LoadingView';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {formatNumber} from '@polkadot/util';
import type {ParaId} from '@polkadot/types/interfaces';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import globalStyles, {standardPadding} from 'src/styles';
import Padder from 'presentational/Padder';
import {useBestNumber} from 'src/api/hooks/useBestNumber';

interface Props {
  activeCap: BN;
  activeRaised: BN;
  className?: string;
  fundCount: number;
  totalCap: BN;
  totalRaised: BN;
}

export function CrowdLoanScreen() {
  const formatBalance = useFormatBalance();
  const {data, isError} = useFunds();
  const {data: leasePeriod} = useParachainsLeasePeriod();

  if (isError) {
    return <Text>Something bad happend!</Text>;
  }

  if (!data) {
    return <LoadingView />;
  }

  const [active, ended, allIds] = extractLists(data.funds, leasePeriod);

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={styles.headerRow}>
                <View style={styles.headerTileContainer}>
                  <Text category="h6" appearance="hint">
                    funds
                  </Text>
                  <Text category="h5">{data.funds?.length}</Text>
                </View>
              </View>
              <View style={styles.headerRow}>
                <View style={styles.headerTileContainer}>
                  <Text category="h6" appearance="hint">
                    active raised / cap
                  </Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(data.activeRaised)} / ${formatBalance(
                    data.activeCap,
                  )}`}</Text>
                </View>
                <View style={styles.headerTileContainer}>
                  <Text category="h6" appearance="hint">
                    total raised / cap
                  </Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(data.totalRaised)} / ${formatBalance(
                    data.totalCap,
                  )}`}</Text>
                </View>
              </View>
            </View>
          );
        }}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        sections={[
          {key: 'ongoing', data: active},
          {key: 'completed', data: ended},
        ]}
        SectionSeparatorComponent={() => <Padder scale={1} />}
        renderSectionHeader={({section}) => <Text category="h4">{section.key}</Text>}
        renderItem={({item}) => {
          return <Fund item={item} isOngoing={active.includes(item)} />;
        }}
        keyExtractor={(item) => item.key}
        stickySectionHeadersEnabled={false}
      />
    </SafeView>
  );
}

function Fund({item, isOngoing}: {item: Campaign; isOngoing: boolean}) {
  const bestNumber = useBestNumber();
  const end = item.info.end;
  const blocksLeft = useMemo(() => (bestNumber && end.gt(bestNumber) ? end.sub(bestNumber) : null), [bestNumber, end]);

  return (
    <Card style={styles.fund}>
      <Text>{formatNumber(item.paraId)}</Text>
      <Text>
        {item.isWinner ? 'Winner' : blocksLeft ? (item.isCapped ? 'Capped' : isOngoing ? 'Active' : 'Past') : 'Ended'}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  headerRow: {
    flexDirection: 'row',
  },
  headerTileContainer: {
    padding: standardPadding * 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: standardPadding,
  },
  sectionHeader: {
    padding: standardPadding * 2,
  },
  fund: {marginBottom: standardPadding},
});

function extractLists(value: Campaign[] | null, leasePeriod?: LeasePeriod): [Campaign[], Campaign[], ParaId[] | null] {
  const currentPeriod = leasePeriod?.currentPeriod;
  let active: Campaign[] = [];
  let ended: Campaign[] = [];
  let allIds: ParaId[] | null = null;

  if (value && currentPeriod) {
    active = value.filter(
      ({firstSlot, isCapped, isEnded, isWinner}) => !(isCapped || isEnded || isWinner) && currentPeriod.lte(firstSlot),
    );
    ended = value.filter(
      ({firstSlot, isCapped, isEnded, isWinner}) => isCapped || isEnded || isWinner || currentPeriod.gt(firstSlot),
    );
    allIds = value.map(({paraId}) => paraId);
  }

  return [active, ended, allIds];
}
