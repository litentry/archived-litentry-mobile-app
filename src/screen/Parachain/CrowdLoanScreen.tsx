import {Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React from 'react';
import {FlatList, SectionList, View} from 'react-native';
import type BN from 'bn.js';
import useFunds, {Campaign} from 'src/api/hooks/useFunds';
import LoadingView from 'presentational/LoadingView';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {formatNumber} from '@polkadot/util';
import type {ParaId} from '@polkadot/types/interfaces';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';

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
      <View>
        <View>
          <Text>funds</Text>
          <Text>{data.funds?.length}</Text>
        </View>
        <View>
          <Text>active raised / cap</Text>
          <Text>{`${formatBalance(data.activeRaised)} / ${formatBalance(data.activeCap)}`}</Text>
        </View>
        <View>
          <Text>total raised / cap</Text>
          <Text>{`${formatBalance(data.totalRaised)} / ${formatBalance(data.totalCap)}`}</Text>
        </View>
        <SectionList
          sections={[
            {key: 'active', data: active},
            {key: 'ended', data: ended},
          ]}
          renderSectionHeader={({section}) => <Text>{section.key}</Text>}
          renderItem={({item}) => <Text>{formatNumber(item.paraId)}</Text>}
          keyExtractor={(item) => item.key}
        />
      </View>
    </SafeView>
  );
}

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
