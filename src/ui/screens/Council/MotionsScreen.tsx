import React from 'react';
import {Subheading, Button, useTheme, Modal, List, Headline, FlatList} from '@ui/library';
import {StyleSheet, View, Linking} from 'react-native';
import {EmptyView} from '@ui/components/EmptyView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {CouncilMotion, useCouncilMotions, MotionsQueryResult, MotionProposal} from 'src/api/hooks/useCouncilMotions';
import globalStyles, {standardPadding} from '@ui/styles';
import {NavigationProp} from '@react-navigation/native';
import {motionDetailScreen} from '@ui/navigation/routeKeys';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import LoadingView from '@ui/components/LoadingView';
import {SelectAccount} from '@ui/components/SelectAccount';
import type {Account} from 'src/api/hooks/useAccount';
import {InputLabel} from '@ui/library/InputLabel';
import {useCouncilAccounts} from 'src/hooks/useCouncilAccounts';
import {useNetwork} from '@atoms/network';
import type {SupportedNetworkType} from 'src/atoms/network';
import {Caption, Card, Divider} from 'react-native-paper';
import {ItemRowBlock} from '@ui/components/ItemRowBlock';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {getProposalTitle} from 'src/utils/proposal';
import type {KeyringAccount} from 'polkadot-api';
import {useStartTx} from 'context/TxContext';
import {useTx} from '@polkadotApi/useTx';

type Vote = 'Aye' | 'Nay' | 'Close';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
};

export function MotionsScreen({navigation}: ScreenProps) {
  const {currentNetwork} = useNetwork();
  const {data: motions, loading, refetch: refetchMotions} = useCouncilMotions();
  const {isAnyAccountCouncil, councilAccounts} = useCouncilAccounts();
  const [voteType, setVoteType] = React.useState<Vote>();
  const [selectedMotion, setSelectedMotion] = React.useState<CouncilMotion>();
  const [voteModalVisible, setVoteModalVisible] = React.useState(false);

  const onVote = (vote: Vote, motion: CouncilMotion) => {
    setVoteType(vote);
    setSelectedMotion(motion);
    setVoteModalVisible(true);
  };

  const toMotionDetails = (proposal: MotionProposal) => {
    navigation.navigate(motionDetailScreen, {hash: String(proposal.hash)});
  };

  return (
    <SafeView edges={noTopEdges}>
      {loading && !motions ? (
        <LoadingView />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerStyle}
          data={motions}
          renderItem={({item}) => {
            return (
              <MotionItem
                motion={item}
                isCouncilMember={isAnyAccountCouncil}
                network={currentNetwork.key}
                onPress={toMotionDetails}
                onVote={onVote}
              />
            );
          }}
          ItemSeparatorComponent={Padder}
          keyExtractor={(item) => item.proposal.hash}
          ListEmptyComponent={EmptyView}
          // estimatedItemSize={motions?.length}
        />
      )}
      <VoteModal
        voteType={voteType}
        setVisible={setVoteModalVisible}
        visible={voteModalVisible}
        refetchMotions={refetchMotions}
        motion={selectedMotion}
        councilAccounts={councilAccounts}
      />
    </SafeView>
  );
}

type VoteModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  refetchMotions: () => MotionsQueryResult;
  voteType?: Vote;
  motion?: CouncilMotion;
  councilAccounts?: KeyringAccount[];
};

function VoteModal({visible, setVisible, refetchMotions, voteType, motion, councilAccounts}: VoteModalProps) {
  const {startTx} = useStartTx();
  const {getTxMethodArgsLength} = useTx();
  const heading = voteType === 'Aye' || voteType === 'Nay' ? `Vote ${voteType}` : 'Close';
  const [account, setAccount] = React.useState<Account>();

  const closeModal = () => {
    setVisible(false);
  };

  const reset = () => {
    closeModal();
    setAccount(undefined);
  };

  const motionVote = (vote: boolean) => {
    if (account && motion) {
      closeModal();
      const {proposal} = motion;
      if (proposal.index) {
        startTx({
          address: account.address,
          txConfig: {
            method: 'council.vote',
            params: [proposal.hash, proposal.index, vote],
          },
        })
          .then(() => {
            reset();
            refetchMotions();
          })
          .catch((e) => console.warn(e));
      }
    }
  };

  const closeMotion = async () => {
    if (account && motion) {
      closeModal();
      const {proposal} = motion;
      if (proposal.index) {
        const method = 'council.close';
        const argsLength = await getTxMethodArgsLength(method);
        try {
          await startTx({
            address: account.address,
            txConfig: {
              method,
              params: argsLength === 4 ? [proposal.hash, proposal.index, 0, 0] : [proposal.hash, proposal.index],
            },
          });
          reset();
          refetchMotions();
        } catch (e) {
          console.warn(e);
        }
      }
    }
  };

  const onVote = () => {
    switch (voteType) {
      case 'Aye':
        motionVote(true);
        break;

      case 'Nay':
        motionVote(false);
        break;

      case 'Close':
        closeMotion();
    }
  };

  return (
    <Modal visible={visible} onDismiss={reset}>
      <View style={globalStyles.alignCenter}>
        <Subheading>{`${heading} (Motion ${motion?.proposal.index})`}</Subheading>
      </View>
      <Padder scale={1} />

      <InputLabel label="Select Council account" />
      <SelectAccount
        accounts={councilAccounts}
        onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)}
      />

      <Padder scale={2} />
      <View style={styles.buttons}>
        <Button onPress={reset} mode="outlined" compact>
          Cancel
        </Button>
        <Button mode="contained" disabled={!account} onPress={onVote}>
          Vote
        </Button>
      </View>
    </Modal>
  );
}

