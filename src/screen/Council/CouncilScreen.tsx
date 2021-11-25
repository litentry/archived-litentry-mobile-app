import {useWindowDimensions} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {useAccounts} from 'context/AccountsContext';
import {useApi} from 'context/ChainApiContext';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {SelectAccount} from 'presentational/SelectAccount';
import React, {useEffect, useMemo, useState} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useCouncil} from 'src/api/hooks/useCouncil';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {candidateScreen} from 'src/navigation/routeKeys';
import {Input, Text} from '@ui-kitten/components';
import {List, Button, Divider, Modal, Card} from 'src/packages/base_components';
import globalStyles, {monofontFamily, standardPadding} from 'src/styles';
import {MotionsScreen} from './MotionsScreen';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useModuleElections} from 'src/api/hooks/useModuleElections';
import Badge from 'presentational/Badge';
import {noop} from 'lodash';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useTheme} from 'context/ThemeContext';
import {useCouncilVotesOf} from 'src/api/hooks/useCouncilVotesOf';

const MAX_VOTES = 16;

const Tab = createMaterialTopTabNavigator();

export function CouncilScreen() {
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator initialLayout={{width: layout.width}}>
      <Tab.Screen name="Overview" component={CouncilOverviewScreen} />
      <Tab.Screen name="Motions" component={MotionsScreen} />
    </Tab.Navigator>
  );
}

function CouncilOverviewScreen() {
  const {data: council, isLoading} = useCouncil();
  const {data: summary} = useCouncilSummary();
  const {data: moduleElection} = useModuleElections();

  const [councilVoteVisible, setCouncilVoteVisible] = useState(false);

  const sectionsData = useMemo(
    () => [
      {title: 'Members', data: council ? council.members : []},
      {title: 'Runners Up', data: council ? council.runnersUp : []},
      {
        title: 'Candidates',
        data: council ? council.candidates.map((candidate) => ({accountId: candidate, backing: undefined})) : [],
      },
    ],
    [council],
  );

  const votingCandidates = useMemo(() => {
    if (council != null) {
      return council.members
        .map((member) => member.accountId.toString())
        .concat(council.runnersUp.map((member) => member.accountId.toString()))
        .concat(council.candidates.map((member) => member.toString()));
    }
    return [];
  }, [council]);

  return (
    <SafeView edges={noTopEdges}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <SectionList
          style={globalStyles.flex}
          contentContainerStyle={styles.content}
          sections={sectionsData}
          keyExtractor={(item) => item.accountId.toString()}
          stickySectionHeadersEnabled={false}
          renderItem={({item, section}) => {
            const votes = council?.getVoters(item.accountId.toString())?.length;
            return (
              <Item
                accountId={item.accountId.toString()}
                backing={item.backing}
                votes={votes}
                sectionType={
                  section.title === 'Members' ? 'Member' : section.title === 'Runners Up' ? 'Runner Up' : 'Candidate'
                }
              />
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <List.Item
              style={styles.sectionHeader}
              title={`${title} ${
                title === 'Members'
                  ? summary?.seats
                  : title === 'Runners Up'
                  ? summary?.runnersUp
                  : summary?.candidatesCount
              }`}
              right={() => {
                if (title === 'Members') {
                  return (
                    <Button icon="vote" mode="outlined" onPress={() => setCouncilVoteVisible(true)}>
                      Vote
                    </Button>
                  );
                }
              }}
            />
          )}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={EmptyView}
        />
      )}
      {council && moduleElection?.hasElections ? (
        <CouncilVote
          visible={councilVoteVisible}
          setVisible={(visible) => {
            setCouncilVoteVisible(visible);
          }}
          candidates={votingCandidates}
          module={moduleElection.module}
        />
      ) : null}
    </SafeView>
  );
}

function Item({
  accountId,
  backing,
  votes,
  sectionType,
}: {
  accountId: string;
  backing?: string;
  votes?: number;
  sectionType: string;
}) {
  const {navigate} = useNavigation();
  const {data: identityInfo} = useAccountIdentityInfo(accountId);
  const title = identityInfo && identityInfo.hasIdentity ? identityInfo.display : accountId;

  return (
    <List.Item
      title={title}
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Identicon value={accountId} size={30} />
        </View>
      )}
      right={
        votes
          ? () => (
              <View style={globalStyles.justifyCenter}>
                <Text category="p2">{votes} votes</Text>
              </View>
            )
          : undefined
      }
      description={backing ? `Backing: ${backing?.toString()}` : ''}
      onPress={() => navigate(candidateScreen, {accountId, backing, title: sectionType})}
    />
  );
}

type CouncilVoteProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  candidates: string[];
  module: string | null;
};

