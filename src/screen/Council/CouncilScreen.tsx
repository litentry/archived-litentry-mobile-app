import React, {useMemo} from 'react';
import {StyleSheet, View, SectionList} from 'react-native';
import {Button, Divider, Icon, Layout, ListItem, Spinner, Text} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {NavigationProp} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';
import {EmptyView} from 'presentational/EmptyView';
import {useCouncil} from 'src/api/hooks/useCouncil';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {motionsScreen} from 'src/navigation/routeKeys';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useCouncilSummary} from 'src/api/hooks/useCouncilSummary';

export function CouncilScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
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
        <View style={styles.header}>
          <Button
            status={'basic'}
            onPress={() => navigation.navigate(motionsScreen)}
            accessoryLeft={(props) => <Icon {...props} name={'activity-outline'} />}>
            Motions
          </Button>
        </View>
        {isLoading ? (
          <View style={globalStyles.centeredContainer}>
            <Spinner />
          </View>
        ) : (
          <SectionList
            style={globalStyles.flex}
            contentContainerStyle={styles.content}
            sections={sectionsData}
            keyExtractor={(item) => item.accountId.toString()}
            renderItem={({item}) => {
              const votes = data?.getVoters(item.accountId.toString())?.length;
              return <Item accountId={item.accountId.toString()} backing={item.backing} votes={votes} />;
            }}
            renderSectionHeader={({section: {title}}) => {
              return (
                <View style={styles.sectionHeader}>
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

function Item({accountId, backing, votes}: {accountId: string; backing?: string; votes?: number}) {
  const {data: identityInfo} = useAccountIdentityInfo(accountId);
  const title = identityInfo && identityInfo.hasIdentity ? identityInfo.display : accountId;

  return (
    <ListItem
      title={title}
      accessoryLeft={() => <Identicon value={accountId} size={30} />}
      accessoryRight={votes ? () => <Text category="p2">{votes} votes</Text> : undefined}
      description={backing ? `Backing: ${backing?.toString()}` : ''}
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
    backgroundColor: '#fff',
  },
  content: {paddingVertical: standardPadding, paddingHorizontal: standardPadding * 2},
});
