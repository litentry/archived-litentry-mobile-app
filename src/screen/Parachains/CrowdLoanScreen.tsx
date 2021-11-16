import {LinkOption} from '@polkadot/apps-config/endpoints/types';
import type {ParaId} from '@polkadot/types/interfaces';
import {BN, BN_ZERO} from '@polkadot/util';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {Button, Card, Input, Text, Modal} from '@ui-kitten/components';
import {useAccounts} from 'context/AccountsContext';
import {useApi} from 'context/ChainApiContext';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {SelectAccount} from 'presentational/SelectAccount';
import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {Campaign, useFunds} from 'src/api/hooks/useFunds';
import {LeasePeriod, useParachainsLeasePeriod} from 'src/api/hooks/useParachainsLeasePeriod';
import {useParaEndpoints} from 'src/api/hooks/useParaEndpoints';
import {getBalanceFromString} from 'src/api/utils/balance';
import {ParachainsStackParamList} from 'src/navigation/navigation';
import {crowdloanFundDetailScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';
import {notEmpty} from 'src/utils';
import type {BalanceOf} from '@polkadot/types/interfaces';

export function CrowdLoanScreen() {
  const formatBalance = useFormatBalance();
  const {data, isError} = useFunds();
  const {data: leasePeriod} = useParachainsLeasePeriod();

  const [openContributeId, setOpenContributeId] = React.useState<ParaId>();

  if (isError) {
    return <Text>Something bad happend!</Text>;
  }

  if (!data) {
    return <LoadingView />;
  }

  if (!data.funds?.length) {
    return <EmptyView />;
  }

  const [active, ended] = extractLists(data.funds, leasePeriod);

  const [activeRaised, activeCap] = active.reduce(
    ([par, pac], current) => {
      return [
        par.iadd(current.info.raised.gte(BN_ZERO) ? current.info.raised : BN_ZERO),
        pac.iadd(current.info.cap.gte(BN_ZERO) ? current.info.cap : BN_ZERO),
      ];
    },
    [new BN(0), new BN(0)],
  );

  let activeProgress = 0,
    totalProgress = 0;

  try {
    activeProgress = activeCap.isZero() ? 0 : activeRaised.muln(10000).div(activeCap).toNumber() / 10000;
    totalProgress = data.totalCap.isZero() ? 0 : data.totalRaised.muln(10000).div(data.totalCap).toNumber() / 10000;
  } catch (e) {
    console.error('Error calculating progress');
  }

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={styles.headerRow}>
                <View style={globalStyles.flex}>
                  <View style={styles.headerTileContainer}>
                    <Chart percent={activeProgress} />
                    <Padder scale={0.5} />
                    <View style={globalStyles.alignCenter}>
                      <Text category="c2" appearance="hint">
                        Active Raised / Cap
                      </Text>
                      <Padder scale={0.1} />
                      <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(activeRaised, {
                        isShort: true,
                      })} / ${formatBalance(activeCap)}`}</Text>
                    </View>
                  </View>
                  <View style={styles.headerTileContainer}>
                    <Chart percent={totalProgress} />
                    <Padder scale={0.5} />
                    <View style={globalStyles.alignCenter}>
                      <Text category="c2" appearance="hint">
                        Total Raised / Cap
                      </Text>
                      <Padder scale={0.1} />
                      <Text numberOfLines={1} adjustsFontSizeToFit>{`${formatBalance(
                        data.totalRaised,
                      )} / ${formatBalance(data.totalCap)}`}</Text>
                    </View>
                  </View>
                </View>
                <View style={globalStyles.centeredContainer}>
                  <Text category="h6" appearance="hint">
                    Funds
                  </Text>
                  <Text category="h5">{data.funds?.length}</Text>
                </View>
              </View>
            </View>
          );
        }}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        sections={[
          active.length ? {key: 'Ongoing', data: active} : null,
          ended.length ? {key: 'Completed', data: ended} : null,
        ].filter(notEmpty)}
        SectionSeparatorComponent={() => <Padder scale={1} />}
        renderSectionHeader={({section}) => <Text category="h5">{section.key}</Text>}
        renderItem={({item, section: {key}}) => {
          return (
            <Fund
              item={item}
              active={key === 'Ongoing'}
              onPressContribute={() => {
                setOpenContributeId(item.paraId);
              }}
            />
          );
        }}
        keyExtractor={(item) => item.key}
        stickySectionHeadersEnabled={false}
      />
      {openContributeId !== undefined ? (
        <ContributeBox
          visible={true}
          setVisible={(visible) => {
            if (!visible) {
              setOpenContributeId(undefined);
            }
          }}
          parachainId={openContributeId}
        />
      ) : null}
    </SafeView>
  );
}

function Chart({percent}: {percent: number}) {
  return (
    <View>
      <ProgressChart
        data={[percent]}
        width={50}
        height={50}
        strokeWidth={5}
        radius={21}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(0, 197, 117, ${opacity})`,
        }}
        hideLegend
      />
      <View style={styles.chartOverlay}>
        <Text category="label" adjustsFontSizeToFit numberOfLines={1}>
          {(percent * 100).toFixed(2)}%
        </Text>
      </View>
    </View>
  );
}

