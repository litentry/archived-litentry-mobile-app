import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ListItem, Text, Icon, Divider, useTheme} from '@ui-kitten/components';
import IdentityIcon from '@polkadot/reactnative-identicon';
import type {AccountId} from '@polkadot/types/interfaces';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {useCouncil} from 'src/api/hooks/useCouncil';
import LoadingView from '@ui/components/LoadingView';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {Padder} from '@ui/components/Padder';
import {standardPadding} from '@ui/styles';
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

  const legal = identityInfoData?.hasIdentity ? identityInfoData.registration.legal : undefined;
  const email = identityInfoData?.hasIdentity ? identityInfoData.registration.email : undefined;
  const twitter = identityInfoData?.hasIdentity ? identityInfoData.registration.twitter : undefined;
  const riot = identityInfoData?.hasIdentity ? identityInfoData.registration.riot : undefined;
  const web = identityInfoData?.hasIdentity ? identityInfoData.registration.web : undefined;

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={[styles.container, {borderColor: theme['border-basic-color-4']}]}>
              <View style={styles.identityIconContainer}>
                <IdentityIcon value={accountId} size={60} />
                <Padder scale={1} />
                {identityInfoData && <AccountInfoInlineTeaser identity={identityInfoData} />}
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
    </SafeView>
  );
}

function Voter({accountId}: {accountId: AccountId}) {
  const {data} = useAccountIdentityInfo(accountId.toString());
  const {data: voterData} = useCouncilVotesOf(accountId);
  const formatBalance = useFormatBalance();

  return (
    <ListItem
      accessoryLeft={() => <IdentityIcon value={accountId.toString()} size={40} />}
      title={() => (
        <View style={styles.voterAccountContainer}>{data && <AccountInfoInlineTeaser identity={data} />}</View>
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
