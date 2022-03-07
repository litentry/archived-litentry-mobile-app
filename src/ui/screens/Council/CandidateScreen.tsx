import React, {useEffect} from 'react';
import {View, FlatList, Linking, StyleSheet} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Divider, List, Card, Icon, Caption, Subheading, Paragraph} from '@ui/library';
import IdentityIcon from '@polkadot/reactnative-identicon';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';
import globalStyles from '@ui/styles';
import {useTheme} from '@ui/library';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {EmptyView} from '@ui/components/EmptyView';
import {useAccount} from 'src/api/hooks/useAccount';
import {Account} from '@ui/components/Account/Account';
import {useCouncilVotesOf} from 'src/api/hooks/useCouncilVotesOf';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Candidate'>;
};

function LeftIcon({icon}: {icon: string}) {
  return (
    <View style={globalStyles.justifyCenter}>
      <Icon name={icon} size={20} />
    </View>
  );
}

function ItemRight({children}: {children: React.ReactNode}) {
  return <View style={globalStyles.justifyCenter}>{children}</View>;
}

export function CandidateScreen({route, navigation}: ScreenProps) {
  const member = route.params.candidate;
  const screenTitle = route.params.title;
  const {colors} = useTheme();

  useEffect(() => {
    if (screenTitle) {
      navigation.setOptions({title: screenTitle});
    }
  }, [navigation, screenTitle]);

  const {legal, email, twitter, riot, web} = member.account.registration;

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        contentContainerStyle={globalStyles.paddedContainer}
        ListHeaderComponent={() => (
          <>
            <Card>
              <Card.Content>
                <View style={globalStyles.alignCenter}>
                  <IdentityIcon value={member.address} size={30} />
                  <Padder scale={0.5} />
                  <AccountTeaser account={member.account} />
                </View>
                <Padder scale={0.5} />
                <Divider />
                {legal ? (
                  <List.Item
                    title="Legal"
                    left={() => <LeftIcon icon="medal-outline" />}
                    right={() => (
                      <ItemRight>
                        <Caption>{legal}</Caption>
                      </ItemRight>
                    )}
                  />
                ) : null}
                {email ? (
                  <List.Item
                    title="Email"
                    left={() => <LeftIcon icon="email-outline" />}
                    right={() => (
                      <ItemRight>
                        <Caption selectable>{email}</Caption>
                      </ItemRight>
                    )}
                  />
                ) : null}
                {twitter ? (
                  <List.Item
                    title="Twitter"
                    left={() => <LeftIcon icon="twitter" />}
                    right={() => (
                      <ItemRight>
                        <Caption
                          style={{color: colors.primary}}
                          onPress={() => Linking.openURL(`https://twitter.com/${twitter}`)}>
                          {twitter}
                        </Caption>
                      </ItemRight>
                    )}
                  />
                ) : null}
                {riot ? (
                  <List.Item
                    title="Riot"
                    left={() => <LeftIcon icon="message-outline" />}
                    right={() => (
                      <ItemRight>
                        <Caption
                          style={{color: colors.primary}}
                          onPress={() => Linking.openURL(`https://matrix.to/#/${riot}`)}>
                          {riot}
                        </Caption>
                      </ItemRight>
                    )}
                  />
                ) : null}
                {web ? (
                  <List.Item
                    title="Web"
                    left={() => <LeftIcon icon="earth" />}
                    right={() => (
                      <ItemRight>
                        <Caption style={styles.web} onPress={() => Linking.openURL(web)}>
                          {web}
                        </Caption>
                      </ItemRight>
                    )}
                  />
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
        renderItem={({item}) => <Voter account={item} />}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyView height={200}>{`No voters yet.`}</EmptyView>}
      />
    </SafeView>
  );
}

function Voter({account}: {account: string}) {
  const {data: accountInfo} = useAccount(account);
  const {data: councilVote} = useCouncilVotesOf(account);

  console.log(councilVote);

  return (
    <List.Item
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <IdentityIcon value={account} size={35} />
        </View>
      )}
      title={accountInfo && <Account account={accountInfo} />}
      description={councilVote?.formattedStake || ''}
      disabled
    />
  );
}

const styles = StyleSheet.create({
  web: {
    textDecorationLine: 'underline',
  },
});
