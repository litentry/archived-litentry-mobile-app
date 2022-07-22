import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/core';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {CrowdloansStackParamList} from '@ui/navigation/navigation';
import {crowdloanFundDetailScreen} from '@ui/navigation/routeKeys';
import {Button, Card, Subheading, Text, Caption, Title, Modal, useTheme} from '@ui/library';
import globalStyles, {standardPadding} from '@ui/styles';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {ProgressChart} from '@ui/components/ProgressChart';
import BalanceInput from '@ui/components/BalanceInput';
import {Crowdloan, useAllCrowdloans} from 'src/api/hooks/useCrowdloans';
import type {Account} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';
import {BN_ZERO} from '@polkadot/util';
import {formattedStringToBn} from 'src/utils/balance';
import {CrowdloanSummaryTeaser} from '@ui/components/CrowdloanSummaryTeaser';
import {useNetwork} from '@atoms/network';
import {InputLabel} from '@ui/library/InputLabel';
import {useStartTx} from 'context/TxContext';

type ScreenProps = {
  navigation: NavigationProp<CrowdloansStackParamList>;
};

function CrowdloanHeader() {
  return (
    <>
      <Padder />
      <CrowdloanSummaryTeaser />
      <Padder scale={1.5} />
    </>
  );
}

export function CrowdloanScreen({navigation}: ScreenProps) {
  const [openContributeId, setOpenContributeId] = React.useState<string>();
  const {activeCrowdloans, endedCrowdloans, loading} = useAllCrowdloans();
  const ongoingKey = `Ongoing (${activeCrowdloans.length ?? 0})`;
  const completedKey = `Completed (${endedCrowdloans.length ?? 0})`;

  const sectionData = React.useMemo(
    () => [
      {key: ongoingKey, data: activeCrowdloans || []},
      {key: completedKey, data: endedCrowdloans || []},
    ],
    [activeCrowdloans, endedCrowdloans, ongoingKey, completedKey],
  );

  return (
    <SafeView edges={noTopEdges}>
      {loading ? (
        <LoadingView />
      ) : (
        <SectionList
          ListHeaderComponent={CrowdloanHeader}
          contentContainerStyle={styles.listContent}
          style={styles.container}
          sections={sectionData}
          SectionSeparatorComponent={Padder}
          renderSectionHeader={({section}) => <Title>{section.key}</Title>}
          renderItem={({item, section: {key}}) => {
            return (
              <Fund
                item={item}
                active={key === ongoingKey}
                onPressContribute={() => {
                  setOpenContributeId(item.paraId);
                }}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item) => item.paraId}
          stickySectionHeadersEnabled={false}
        />
      )}
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

type FundsProps = {
  item: Crowdloan;
  active: boolean;
  onPressContribute: () => void;
  navigation: NavigationProp<CrowdloansStackParamList>;
};

function Fund({item, active, onPressContribute, navigation}: FundsProps) {
  const {colors} = useTheme();
  const {currentNetwork} = useNetwork();

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
          <ProgressChart percent={Number(item.raisedPercentage)} width={active ? 60 : 80} strokeWidth={8} />
          {active && (
            <Button
              style={styles.button}
              mode="outlined"
              uppercase={false}
              color={isSpecial ? colors.primary : colors.placeholder}
              compact
              onPress={onPressContribute}
              testID="crowdloan-contribute-button">
              + Contribute
            </Button>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: standardPadding,
  },
  listContent: {
    paddingHorizontal: standardPadding * 2,
  },
  shrink: {
    flexShrink: 1,
  },
  fund: {
    marginBottom: standardPadding,
    paddingVertical: standardPadding,
    padding: standardPadding * 2,
  },
  spacer: {
    flex: 1,
    minWidth: standardPadding * 3,
  },
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
  const {startTx} = useStartTx();
  const [account, setAccount] = React.useState<Account>();
  const [amount, setAmount] = React.useState<string>('');
  const {formatBalance, stringToBn} = useFormatBalance();
  const {data: chainInfo} = useChainInfo();

  const reset = () => {
    setAccount(undefined);
    setAmount('');
    setVisible(false);
  };

  const minContribution = chainInfo?.crowdloanMinContribution
    ? formattedStringToBn(chainInfo.crowdloanMinContribution)
    : BN_ZERO;
  const balance = stringToBn(amount) ?? BN_ZERO;
  const disabled =
    !account ||
    !balance ||
    !minContribution ||
    balance.isZero() ||
    balance.lt(minContribution) ||
    balance.gt(formattedStringToBn(account.balance?.free));

  return (
    <Modal visible={visible} onDismiss={reset}>
      <InputLabel label="Contribute with" helperText="This account will contribute to the crowdloan." />
      <Padder scale={0.5} />
      <SelectAccount onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)} />
      <Padder scale={1} />
      <InputLabel label="Amount" helperText="The amount to contribute from this account." />
      <BalanceInput account={account} onChangeBalance={setAmount} />
      <Padder scale={0.2} />
      <InputLabel label="Minimum allowed" />
      <Text>{formatBalance(minContribution)}</Text>

      <Padder scale={2} />
      <View style={contributeBoxStyles.row}>
        <Button mode="outlined" onPress={reset} testID="cancel-button">
          CANCEL
        </Button>
        <Button
          mode="contained"
          disabled={disabled}
          onPress={() => {
            if (account) {
              startTx({
                address: account.address,
                txConfig: {
                  method: 'crowdloan.contribute',
                  params: [parachainId, balance, null],
                },
              });
              reset();
            }
          }}
          testID="contribute-button">
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
