import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, TouchableOpacity, SectionList, StyleSheet, View, useWindowDimensions} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationProp} from '@react-navigation/native';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useCouncil, CouncilMember, Council} from 'src/api/hooks/useCouncil';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {candidateScreen} from '@ui/navigation/routeKeys';
import {Button, Divider, Modal, useTheme, Caption, Subheading, Text, TextInput} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {MotionsScreen} from './MotionsScreen';
import {useModuleElection, ModuleElection} from 'src/api/hooks/useModuleElection';
import Badge from '@ui/components/Badge';
import {noop} from 'lodash';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useCouncilVotesOf} from 'src/api/hooks/useCouncilVotesOf';
import BalanceInput from '@ui/components/BalanceInput';
import type {Account} from 'src/api/hooks/useAccount';
import {formattedStringToBn} from 'src/api/utils/balance';
import MaxBalance from '@ui/components/MaxBalance';
import {useApi} from 'context/ChainApiContext';
import {useSnackbar} from 'context/SnackbarContext';
import {InputLabel} from '@ui/library/InputLabel';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';

const MAX_VOTES = 16;

const Tab = createMaterialTopTabNavigator();

export function CouncilScreen() {
  const layout = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialLayout={{width: layout.width}}
      screenOptions={{
        tabBarLabelStyle: {color: colors.text},
        tabBarItemStyle: {width: 200},
        tabBarStyle: {backgroundColor: colors.background},
      }}>
      <Tab.Screen name="Overview" component={CouncilOverviewScreen} />
      <Tab.Screen name="Motions" component={MotionsScreen} />
    </Tab.Navigator>
  );
}

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
};

function CouncilOverviewScreen({navigation}: ScreenProps) {
  const {data: council, loading} = useCouncil();
  const {data: moduleElection} = useModuleElection();
  const [councilVoteVisible, setCouncilVoteVisible] = useState(false);
  const [submitCandidacyVisible, setSubmitCandidacyVisible] = useState(false);

  const {sectionData, votingCandidates} = useMemo(() => {
    return {
      sectionData: [
        {title: 'Member', data: council?.members ? council.members : []},
        {title: 'Runners Up', data: council?.runnersUp ? council.runnersUp : []},
        {title: 'Candidate', data: council?.candidates ? council.candidates : []},
      ],
      votingCandidates: council ? council.members.concat(council.runnersUp).concat(council.candidates) : [],
    };
  }, [council]);

  const toMemberScreen = (member: CouncilMember, title: string) => {
    navigation.navigate(candidateScreen, {candidate: member, title});
  };

  return (
    <SafeView edges={noTopEdges}>
      {loading && !council ? (
        <LoadingView />
      ) : (
        <SectionList
          style={globalStyles.flex}
          contentContainerStyle={styles.content}
          sections={sectionData}
          keyExtractor={(item) => item.account.address}
          stickySectionHeadersEnabled={false}
          renderItem={({item, section}) => {
            return (
              <View style={globalStyles.marginVertical}>
                <AccountTeaser
                  identiconSize={25}
                  account={item.account}
                  onPress={() => toMemberScreen(item, section.title)}>
                  <View style={globalStyles.rowAlignCenter}>
                    <Caption>{`Backing: ${item.formattedBacking}`}</Caption>
                    <Padder />
                    <Caption>{`votes: ${item.voters.length}`}</Caption>
                  </View>
                </AccountTeaser>
              </View>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <>
              <Padder />
              <Subheading>{buildSectionHeaderTitle(title, council)}</Subheading>
              {title === 'Member' ? (
                <View style={styles.voteActions}>
                  <Button icon="vote" mode="outlined" onPress={() => setCouncilVoteVisible(true)}>
                    Vote
                  </Button>
                  <Padder scale={1} />
                  <Button icon="vote" mode="outlined" onPress={() => setSubmitCandidacyVisible(true)}>
                    Candidacy
                  </Button>
                </View>
              ) : null}
            </>
          )}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={EmptyView}
        />
      )}
      {council && moduleElection?.module ? (
        <CouncilVoteModal
          visible={councilVoteVisible}
          setVisible={(visible) => {
            setCouncilVoteVisible(visible);
          }}
          candidates={votingCandidates}
          moduleElection={moduleElection}
        />
      ) : null}
      {council && moduleElection?.module ? (
        <SubmitCandidacyModel
          visible={submitCandidacyVisible}
          setVisible={(visible) => {
            setSubmitCandidacyVisible(visible);
          }}
          moduleElection={moduleElection}
        />
      ) : null}
    </SafeView>
  );
}

function buildSectionHeaderTitle(sectionTitle: string, council?: Council) {
  if (!council) {
    return sectionTitle;
  }

  let title: string;

  if (sectionTitle === 'Member') {
    title = `${council.totalMembers}/${council.desiredSeats}`;
  } else if (sectionTitle === 'Runners Up') {
    title = `${council.totalRunnersUp}/${council.desiredRunnersUp}`;
  } else {
    title = String(council.totalCandidates);
  }
  return `${sectionTitle} ${title}`;
}

type CouncilVoteProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  candidates: CouncilMember[];
  moduleElection: ModuleElection;
};

type SubmitCandidacyProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  moduleElection: ModuleElection;
};

function CouncilVoteModal({visible, setVisible, candidates, moduleElection}: CouncilVoteProps) {
  const [account, setAccount] = React.useState<Account>();
  const [amount, setAmount] = React.useState<string>('');
  const [selectedCandidates, setSelectedCandidates] = React.useState<Array<string>>([]);
  const {data: councilVote} = useCouncilVotesOf(account?.address);
  const {dark: isDarkTheme} = useTheme();

  // preselect already voted council members
  useEffect(() => {
    if (councilVote?.votes != null) {
      setSelectedCandidates(
        councilVote.votes.map((acc) => acc.address).filter((acc) => candidates.some((c) => c.account.address === acc)),
      );
    }
  }, [councilVote, candidates]);

  const startTx = useApiTx();
  const {formatBalance} = useFormatBalance();

  const onCandidateSelect = (accountId: string, isSelected: boolean) => {
    isSelected
      ? setSelectedCandidates(selectedCandidates.filter((id) => id !== accountId))
      : selectedCandidates.length < MAX_VOTES
      ? setSelectedCandidates([...selectedCandidates, accountId])
      : noop;
  };

  const disabled = !amount || !account || selectedCandidates.length === 0;

  const bondValue = useMemo(() => {
    const votingBondBase = formattedStringToBn(moduleElection.votingBondBase);
    if (selectedCandidates.length === 0) {
      return votingBondBase;
    }

    const votingBondFactor = formattedStringToBn(moduleElection.votingBondFactor);
    return votingBondBase.add(votingBondFactor.muln(selectedCandidates.length));
  }, [selectedCandidates, moduleElection]);

  const reset = () => {
    setAccount(undefined);
    setAmount('');
    setVisible(false);
    setSelectedCandidates([]);
  };

  const onVote = () => {
    if (account) {
      startTx({
        address: account.address,
        txMethod: `${moduleElection.module}.vote`,
        params: [selectedCandidates, amount],
      });
      reset();
    }
  };

  return (
    <Modal visible={visible} onDismiss={reset}>
      <View style={globalStyles.alignCenter}>
        <Subheading>{`Vote for council`}</Subheading>
      </View>
      <Padder scale={1} />

      <SelectAccount onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)} />
      <Padder scale={1} />
      <BalanceInput account={account} onChangeBalance={setAmount} />
      <Padder scale={1} />
      <Caption>{`Select up to ${MAX_VOTES} candidates in the preferred order:`}</Caption>

      <View style={styles.candidatesContainer}>
        <View style={styles.candidates}>
          <ScrollView indicatorStyle={isDarkTheme ? 'white' : 'black'}>
            {candidates.map((candidate) => (
              <MemberItem
                key={candidate.account.address}
                candidate={candidate}
                onSelect={onCandidateSelect}
                isSelected={selectedCandidates.includes(candidate.account.address)}
                order={selectedCandidates.indexOf(candidate.account.address) + 1}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.votingBond}>
          <Caption style={globalStyles.textCenter}>{`Bond`}</Caption>
          {bondValue && <Text style={styles.bondValue}>{`${formatBalance(bondValue)}`}</Text>}
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
    </Modal>
  );
}

