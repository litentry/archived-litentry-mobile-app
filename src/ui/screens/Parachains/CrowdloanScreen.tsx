import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {useApi} from 'context/ChainApiContext';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {Crowdloan, useActiveCrowdloans, useEndedCrowdloans, useFunds} from 'src/api/hooks/useFunds';
import {getBalanceFromString} from 'src/api/utils/balance';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import {crowdloanFundDetailScreen} from '@ui/navigation/routeKeys';
import {Button, Card, Subheading, Text, Caption, Title, Modal, TextInput, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import {decimalKeypad, notEmpty} from 'src/utils';
import type {BalanceOf} from '@polkadot/types/interfaces';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {Chart} from '@ui/components/Chart';
import MaxBalance from '@ui/components/MaxBalance';

export function CrowdloanScreen() {
  const {data, error} = useFunds();
  const {data: activeCrowdLoans, error: activeCrowdLoansError} = useActiveCrowdloans();
  const {data: endedCrowdLoans, error: endedCrowdLoansError} = useEndedCrowdloans();
  const [openContributeId, setOpenContributeId] = React.useState<string>();

  if (error) {
    return <Text>Something bad happened!</Text>;
  }

  if (!data) {
    return <LoadingView />;
  }

  if (data.totalFunds === 0) {
    return <EmptyView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <SectionList
        ListHeaderComponent={() => {
          return (
            <View>
              <View style={styles.headerContainer}>
                <View>
                  <View style={styles.headerTileContainer}>
                    <Chart percent={data.activeProgress} />
                    <Padder scale={1} />
                    <View>
                      <Subheading>Active Raised / Cap</Subheading>
                      <Caption
                        numberOfLines={1}
                        adjustsFontSizeToFit>{`${data.formattedActiveRaised} / ${data.formattedActiveCap}`}</Caption>
                    </View>
                  </View>
                  <Padder scale={1} />
                  <View style={styles.headerTileContainer}>
                    <Chart percent={data.totalProgress} />
                    <Padder scale={1} />
                    <View>
                      <Subheading>Total Raised / Cap</Subheading>
                      <Caption
                        numberOfLines={1}
                        adjustsFontSizeToFit>{`${data.formattedTotalRaised} / ${data.formattedTotalCap}`}</Caption>
                    </View>
                  </View>
                </View>
                <View style={styles.fundsContainer}>
                  <Subheading>Funds</Subheading>
                  <Caption>{data.totalFunds}</Caption>
                </View>
              </View>
              <Padder scale={1} />
            </View>
          );
        }}
        style={styles.container}
        contentContainerStyle={styles.listContent}
        sections={[
          activeCrowdLoans?.length ? {key: 'Ongoing', data: activeCrowdLoans} : null,
          endedCrowdLoans?.length ? {key: 'Completed', data: endedCrowdLoans} : null,
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

  return (
    <Card
      // mode={item.status ? 'elevated' : 'outlined'} // TODO: do we need is Special in crowdloan
      style={styles.fund}
      onPress={() => {
        navigation.navigate(crowdloanFundDetailScreen, {crowdloan: item});
      }}>
      <View style={[globalStyles.rowAlignCenter]}>
        <View style={styles.shrink}>
          <Subheading numberOfLines={1} adjustsFontSizeToFit>
            {String(item.name)}
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
              color={item.status ? colors.primary : colors.placeholder}
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
  const [account, setAccount] = React.useState<string>();
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
      <SelectAccount onSelect={(selectedAccount) => setAccount(selectedAccount.address)} />
      <Padder scale={1} />
      <Text>Amount:</Text>
      <TextInput
        style={contributeBoxStyles.textInput}
        mode="outlined"
        autoComplete="off"
        placeholder="Enter amount"
        keyboardType="decimal-pad"
        value={amount}
        onFocus={() => setAmount('')}
        onChangeText={(nextValue) => setAmount(decimalKeypad(nextValue))}
        contextMenuHidden={true}
        right={<TextInput.Affix text={(api && formatBalance(getBalanceFromString(api, amount))) ?? ''} />}
      />
      <MaxBalance address={account} />
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
    </Modal>
  );
}

const contributeBoxStyles = StyleSheet.create({
  modalCard: {width: 300},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  textInput: {height: 36},
});
