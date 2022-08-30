import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Divider, Card, Subheading, Paragraph, Caption, Skeleton, FlatList} from '@ui/library';
import {Identicon} from '@ui/components/Identicon';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {EmptyView} from '@ui/components/EmptyView';
import {useAccount} from 'src/api/hooks/useAccount';
import {useCouncilVotesOf} from 'src/api/hooks/useCouncilVotesOf';
import {accountScreen} from '@ui/navigation/routeKeys';
import {AccountRegistration} from '@ui/components/Account/AccountRegistration';
import LoadingView from '@ui/components/LoadingView';
import type {CouncilMember} from 'src/api/hooks/useCouncil';
import type {Account} from 'src/api/hooks/useAccount';

type ScreenProps = {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Candidate'>;
};

type CandidateInfoProps = {
  candidate: CouncilMember;
  accountInfo?: Account;
  toAccountDetails: (address: string) => void;
};

function CandidateInfo({candidate, accountInfo, toAccountDetails}: CandidateInfoProps) {
  return (
    <View style={styles.standardMargin}>
      <Card>
        <Card.Content>
          <View style={globalStyles.alignCenter}>
            <Identicon value={candidate.account.address} size={30} />
            <Padder scale={0.5} />
            {accountInfo && (
              <AccountTeaser
                account={accountInfo}
                onPress={() => toAccountDetails(accountInfo.address)}
                testID={'accountsDetails'}
              />
            )}
          </View>
          <Padder scale={0.5} />
          <Divider />
          {accountInfo?.registration ? <AccountRegistration registration={accountInfo.registration} /> : null}
          <Divider />
          <Padder scale={1} />
          <View style={globalStyles.alignCenter}>
            <Paragraph>Backing</Paragraph>
            <Paragraph>{candidate.formattedBacking}</Paragraph>
          </View>
        </Card.Content>
      </Card>
      <Padder scale={1} />
      <Subheading style={globalStyles.textCenter}>{`Voters`}</Subheading>
    </View>
  );
}

export function CandidateScreen({route, navigation}: ScreenProps) {
  const {candidate, title} = route.params;
  const {data: accountInfo, loading} = useAccount(candidate.account.address);

  useEffect(() => {
    navigation.setOptions({title});
  }, [navigation, title]);

  const toAccountDetails = (address: string) => {
    navigation.navigate(accountScreen, {address});
  };

  return (
    <SafeView edges={noTopEdges}>
      {loading && !accountInfo ? (
        <LoadingView />
      ) : (
        <FlatList
          ListHeaderComponent={
            <CandidateInfo accountInfo={accountInfo} candidate={candidate} toAccountDetails={toAccountDetails} />
          }
          data={candidate.voters}
          renderItem={({item}) => <Voter address={item} onPress={() => toAccountDetails(item)} />}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={<EmptyView height={200}>{`No voters yet.`}</EmptyView>}
        />
      )}
    </SafeView>
  );
}

type VoterItemProps = {
  address: string;
  onPress?: () => void;
};

function Voter({address, onPress}: VoterItemProps) {
  const {data: councilVote} = useCouncilVotesOf(address);
  const {data: accountInfo} = useAccount(address);

  return (
    <View style={styles.standardMargin}>
      {accountInfo ? (
        <AccountTeaser account={accountInfo} onPress={onPress} identiconSize={30}>
          {councilVote?.formattedStake && <Caption>{`Stake: ${councilVote.formattedStake}`}</Caption>}
        </AccountTeaser>
      ) : (
        <Skeleton width={60} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  standardMargin: {
    marginHorizontal: standardPadding * 2,
  },
});
