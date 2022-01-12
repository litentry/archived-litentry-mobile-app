import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Divider, List, Card, Icon, Caption, Subheading, Paragraph} from '@ui/library';
import IdentityIcon from '@polkadot/reactnative-identicon';
import type {AccountId} from '@polkadot/types/interfaces';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {useCouncil} from 'src/api/hooks/useCouncil';
import LoadingView from '@ui/components/LoadingView';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';
import {Padder} from '@ui/components/Padder';
import globalStyles from '@ui/styles';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
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
  const accountId = route.params.accountId;
  const backing = route.params.backing;
  const screenTitle = route.params.title;
  const {data: councilData, isLoading: isLoadingCouncil} = useCouncil();
  const {data: identityInfoData, isLoading: isLoadingIdentityInfo} = useAccountIdentityInfo(accountId);

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
        contentContainerStyle={globalStyles.paddedContainer}
        ListHeaderComponent={() => (
          <>
            <Card>
              <Card.Content>
                <View style={globalStyles.alignCenter}>
                  <IdentityIcon value={accountId} size={30} />
                  <Padder scale={0.5} />
                  {identityInfoData && <AccountInfoInlineTeaser identity={identityInfoData} />}
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
                        <Caption>{email}</Caption>
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
                        <Caption>{twitter}</Caption>
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
                        <Caption>{riot}</Caption>
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
                        <Caption>{web}</Caption>
                      </ItemRight>
                    )}
                  />
                ) : null}
                {backing ? (
                  <>
                    <Divider />
                    <Padder scale={1} />
                    <View style={globalStyles.alignCenter}>
                      <Paragraph>Backing</Paragraph>
                      <Paragraph>{backing}</Paragraph>
                    </View>
                  </>
                ) : null}
              </Card.Content>
            </Card>
            <Padder scale={1} />
            <Subheading style={globalStyles.textCenter}>{`Voters`}</Subheading>
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
    <List.Item
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <IdentityIcon value={accountId.toString()} size={40} />
        </View>
      )}
      title={data && <AccountInfoInlineTeaser identity={data} />}
      description={voterData?.stake ? formatBalance(voterData.stake) : ''}
      disabled
    />
  );
}