function Fund({item, active, onPressContribute}: {item: Campaign; active: boolean; onPressContribute: () => void}) {
  const formatBalance = useFormatBalance();
  const {cap, raised} = item.info;
  const endpoints = useParaEndpoints(item.paraId);
  const navigation = useNavigation<NavigationProp<ParachainsStackParamList>>();

  const lastEndpoint = endpoints?.[endpoints.length - 1] as LinkOption;
  const text = lastEndpoint?.text ?? `#${item.paraId.toString()}`;

  const percentage = cap.isZero() ? 100 : raised.muln(10000).div(cap).toNumber() / 10000;

  return (
    <Card
      status={item.isSpecial ? 'success' : 'control'}
      style={styles.fund}
      onPress={() => {
        navigation.navigate(crowdloanFundDetailScreen, {title: String(text), paraId: item.paraId});
      }}>
      <View style={[globalStyles.rowAlignCenter]}>
        <View style={styles.shrink}>
          <Text
            category="h6"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.shrink}
            status={item.isSpecial ? 'success' : 'basic'}>
            {String(text)}
          </Text>
          <Padder scale={0.5} />
          <Text numberOfLines={1} adjustsFontSizeToFit category="c1">{`${formatBalance(raised, {
            isShort: true,
          })} / ${formatBalance(cap, {isShort: true})}`}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.listItemRightSide}>
          <Chart percent={percentage} />
          {active && (
            <Button
              style={styles.button}
              appearance="filled"
              status={item.isSpecial ? 'success' : 'basic'}
              size="tiny"
              onPress={onPressContribute}>
              + Contribute
            </Button>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: standardPadding * 3,
  },
  headerTileContainer: {
    padding: standardPadding * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: standardPadding * 2,
  },
  sectionHeader: {
    padding: standardPadding * 2,
  },
  shrink: {flexShrink: 1},
  fund: {marginBottom: standardPadding},
  spacer: {flex: 1, minWidth: standardPadding * 3},
  alignEnd: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  chartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: standardPadding,
    width: 100,
  },
  listItemRightSide: {
    alignItems: 'center',
  },
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

function ContributeBox({
  visible,
  setVisible,
  parachainId,
}: {
  visible: boolean;
  setVisible: (_visible: boolean) => void;
  parachainId: ParaId;
}) {
  const startTx = useApiTx();
  const {api} = useApi();
  const [account, setAccount] = React.useState<string>();
  const [amount, setAmount] = React.useState<string>('');
  const formatBalance = useFormatBalance();
  const {networkAccounts} = useAccounts();

  const reset = () => {
    setAccount(undefined);
    setAmount('');
    setVisible(false);
  };

  const minContribution = api?.consts.crowdloan?.minContribution as BalanceOf | undefined;
  const minBalance = minContribution ? formatBalance(minContribution) : '';

  const balance = api && getBalanceFromString(api, amount);
  const disabled = !account || !balance || !minContribution || balance.isZero() || balance.lt(minContribution);

  return (
    <Modal visible={visible} backdropStyle={globalStyles.backdrop} onBackdropPress={reset}>
      <Card disabled={true} style={contributeBoxStyles.modalCard}>
        <Text>Contribute with:</Text>
        <Padder scale={0.5} />
        <SelectAccount accounts={networkAccounts} selected={account} onSelect={setAccount} />
        <Padder scale={1.5} />

        <Text>Amount:</Text>
        <Padder scale={0.5} />
        <Input
          placeholder="Place your Text"
          keyboardType="decimal-pad"
          value={amount}
          onFocus={() => setAmount('')}
          onChangeText={(nextValue) => setAmount(nextValue.replace(/[^(\d+).(\d+)]/g, ''))}
        />
        <Text>{api ? formatBalance(getBalanceFromString(api, amount)) : ''}</Text>
        <Padder scale={1.5} />
        <Text>minimum allowed: </Text>
        <Text>{minBalance}</Text>

        <View style={contributeBoxStyles.row}>
          <Button onPress={reset} appearance="ghost" status="basic">
            CANCEL
          </Button>
          <Button
            disabled={disabled}
            onPress={() => {
              if (account) {
                startTx({
                  address: account,
                  txMethod: 'crowdloan.contribute',
                  params: [parachainId, balance, null],
                });
                reset();
              }
            }}>
            Contribute
          </Button>
        </View>
      </Card>
    </Modal>
  );
}

const contributeBoxStyles = StyleSheet.create({
  modalCard: {width: 300},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
});
