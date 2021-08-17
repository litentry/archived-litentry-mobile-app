import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ListItem, Text, Icon, Divider, useTheme} from '@ui-kitten/components';
import IdentityIcon from '@polkadot/reactnative-identicon';
import {u8aToString} from '@polkadot/util';
import type {AccountId} from '@polkadot/types/interfaces';
import SafeView, {noTopEdges} from 'src/presentational/SafeView';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {useCouncil} from 'src/api/hooks/useCouncil';
import LoadingView from 'presentational/LoadingView';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import AccountInfoInlineTeaser from 'src/presentational/AccountInfoInlineTeaser';
import Padder from 'src/presentational/Padder';
import {standardPadding} from 'src/styles';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useCouncilVotesOf} from 'src/api/hooks/useCouncilVotesOf';

type ScreenProps = {
  navigation: NavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Candidate'>;
};

export function CandidateScreen({route, navigation}: ScreenProps) {
  const accountId = route.params.accountId;
  const backing = route.params.backing;
  const screenTitle = route.params.title;
  const {data: councilData, isLoading: isLoadingCouncil} = useCouncil();
  const {data: identityInfoData, isLoading: isLoadingIdentityInfo} = useAccountIdentityInfo(accountId);
  const theme = useTheme();

  useEffect(() => {
    if (screenTitle) {
      navigation.setOptions({title: screenTitle});
    }
  }, [navigation, screenTitle]);

  if (isLoadingCouncil || isLoadingIdentityInfo) {
    return <LoadingView />;
  }

  const judgements = identityInfoData?.hasJudgements ? identityInfoData.registration.judgements : undefined;
  const display = identityInfoData?.hasIdentity ? identityInfoData.display : accountId;
  const legal = identityInfoData?.hasIdentity ? u8aToString(identityInfoData.registration.info.legal.asRaw) : undefined;
  const email = identityInfoData?.hasIdentity ? u8aToString(identityInfoData.registration.info.email.asRaw) : undefined;
  const twitter = identityInfoData?.hasIdentity
    ? u8aToString(identityInfoData.registration.info.twitter.asRaw)
    : undefined;
  const riot = identityInfoData?.hasIdentity ? u8aToString(identityInfoData.registration.info.riot.asRaw) : undefined;
  const web = identityInfoData?.hasIdentity ? u8aToString(identityInfoData.registration.info.web.asRaw) : undefined;

  return (
    <SafeView edges={noTopEdges}>
      <View>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View style={[styles.container, {borderColor: theme['border-basic-color-4']}]}>
                <View style={styles.identityIconContainer}>
                  <IdentityIcon value={accountId} size={60} />
                  <Padder scale={1} />
                  <AccountInfoInlineTeaser display={display} judgements={judgements} />
                </View>
                <Padder scale={1} />
                <Divider />
                <View>
                  {legal ? (
                    <ListItem
                      title="Legal"
                      accessoryLeft={(p) => <Icon {...p} name="award-outline" />}
                      accessoryRight={() => (
                        <Text selectable category="label">
                          {legal}
                        </Text>
                      )}
                    />
                  ) : null}
                  {email ? (
                    <ListItem
                      title="Email"
                      accessoryLeft={(p) => <Icon {...p} name="email-outline" />}
                      accessoryRight={() => (
                        <Text selectable category="label">
                          {email}
                        </Text>
                      )}
                    />
                  ) : null}
                  {twitter ? (
                    <ListItem
                      title="Twitter"
                      accessoryLeft={(p) => <Icon {...p} name="twitter-outline" />}
                      accessoryRight={() => (
                        <Text selectable category="label">
                          {twitter}
                        </Text>
                      )}
                    />
                  ) : null}
                  {riot ? (
                    <ListItem
                      title="Riot"
                      accessoryLeft={(p) => <Icon {...p} name="message-square-outline" />}
                      accessoryRight={() => (
                        <Text selectable category="label">
                          {riot}
                        </Text>
                      )}
                    />
                  ) : null}
                  {web ? (
                    <ListItem
                      title="Web"
                      accessoryLeft={(p) => <Icon {...p} name="browser-outline" />}
                      accessoryRight={() => (
                        <Text selectable category="label">
                          {web}
                        </Text>
                      )}
                    />
                  ) : null}
                </View>
                {backing ? (
                  <>
                    <Divider />
                    <Padder scale={1} />
                    <View style={styles.backingContainer}>
                      <Text category="label">{backing}</Text>
                      <Text category="p2">Backing</Text>
                    </View>
                  </>
                ) : null}
              </View>
              <View>
                <Text style={styles.votersListTitle} category="s1">
                  Voters:
                </Text>
              </View>
            </>
          )}
          data={councilData?.getVoters(accountId) || []}
          renderItem={({item}) => <Voter accountId={item} />}
          keyExtractor={(item) => item.toString()}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </SafeView>
  );
}

function Voter({accountId}: {accountId: AccountId}) {
  const {data} = useAccountIdentityInfo(accountId.toString());
  const display = data?.hasIdentity ? data.display : accountId.toString();
  const judgements = data?.hasJudgements ? data.registration.judgements : undefined;
  const {data: voterData} = useCouncilVotesOf(accountId);
  const formatBalance = useFormatBalance();

  return (
    <ListItem
      accessoryLeft={() => <IdentityIcon value={accountId.toString()} size={40} />}
      title={() => (
        <View style={styles.voterAccountContainer}>
          <AccountInfoInlineTeaser display={display} judgements={judgements} />
        </View>
      )}
      style={styles.voterContainer}
      description={voterData?.stake ? formatBalance(voterData.stake) : ''}
      disabled
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 10,
    margin: 15,
  },
  identityIconContainer: {
    alignItems: 'center',
  },
  voterContainer: {
    paddingVertical: standardPadding,
    paddingHorizontal: standardPadding * 2,
  },
  votersListTitle: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  voterAccountContainer: {paddingHorizontal: 10},
  backingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
