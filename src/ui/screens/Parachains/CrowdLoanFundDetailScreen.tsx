import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {Text, Button} from '@ui-kitten/components';
import {BlockTime} from '@ui/components/BlockTime';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useContributions} from 'src/api/hooks/useContributions';
import {useCrowdloanFundByParaId} from 'src/api/hooks/useFunds';
import {useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import {formatNumber} from '@polkadot/util';
import AddressInlineTeaser from '@ui/components/AddressInlineTeaser';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {standardPadding} from '@ui/styles';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import Icon from '@ui/components/Icon';

type ScreenProps = {
  route: RouteProp<ParachainsStackParamList, 'CrowdLoanDetailScreen'>;
};

export function CrowdLoanFundDetailScreen({route}: ScreenProps) {
  const {paraId, title} = route.params;
  // const paraIdWithType = paraId as unknown as ParaId;
  const bestNumber = useBestNumber();
  const formatBalance = useFormatBalance();
  const {data: fund, isError, isLoading} = useCrowdloanFundByParaId(paraId);
  const {data: contributions} = useContributions(paraId);
  const {data: leasePeriod} = useParachainsLeasePeriod();
  const endpoints = useParaEndpoints(paraId);

  if (isError) {
    return <Text>Something bad happened!</Text>;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  if (!fund) {
    return <EmptyView />;
  }

  const {info, isCapped, isEnded, isWinner, firstSlot} = fund;
  const {end, firstPeriod, lastPeriod, cap, raised, depositor} = info;
  const blocksLeft = bestNumber && end.gt(bestNumber) ? end.sub(bestNumber) : null;
  const isOngoing = !(isCapped || isEnded || isWinner) && leasePeriod?.currentPeriod.lte(firstSlot);

  const status = (
    <Text>
      {fund.isWinner ? 'Winner' : blocksLeft ? (fund.isCapped ? 'Capped' : isOngoing ? 'Active' : 'Past') : 'Ended'}
    </Text>
  );
  const timeLeft = blocksLeft ? <BlockTime blockNumber={blocksLeft} /> : null;
  const leases = (
    <Text>
      {firstPeriod.eq(lastPeriod)
        ? formatNumber(firstPeriod)
        : `${formatNumber(firstPeriod)} - ${formatNumber(lastPeriod)}`}
    </Text>
  );
  const count = <Text>{formatNumber(contributions?.contributorsHex.length)}</Text>;
  const homepage = endpoints?.length ? endpoints[0]?.homepage : undefined;

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        <Text category="h5" style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          {title}
        </Text>
        <Row label={'Index'}>
          <Text>{formatNumber(paraId)}</Text>
        </Row>
        <Row label={'Depositor'}>
          <AddressInlineTeaser address={String(depositor)} />
        </Row>
        <Row label={'Ending'}>{timeLeft}</Row>
        <Row label={'Status'}>{status}</Row>
        <Row label={'Leases'}>{leases}</Row>
        <Row label={'Raised'}>
          <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(raised, {
            isShort: true,
          })} / ${formatBalance(cap, {isShort: true})}`}</Text>
        </Row>
        <Row label={'Contributors'}>{count}</Row>
        {homepage ? (
          <Button
            style={styles.button}
            accessoryLeft={(p) => <Icon {...p} name="home-outline" />}
            onPress={() => {
              Linking.canOpenURL(homepage).then((supported) => {
                if (supported) {
                  Linking.openURL(homepage);
                }
              });
            }}
            appearance="ghost">
            Homepage
          </Button>
        ) : null}
      </View>
    </SafeView>
  );
}

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Text category="h6" appearance="hint" style={styles.rowLabel}>
        {label}:
      </Text>
      <View style={styles.value}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {textAlign: 'center', padding: standardPadding * 4},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: standardPadding * 2,
    paddingHorizontal: standardPadding * 2,
  },
  rowLabel: {width: '35%'},
  value: {
    flex: 1,
  },
  button: {
    marginTop: standardPadding * 2,
    marginHorizontal: 100,
  },
});