type MotionItemProps = {
  motion: CouncilMotion;
  isCouncilMember: boolean;
  onVote: (voteType: Vote, motion: CouncilMotion) => void;
  onPress: (proposal: MotionProposal) => void;
  network: SupportedNetworkType;
};

function MotionItem({motion, isCouncilMember, onVote, onPress, network}: MotionItemProps) {
  const {colors} = useTheme();
  const {votes, proposal} = motion;

  const openInPolkassembly = (councilMotion: CouncilMotion) => () => {
    const url = `https://${network}.polkassembly.io/motion/${councilMotion.proposal.index}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  const ItemRight = React.useCallback(
    () => (
      <View style={globalStyles.rowAlignCenter} testID="motion-container">
        <Subheading>{`Aye ${votes?.ayes?.length}/${votes?.threshold} `}</Subheading>
        <Padder scale={0.5} />
        {(() => {
          if (isCouncilMember) {
            if (motion.votingStatus?.isCloseable) {
              return (
                <Button
                  onPress={() => onVote('Close', motion)}
                  color={colors.error}
                  mode="outlined"
                  compact
                  uppercase={false}>
                  {`Close`}
                </Button>
              );
            } else if (motion.votingStatus?.isVoteable) {
              return (
                <View style={globalStyles.rowAlignCenter}>
                  <Button
                    onPress={() => onVote('Nay', motion)}
                    color={colors.error}
                    mode="outlined"
                    compact
                    uppercase={false}>
                    {`Nay`}
                  </Button>
                  <Padder scale={0.5} />
                  <Button
                    onPress={() => onVote('Aye', motion)}
                    color={colors.success}
                    mode="outlined"
                    compact
                    uppercase={false}>
                    {`Aye`}
                  </Button>
                </View>
              );
            }
          }
        })()}
      </View>
    ),
    [colors, votes, isCouncilMember, motion, onVote],
  );

  const getItemLeft = React.useCallback(() => <Headline>{`#${proposal.index}`}</Headline>, [proposal.index]);

  return (
    <Card onPress={() => onPress(motion.proposal)} style={styles.motionCard}>
      <Card.Content>
        <List.Item
          title={<Caption>{getProposalTitle(motion.proposal)}</Caption>}
          description={<Caption>{motion.votingStatus?.remainingBlocksTime?.slice(0, 2).join(' ')}</Caption>}
          left={getItemLeft}
          right={ItemRight}
        />
        {proposal.proposer ? (
          <ItemRowBlock label="Proposer">
            <AccountTeaser account={proposal.proposer.account} />
          </ItemRowBlock>
        ) : null}
        {proposal.payout ? (
          <ItemRowBlock label="Payout">
            <Caption>{proposal.payout}</Caption>
          </ItemRowBlock>
        ) : null}
        {proposal.beneficiary ? (
          <ItemRowBlock label="Beneficiary">
            <AccountTeaser account={proposal.beneficiary.account} />
          </ItemRowBlock>
        ) : null}
        {proposal.payout ? (
          <ItemRowBlock label="Bond">
            <Caption>{proposal.bond}</Caption>
          </ItemRowBlock>
        ) : null}
      </Card.Content>
      <Padder scale={1} />
      <Divider />
      <View style={styles.polkaLink}>
        <Button
          icon="open-in-new"
          onPress={openInPolkassembly(motion)}
          testID="polkassembly-button">{`Polkassembly`}</Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: standardPadding * 2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  polkaLink: {
    marginVertical: standardPadding,
  },
  motionCard: {
    marginHorizontal: standardPadding,
  },
});
