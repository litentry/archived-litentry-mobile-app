import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import {Divider, List, Card, Subheading, Paragraph} from '@ui/library';
import IdentityIcon from '@polkadot/reactnative-identicon';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';
import globalStyles from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {EmptyView} from '@ui/components/EmptyView';
import {useAccount} from 'src/api/hooks/useAccount';
import {Account} from '@ui/components/Account/Account';
import {useCouncilVotesOf} from 'src/api/hooks/useCouncilVotesOf';
import {accountScreen} from '@ui/navigation/routeKeys';
import {AccountRegistration} from '@ui/components/Account/AccountRegistration';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Candidate'>;
};

export function CandidateScreen({route, navigation}: ScreenProps) {
  const member = route.params.candidate;
  const screenTitle = route.params.title;
  const navigationList = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    if (screenTitle) {
      navigation.setOptions({title: screenTitle});
    }
  }, [navigation, screenTitle]);

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        contentContainerStyle={globalStyles.paddedContainer}
        ListHeaderComponent={() => (
          <>
            <Card>
              <Card.Content>
                <View style={globalStyles.alignCenter}>
                  <IdentityIcon value={member.account.address} size={30} />
                  <Padder scale={0.5} />
                  <AccountTeaser account={member.account} />
                </View>
                <Padder scale={0.5} />
                <Divider />
                {member.account.registration ? (
                  <AccountRegistration registration={member.account.registration} />
                ) : null}
                {'formattedBacking' in member ? (
                  <>
                    <Divider />
                    <Padder scale={1} />
                    <View style={globalStyles.alignCenter}>
                      <Paragraph>Backing</Paragraph>
                      <Paragraph>{member.formattedBacking}</Paragraph>
                    </View>
                  </>
                ) : null}
              </Card.Content>
            </Card>
            <Padder scale={1} />
            <Subheading style={globalStyles.textCenter}>{`Voters`}</Subheading>
          </>
        )}
        data={'voters' in member ? member.voters : []}
        renderItem={({item}) => (
          <Voter account={item} onPress={() => navigationList.navigate(accountScreen, {address: item})} />
        )}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyView height={200}>{`No voters yet.`}</EmptyView>}
      />
    </SafeView>
  );
}

function Voter({account, onPress}: {account: string; onPress?: () => void}) {
  const {data: accountInfo} = useAccount(account);
  const {data: councilVote} = useCouncilVotesOf(account);

  return (
    <List.Item
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <IdentityIcon value={account} size={35} />
        </View>
      )}
      title={accountInfo && <Account account={accountInfo} />}
      description={councilVote?.formattedStake || ''}
      onPress={onPress}
    />
  );
}