function CouncilVote({visible, setVisible, candidates, module}: CouncilVoteProps) {
  const [account, setAccount] = React.useState<string>();
  const [amount, setAmount] = React.useState<string>('');
  const [selectedCandidates, setSelectedCandidates] = React.useState<Array<string>>([]);
  const {data: voterData} = useCouncilVotesOf(account);

  // preselect already voted council members
  useEffect(() => {
    if (voterData != null) {
      setSelectedCandidates(voterData.votes.map((a) => a.toString()).filter((a) => candidates.includes(a)));
    }
  }, [voterData, candidates]);

  const {api} = useApi();
  const startTx = useApiTx();
  const {networkAccounts} = useAccounts();
  const formatBalance = useFormatBalance();

  const onCandidateSelect = (accountId: string, isSelected: boolean) => {
    isSelected
      ? setSelectedCandidates(selectedCandidates.filter((id) => id !== accountId))
      : selectedCandidates.length < MAX_VOTES
      ? setSelectedCandidates([...selectedCandidates, accountId])
      : noop;
  };

  const disabled = !amount || !account || !(selectedCandidates.length > 0);

  const bondValue = useMemo(() => {
    if (api != null) {
      const location = api.consts.elections || api.consts.phragmenElection || api.consts.electionsPhragmen;
      return location?.votingBondBase?.add(location.votingBondFactor.muln(selectedCandidates.length));
    }
  }, [api, selectedCandidates]);

  const reset = () => {
    setAccount(undefined);
    setAmount('');
    setVisible(false);
    setSelectedCandidates([]);
  };

  const onVote = () => {
    if (module && account) {
      startTx({
        address: account,
        txMethod: `${module}.vote`,
        params: [selectedCandidates, amount],
      });
      reset();
    }
  };

  return (
    <Modal visible={visible} onDismiss={reset}>
      <Card style={styles.modalCard}>
        <View style={styles.centerAlign}>
          <Text category="s1">Vote for council</Text>
        </View>
        <Padder scale={1} />

        <Text>Vote with:</Text>
        <Padder scale={0.5} />
        <SelectAccount accounts={networkAccounts} selected={account} onSelect={setAccount} />
        <Padder scale={0.5} />

        <Text>Vote value:</Text>
        <Padder scale={0.5} />
        <Input
          placeholder="Place your Text"
          keyboardType="decimal-pad"
          value={amount}
          onFocus={() => setAmount('')}
          onChangeText={(nextValue) => setAmount(nextValue.replace(/[^(\d+).(\d+)]/g, ''))}
        />

        <Text category="s1">{api ? formatBalance(getBalanceFromString(api, amount)) : ''}</Text>

        <Padder scale={1} />

        <View style={styles.centerAlign}>
          <Text category="c1">Select upto 16 candidates in the preferred order:</Text>
        </View>

        <View style={styles.candidatesContainer}>
          <View style={styles.candidates}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              {candidates.map((candidate) => (
                <MemberItem
                  key={candidate}
                  accountId={candidate}
                  onSelect={onCandidateSelect}
                  isSelected={selectedCandidates.includes(candidate)}
                  order={selectedCandidates.indexOf(candidate) + 1}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.votingBond}>
            <Text category="c1">{`Voting bond`}</Text>
            {bondValue && <Text style={styles.bondValue} category="c2">{`${formatBalance(bondValue)}`}</Text>}
          </View>
        </View>
        <Padder scale={1} />

        <View style={styles.buttons}>
          <Button onPress={reset} mode="outlined" compact>
            Cancel
          </Button>
          <Button mode="contained" disabled={disabled} onPress={onVote}>
            Vote
          </Button>
        </View>
      </Card>
    </Modal>
  );
}

type MemberItemProps = {
  accountId: string;
  onSelect: (accountId: string, isSelected: boolean) => void;
  isSelected: boolean;
  order: number;
};

function MemberItem({accountId, onSelect, isSelected, order}: MemberItemProps) {
  const {colors} = useTheme();
  const {data: identityInfo} = useAccountIdentityInfo(accountId);
  if (identityInfo == null) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => onSelect(accountId, isSelected)}>
      <View
        style={[
          styles.candidateItemContainer,
          {
            backgroundColor: isSelected ? colors.background : 'transparent',
          },
        ]}>
        <View style={styles.candidateIdentity}>
          <Identicon value={accountId} size={20} />
          <Padder scale={0.3} />
          <Text category="c1" style={styles.candidateName} ellipsizeMode="middle" numberOfLines={1}>
            {identityInfo.display}
          </Text>
        </View>
        <View style={styles.badge}>{order > 0 && <Badge color={colors.success} text={String(order)} />}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: standardPadding * 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionHeader: {
    marginTop: standardPadding * 2,
  },
  content: {
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  modalCard: {paddingHorizontal: standardPadding * 2, paddingVertical: standardPadding},
  centerAlign: {alignItems: 'center'},
  candidatesContainer: {flexDirection: 'row', height: 200},
  candidates: {flex: 3, paddingVertical: standardPadding},
  scrollView: {marginRight: standardPadding},
  votingBond: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  bondValue: {fontSize: 10},
  buttons: {flexDirection: 'row', justifyContent: 'space-around', marginBottom: standardPadding},
  voteButton: {width: 100},
  candidateItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
    padding: 2,
    paddingRight: 4,
  },
  candidateIdentity: {flex: 3, flexDirection: 'row', alignItems: 'center'},
  candidateName: {fontFamily: monofontFamily, fontWeight: 'bold', flexShrink: 1},
  badge: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end'},
  fab: {
    position: 'absolute',
    margin: 0,
    right: 24,
    bottom: 32,
  },
});
