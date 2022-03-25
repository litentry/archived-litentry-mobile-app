import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, List, Subheading, Button, Headline, useTheme, Modal} from '@ui/library';
import {useApi} from 'context/ChainApiContext';
import {EmptyView} from '@ui/components/EmptyView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {CouncilMotion, useCouncilMotions, MotionsQueryResult} from 'src/api/hooks/useCouncilMotions';
import globalStyles, {standardPadding} from '@ui/styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {motionDetailScreen} from '@ui/navigation/routeKeys';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import LoadingView from '@ui/components/LoadingView';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {ProposalCall} from '@ui/components/ProposalCall';
import {SelectCouncilAccount} from '@ui/components/SelectCouncilAccount';
import type {Account} from 'src/api/hooks/useAccount';
import {InputLabel} from '@ui/library/InputLabel';
import {useCouncilAccounts} from 'src/hooks/useCouncilAccounts';

type Vote = 'Aye' | 'Nay' | 'Close';

export function MotionsScreen() {
  const {data: motions, loading, refetch: refetchMotions} = useCouncilMotions();
  const {isAnyAccountCouncil} = useCouncilAccounts();
  const [voteType, setVoteType] = React.useState<Vote>();
  const [selectedMotion, setSelectedMotion] = React.useState<CouncilMotion>();
  const [voteModalVisible, setVoteModalVisible] = React.useState(false);

  const onVote = (vote: Vote, motion: CouncilMotion) => {
    setVoteType(vote);
    setSelectedMotion(motion);
    setVoteModalVisible(true);
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
            return <MotionItem motion={item} isCouncilMember={isAnyAccountCouncil} onVote={onVote} />;
          }}
          ItemSeparatorComponent={() => <Padder scale={1} />}
          keyExtractor={(item) => item.proposal.hash}
          ListEmptyComponent={EmptyView}
        />
      )}
      <VoteModal
        voteType={voteType}
        setVisible={setVoteModalVisible}
        visible={voteModalVisible}
        refetchMotions={refetchMotions}
        motion={selectedMotion}
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
};

function VoteModal({visible, setVisible, refetchMotions, voteType, motion}: VoteModalProps) {
  const {api} = useApi();
  const startTx = useApiTx();
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
    if (account && api && motion) {
      closeModal();
      const {proposal} = motion;
      startTx({
        address: account.address,
        params: [proposal.hash, proposal.index, vote],
        txMethod: 'council.vote',
      })
        .then(() => {
          reset();
          refetchMotions();
        })
        .catch((e) => console.warn(e));
    }
  };

  const closeMotion = () => {
    if (account && api && motion) {
      closeModal();
      const {proposal} = motion;
      startTx({
        address: account.address,
        params:
          api?.tx.council.close?.meta.args.length === 4
            ? [proposal.hash, proposal.index, 0, 0]
            : [proposal.hash, proposal.index],
        txMethod: 'council.close',
      })
        .then(() => {
          reset();
          refetchMotions();
        })
        .catch((e) => console.warn(e));
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
      <SelectCouncilAccount onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)} />

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
};

function MotionItem({motion, isCouncilMember, onVote}: MotionItemProps) {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<DashboardStackParamList>>();
  const {votes, proposal} = motion;

  return (
    <Card
      onPress={() => {
        navigation.navigate(motionDetailScreen, {hash: String(proposal.hash)});
      }}>
      <Card.Content>
        <List.Item
          title={<Headline>{motion.proposal.index}</Headline>}
          right={() => (
            <View style={globalStyles.rowAlignCenter}>
              <Subheading>{`Aye ${votes?.ayes.length}/${votes?.threshold} `}</Subheading>
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
                        Close
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
                          Nay
                        </Button>
                        <Padder scale={0.5} />
                        <Button
                          onPress={() => onVote('Aye', motion)}
                          color={colors.success}
                          mode="outlined"
                          compact
                          uppercase={false}>
                          Aye
                        </Button>
                      </View>
                    );
                  }
                }
              })()}
            </View>
          )}
        />
        <ProposalCall proposal={proposal} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: standardPadding * 2,
    padding: standardPadding,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