function SubmitCandidacyModel({visible, setVisible, moduleElection}: SubmitCandidacyProps) {
  const [account, setAccount] = React.useState<Account>();
  const startTx = useApiTx();
  const {api} = useApi();
  const balance = useFormatBalance();
  const formattedBalance = balance.formatBalance(moduleElection.candidacyBond);
  const {data: council} = useCouncil();

  const snackbar = useSnackbar();
  const onSubmitCandidacy = () => {
    if (account && api && moduleElection.module) {
      startTx({
        address: account.address,
        txMethod: `${moduleElection.module}.submitCandidacy`,
        params: [
          api.tx[moduleElection.module]?.submitCandidacy?.meta.args.length === 1 ? [council?.candidates.length] : [],
        ],
      })
        .then(() => {
          snackbar('Candidacy submitted successfully');
        })
        .catch(() => {
          snackbar('Error while submitting candidacy');
        });
      reset();
    }
  };

  const reset = () => {
    setAccount(undefined);
    setVisible(false);
  };

  return (
    <Modal visible={visible} onDismiss={reset}>
      <View style={globalStyles.alignCenter}>
        <Subheading>{`Submit Council Candidacy`}</Subheading>
      </View>
      <Padder scale={1} />
      <InputLabel label={'Candidate account:'} helperText={'Select the account you wish to submit for candidacy.'} />
      <SelectAccount onSelect={(selectedAccount) => setAccount(selectedAccount.accountInfo)} />
      <Padder scale={1} />
      <InputLabel label={'Candidacy bond:'} helperText={'The bond that is reserved.'} />
      <TextInput mode="outlined" disabled value={formattedBalance} />
      <MaxBalance address={account} />
      <Padder scale={1} />
      <View style={styles.buttons}>
        <Button onPress={reset} mode="outlined" compact>
          Cancel
        </Button>
        <Button mode="contained" disabled={!account} onPress={onSubmitCandidacy}>
          Submit
        </Button>
      </View>
    </Modal>
  );
}

type MemberItemProps = {
  candidate: CouncilMember;
  onSelect: (accountId: string, isSelected: boolean) => void;
  isSelected: boolean;
  order: number;
};

function MemberItem({candidate, onSelect, isSelected, order}: MemberItemProps) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => onSelect(candidate.account.address, isSelected)}>
      <View
        style={[
          styles.candidateItemContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: isSelected ? colors.accent : 'transparent',
          },
        ]}>
        <View style={styles.candidateIdentity}>
          <Identicon value={candidate.account.address} size={20} />
          <Padder scale={0.3} />
          <Caption style={styles.candidateName} ellipsizeMode="middle" numberOfLines={1}>
            {candidate.account.display}
          </Caption>
        </View>
        <View style={styles.badge}>{order > 0 && <Badge color={colors.onSurface} text={String(order)} />}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  candidatesContainer: {
    flexDirection: 'row',
    height: 250,
  },
  candidates: {
    flex: 3,
    paddingVertical: standardPadding,
  },
  votingBond: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bondValue: {
    fontSize: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  candidateItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
    padding: 2,
    paddingHorizontal: 4,
  },
  candidateIdentity: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  candidateName: {
    fontWeight: 'bold',
    flexShrink: 1,
  },
  badge: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  voteActions: {
    flexDirection: 'row',
    marginVertical: standardPadding,
  },
});
