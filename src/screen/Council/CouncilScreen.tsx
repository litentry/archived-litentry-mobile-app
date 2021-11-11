import React, {useMemo} from 'react';
import {StyleSheet, View, SectionList} from 'react-native';
import {Divider, Layout, ListItem, Text, useTheme, Tab, TabBar} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {useNavigation} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';
import {EmptyView} from 'presentational/EmptyView';
import {useCouncil} from 'src/api/hooks/useCouncil';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {candidateScreen} from 'src/navigation/routeKeys';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';
import {MotionsScreen} from './MotionsScreen';

import {createMaterialTopTabNavigator, MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import LoadingView from 'presentational/LoadingView';
const {Navigator, Screen} = createMaterialTopTabNavigator();

function TopTabBar({navigation, state}: MaterialTopTabBarProps) {
  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => {
        const route = state.routeNames[index];
        if (route) {
          navigation.navigate(route);
        }
      }}>
      <Tab title="Overview" />
      <Tab title="Motions" />
    </TabBar>
  );
}

export function CouncilScreen() {
  return (
    <Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <Screen name="CouncilOverviewScreen" component={CouncilOverviewScreen} />
      <Screen name="MotionsScreen" component={MotionsScreen} />
    </Navigator>
  );
}

function CouncilOverviewScreen() {
  const {data, isLoading} = useCouncil();
  const {data: summary} = useCouncilSummary();
  const theme = useTheme();

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
          <View style={globalStyles.centeredContainer}>
            <LoadingView />
          </View>
        ) : (
          <SectionList
            style={globalStyles.flex}
            contentContainerStyle={styles.content}
            sections={sectionsData}
            keyExtractor={(item) => item.accountId.toString()}
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
                <View style={[styles.sectionHeader, {backgroundColor: theme['background-basic-color-1']}]}>
                  <Text category={'s1'}>{title}</Text>
                  <Text category={'s2'}>
                    {title === 'Members'
                      ? `Seats ${summary?.seats}`
                      : title === 'Runners Up'
                      ? summary?.runnersUp
                      : summary?.candidatesCount}
                  </Text>
                </View>
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
    <ListItem
      title={title}
      accessoryLeft={() => <Identicon value={accountId} size={30} />}
      accessoryRight={votes ? () => <Text category="p2">{votes} votes</Text> : undefined}
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
