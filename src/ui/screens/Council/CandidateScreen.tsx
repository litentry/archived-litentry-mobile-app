import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Divider, Card, Subheading, Paragraph, Caption} from '@ui/library';
import Identicon from '@polkadot/reactnative-identicon';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';
import globalStyles from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {EmptyView} from '@ui/components/EmptyView';
import {Account as AccountType, useAccount} from 'src/api/hooks/useAccount';
import {useCouncilVotesOf} from 'src/api/hooks/useCouncilVotesOf';
import {accountScreen} from '@ui/navigation/routeKeys';
import {AccountRegistration} from '@ui/components/Account/AccountRegistration';
import LoadingView from '@ui/components/LoadingView';

type ScreenProps = {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Candidate'>;
};

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
          contentContainerStyle={globalStyles.paddedContainer}
          ListHeaderComponent={() => (
            <>
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
                        name={accountInfo.display}
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
            </>
          )}
          data={candidate.voters}
          renderItem={({item}) => <Voter account={item} onPress={() => toAccountDetails(item.address)} />}
          keyExtractor={(item) => item.address}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={<EmptyView height={200}>{`No voters yet.`}</EmptyView>}
        />
      )}
    </SafeView>
  );
}

type VoterItemProps = {
  account: AccountType;
  onPress?: () => void;
};

function Voter({account, onPress}: VoterItemProps) {
  const {data: councilVote} = useCouncilVotesOf(account.address);

  return (
    <View style={globalStyles.marginVertical}>
      <AccountTeaser account={account} onPress={onPress} identiconSize={30}>
        {councilVote?.formattedStake && <Caption>{`Stake: ${councilVote.formattedStake}`}</Caption>}
      </AccountTeaser>
    </View>
  );
}
