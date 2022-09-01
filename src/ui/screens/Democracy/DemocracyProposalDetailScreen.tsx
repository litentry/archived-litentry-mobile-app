import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import globalStyles, {standardPadding} from '@ui/styles';
import {useDemocracyProposal} from 'src/api/hooks/useDemocracyProposal';
import LoadingView from '@ui/components/LoadingView';
import {Caption, Button, useTheme, Subheading, Icon, Modal} from '@ui/library';
import {fromNow} from 'src/utils/date';
import HyperLink from 'react-native-hyperlink';
import {truncate} from 'src/utils';
import {Padder} from '@ui/components/Padder';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import type {Account} from 'src/api/hooks/useAccount';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useStartTx} from 'context/TxContext';
import {useTx} from '@polkadotApi/useTx';
import {ProposalTeaserHeader} from './DemocracyScreen';

type ScreenProps = {
  route: RouteProp<DashboardStackParamList, 'Proposal'>;
};

export function DemocracyProposalDetailScreen({route}: ScreenProps) {
  const {startTx} = useStartTx();
  const {getTxMethodArgsLength} = useTx();
  const {colors} = useTheme();
  const {data: proposal, loading, refetch: refetchDemocracyProposal} = useDemocracyProposal(route.params.id);
  const [fullDescription, setFulDescription] = React.useState(false);
  const [showEndorsed, setShowEndorsed] = React.useState(false);
  const [endorseModalOpen, setEndorseModalOpen] = React.useState(false);

  const [voteAccount, setVoteAccount] = React.useState<Account>();

  const toggleDescription = React.useCallback(() => {
    setFulDescription(!fullDescription);
  }, [fullDescription]);

  const toggleEndorseModal = React.useCallback(() => {
    setEndorseModalOpen(!endorseModalOpen);
  }, [endorseModalOpen]);

  const resetEndorseModal = React.useCallback(() => {
    setEndorseModalOpen(false);
    setVoteAccount(undefined);
  }, []);

  const toggleSecondsVisibility = React.useCallback(() => {
    setShowEndorsed(!showEndorsed);
  }, [showEndorsed]);

  const second = React.useCallback(async () => {
    if (voteAccount && proposal) {
      const method = 'democracy.second';
      const proposalIndexAsString = proposal.proposalIndex.toString();
      const argsLength = await getTxMethodArgsLength(method);
      await startTx({
        address: voteAccount.address,
        txConfig: {
          method,
          params: argsLength === 2 ? [proposalIndexAsString, proposal.seconds.length] : [proposalIndexAsString],
        },
      }).then(() => refetchDemocracyProposal({id: route.params.id}));
      resetEndorseModal();
    }
  }, [
    startTx,
    proposal,
    voteAccount,
    getTxMethodArgsLength,
    resetEndorseModal,
    refetchDemocracyProposal,
    route.params.id,
  ]);

  return (
    <SafeView edges={noTopEdges}>
      {loading && !proposal ? (
        <LoadingView />
      ) : proposal ? (
        <ScrollView style={styles.container}>
          <ProposalTeaserHeader
            index={proposal.proposalIndex.toString()}
            title={proposal.title}
            subtitle={`${fromNow(proposal.date)} | ${proposal.status}`}
          />

          {proposal.description ? (
            <>
              <Padder />
              <HyperLink linkStyle={{color: colors.primary}} linkDefault>
                <Caption style={globalStyles.textJustify}>
                  {fullDescription ? proposal.description : truncate(proposal.description, 120)}
                </Caption>
              </HyperLink>
              {proposal.description.length > 120 ? (
                <Button uppercase={false} onPress={toggleDescription}>{`Show ${
                  fullDescription ? `less` : `more`
                }`}</Button>
              ) : null}
            </>
          ) : null}

          <Padder scale={1} />
          <Row label={'Deposit'}>
            <Caption>{proposal.formattedDepositAmount}</Caption>
          </Row>
          <Row label={'Proposer'}>
            <AccountTeaser account={proposal.proposer} />
          </Row>

          {proposal.seconds.length > 0 ? (
            <>
              <Padder />
              <TouchableOpacity onPress={toggleSecondsVisibility} style={globalStyles.rowAlignCenter}>
                <Subheading>{`Endorsed (${proposal.seconds.length})`}</Subheading>
                <Icon name={showEndorsed ? 'chevron-up' : 'chevron-down'} size={25} color="grey" />
              </TouchableOpacity>
              {showEndorsed ? (
                <>
                  <Padder scale={0.5} />
                  <View style={styles.secondItem}>
                    {proposal.seconds.map((_second, index) => (
                      <View key={`${_second.account.address}${index}`}>
                        <AccountTeaser account={_second.account} />
                        <Padder scale={0.5} />
                      </View>
                    ))}
                  </View>
                </>
              ) : null}
            </>
          ) : null}

          <Padder scale={2} />
          <Button mode="contained" onPress={toggleEndorseModal}>
            {`Endorse`}
          </Button>
          <Padder scale={2} />
        </ScrollView>
      ) : null}

      <Modal visible={endorseModalOpen} onDismiss={resetEndorseModal}>
        <Caption>{`Endorse with account`}</Caption>
        <SelectAccount
          onSelect={(account) => {
            setVoteAccount(account.accountInfo);
          }}
        />

        <Padder />
        <Caption>{`Deposit required: ${proposal?.formattedDepositAmount}`}</Caption>

        <Padder scale={2} />
        <View style={globalStyles.spaceAroundRowContainer}>
          <Button onPress={resetEndorseModal} mode="outlined">
            {`Cancel`}
          </Button>
          <Padder scale={1} />
          <Button mode="outlined" disabled={!voteAccount} onPress={second} testID="endorse-button">
            {`Endorse`}
          </Button>
        </View>
      </Modal>
    </SafeView>
  );
}

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Caption style={styles.rowLabel}>{label}:</Caption>
      <View style={globalStyles.flex}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: standardPadding * 2,
  },
  padding0: {
    padding: 0,
  },
  secondItem: {
    paddingLeft: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: standardPadding,
  },
  rowLabel: {
    width: '25%',
  },
});
