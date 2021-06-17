import React, {useContext} from 'react';
import {Button, Divider, Icon, Layout, ListItem, Spinner, Text, TopNavigationAction} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {ChainApiContext} from 'context/ChainApiContext';
import {FlatList, StyleSheet, View} from 'react-native';
import {u8aToString} from '@polkadot/util';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAccountsIdentityInfo} from 'service/api/account';
import {EmptyView} from 'presentational/EmptyView';
import {useQuery} from 'react-query';

export function CouncilScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {data, isLoading} = useCouncilMembers();

  return (
    <Layout style={globalStyles.flex}>
      <ScreenNavigation
        renderTitle={() => (
          <Text category={'s1'} style={globalStyles.monoFont}>
            Council
          </Text>
        )}
        accessoryLeft={
          <TopNavigationAction onPress={navigation.goBack} icon={(p) => <Icon {...p} name={'arrow-back-outline'} />} />
        }
      />
      <SafeAreaView edges={['bottom']} style={globalStyles.flex}>
        <View style={styles.header}>
          <Button
            status={'basic'}
            onPress={() => navigation.navigate('MotionsScreen')}
            accessoryLeft={(props) => <Icon {...props} name={'activity-outline'} />}>
            Motions
          </Button>
        </View>
        {isLoading ? (
          <View style={globalStyles.centeredContainer}>
            <Spinner />
          </View>
        ) : (
          <>
            <View style={styles.listHeader}>
              <Text category={'s1'}>Members</Text>
              <Text category={'p2'}>{`seats ${data?.length}/${data?.length}`}</Text>
            </View>
            <FlatList
              style={globalStyles.flex}
              contentContainerStyle={styles.content}
              data={data}
              renderItem={({item}) => {
                const text = u8aToString(item.info.display.asRaw);
                return <ListItem title={text} accessoryLeft={() => <Identicon value={item.accountId} size={30} />} />;
              }}
              keyExtractor={(item, index) => item.accountId.toString() ?? index.toString()}
              ItemSeparatorComponent={Divider}
              ListEmptyComponent={EmptyView}
            />
          </>
        )}
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: standardPadding * 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  listHeader: {justifyContent: 'space-between', flexDirection: 'row', padding: standardPadding * 3},
  content: {paddingVertical: standardPadding, paddingHorizontal: standardPadding * 2},
});

export function useCouncilMembers() {
  const {api} = useContext(ChainApiContext);
  return useQuery('members', async () => {
    const accountIds = await api?.query.council.members();
    if (accountIds && api) {
      return getAccountsIdentityInfo(accountIds, api);
    }
  });
}
