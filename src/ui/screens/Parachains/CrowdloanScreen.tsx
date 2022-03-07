import React, {useContext} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {useApi} from 'context/ChainApiContext';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import {crowdloanFundDetailScreen} from '@ui/navigation/routeKeys';
import {Button, Card, Subheading, Text, Caption, Title, Modal, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Chart} from '@ui/components/Chart';
import BalanceInput from '@ui/components/BalanceInput';
import {Crowdloan, useCrowdloans} from 'src/api/hooks/useCrowdloans';
import {NetworkContext} from 'context/NetworkContext';
import type {BalanceOf} from '@polkadot/types/interfaces';
import {notEmpty} from 'src/utils';
import type {Account} from 'src/api/hooks/useAccount';

export function CrowdloanScreen() {
  const {data, loading} = useCrowdloans();
  const [openContributeId, setOpenContributeId] = React.useState<string>();

  if (loading && !data) {
    return <LoadingView />;
  }

  if (!data.summary?.totalFunds) {
    return <EmptyView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={() => {
          if (!data.summary) {
            return null;
          }
          return (
            <View>
              <View style={styles.headerContainer}>
                <View>
                  <View style={styles.headerTileContainer}>
                    <Chart percent={data.summary.activeProgress} />
                    <Padder scale={1} />
                    <View>
                      <Subheading>Active Raised / Cap</Subheading>
                      <Caption numberOfLines={1} adjustsFontSizeToFit>
                        {`${data.summary.formattedActiveRaised} / ${data.summary.formattedActiveCap}`}
                      </Caption>
                    </View>
                  </View>
                  <Padder scale={1} />
                  <View style={styles.headerTileContainer}>
                    <Chart percent={data.summary.totalProgress} />
                    <Padder scale={1} />
                    <View>
                      <Subheading>Total Raised / Cap</Subheading>
                      <Caption
                        numberOfLines={1}
                        adjustsFontSizeToFit>{`${data.summary.formattedTotalRaised} / ${data.summary.formattedTotalCap}`}</Caption>
                    </View>
                  </View>
                </View>
                <View style={styles.fundsContainer}>
                  <Subheading>Funds</Subheading>
                  <Caption>{data.summary.totalFunds}</Caption>
                </View>
              </View>
              <Padder scale={1} />
            </View>
          );
        }}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        sections={[
          data.active?.length ? {key: 'Ongoing', data: data.active} : null,
          data.ended?.length ? {key: 'Completed', data: data.ended} : null,
        ].filter(notEmpty)}
        SectionSeparatorComponent={() => <Padder scale={1} />}
        renderSectionHeader={({section}) => <Title>{section.key}</Title>}
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
        keyExtractor={(item) => item.paraId}
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

function Fund({item, active, onPressContribute}: {item: Crowdloan; active: boolean; onPressContribute: () => void}) {
  const navigation = useNavigation<NavigationProp<CrowdloansStackParamList>>();
  const {colors} = useTheme();
  const {currentNetwork} = useContext(NetworkContext);

  const isLitentryParachain = currentNetwork.key === 'polkadot' && item.paraId === '2013';
  const isLitmusParachain = currentNetwork.key === 'kusama' && item.paraId === '2106';
  const isSpecial = isLitentryParachain || isLitmusParachain;

  return (
    <Card
      mode={isSpecial ? 'elevated' : 'outlined'}
      style={styles.fund}
      onPress={() => {
        navigation.navigate(crowdloanFundDetailScreen, {title: item.name ?? `# ${item.paraId}`, paraId: item.paraId});
      }}>
      <View style={[globalStyles.rowAlignCenter]}>
        <View style={styles.shrink}>
          <Subheading numberOfLines={1} adjustsFontSizeToFit style={{color: isSpecial ? colors.primary : colors.text}}>
            {item.name}
          </Subheading>
          <Padder scale={0.5} />
          <Caption numberOfLines={1} adjustsFontSizeToFit>{`${item.formattedRaised} / ${item.formattedCap}`}</Caption>
        </View>
        <View style={styles.spacer} />
        <View style={styles.listItemRightSide}>
          <Chart percent={Number(item.raisedPercentage)} />
          {active && (
            <Button
              style={styles.button}
              mode="outlined"
              uppercase={false}
              color={isSpecial ? colors.primary : colors.placeholder}
              compact
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: standardPadding,
  },
  headerTileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    padding: standardPadding * 2,
  },
  sectionHeader: {
    padding: standardPadding * 2,
  },
  shrink: {flexShrink: 1},
  fund: {marginBottom: standardPadding, paddingVertical: standardPadding, padding: standardPadding * 2},
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
  },
  listItemRightSide: {
    alignItems: 'center',
  },
  fundsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

function ContributeBox({
  visible,
  setVisible,
  parachainId,
}: {
  visible: boolean;
  setVisible: (_visible: boolean) => void;
  parachainId: string;
}) {
  const startTx = useApiTx();
  const {api} = useApi();
  const [account, setAccount] = React.useState<Account>();
  const [amount, setAmount] = React.useState<string>('');
  const formatBalance = useFormatBalance();

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
    <Modal visible={visible} onDismiss={reset}>
      <Text>Contribute with:</Text>
      <Padder scale={0.5} />
      <SelectAccount onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)} />
      <Padder scale={1} />
      <Text>Amount:</Text>
      {api && account && <BalanceInput api={api} account={account} onChangeBalance={setAmount} />}
      <Padder scale={0.2} />
      <Text>minimum allowed: </Text>
      <Text>{minBalance}</Text>

      <Padder scale={2} />
      <View style={contributeBoxStyles.row}>
        <Button mode="outlined" onPress={reset}>
          CANCEL
        </Button>
        <Button
          mode="contained"
          disabled={disabled}
          onPress={() => {
            if (account) {
              startTx({
                address: account.address,
                txMethod: 'crowdloan.contribute',
                params: [parachainId, balance, null],
              });
              reset();
            }
          }}>
          Contribute
        </Button>
      </View>
    </Modal>
  );
}

const contributeBoxStyles = StyleSheet.create({
  modalCard: {width: 300},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  textInput: {height: 36},
});
