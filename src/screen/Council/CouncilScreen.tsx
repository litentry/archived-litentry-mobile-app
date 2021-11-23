import {useWindowDimensions} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {Divider, Text} from '@ui-kitten/components';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import React, {useMemo} from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useCouncil} from 'src/api/hooks/useCouncil';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';
import {candidateScreen} from 'src/navigation/routeKeys';
import {Layout, List} from 'src/packages/base_components';
import globalStyles, {standardPadding} from 'src/styles';
import {MotionsScreen} from './MotionsScreen';

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
  const {data, isLoading} = useCouncil();
  const {data: summary} = useCouncilSummary();

  const sectionsData = useMemo(
    () => [
      {title: 'Members', data: data ? data.members : []},
      {title: 'Runners Up', data: data ? data.runnersUp : []},
      {
        title: 'Candidates',
        data: data ? data.candidates.map((candidate) => ({accountId: candidate, backing: undefined})) : [],
      },
    ],
    [data],
  );

  return (
    <Layout style={globalStyles.flex}>
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
              const votes = data?.getVoters(item.accountId.toString())?.length;
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
            renderSectionHeader={({section: {title}}) => {
              return (
                <Layout style={styles.sectionHeader}>
                  <List.Subheader>{title}</List.Subheader>
                  <View style={globalStyles.flex} />
                  <List.Subheader>
                    {title === 'Members'
                      ? `Seats ${summary?.seats}`
                      : title === 'Runners Up'
                      ? summary?.runnersUp
                      : summary?.candidatesCount}
                  </List.Subheader>
                </Layout>
              );
            }}
            ItemSeparatorComponent={Divider}
            ListEmptyComponent={EmptyView}
          />
        )}
      </SafeView>
    </Layout>
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

const styles = StyleSheet.create({
  header: {
    padding: standardPadding * 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sectionHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: standardPadding * 3,
    paddingHorizontal: standardPadding,
  },
  content: {paddingVertical: standardPadding, paddingHorizontal: standardPadding * 2},
});
