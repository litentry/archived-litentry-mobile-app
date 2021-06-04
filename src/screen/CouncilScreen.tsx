import React, {useContext} from 'react';
import {Divider, Icon, Layout, List, ListItem, Spinner, Text, TopNavigationAction} from '@ui-kitten/components';
import globalStyles, {standardPadding} from 'src/styles';
import {ChainApiContext} from 'context/ChainApiContext';
import {StyleSheet, View} from 'react-native';
import {u8aToString} from '@polkadot/util';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAccountsIdentityInfo} from 'service/api/account';

export function CouncilScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {api} = useContext(ChainApiContext);

  const {loading, value: data} = useAsyncRetry(async () => {
    try {
      if (!api) {
        return;
      }
      const accountIds = await api.query.council.members();
      return await getAccountsIdentityInfo(accountIds, api);
    } catch (e) {
      console.warn(e);
    }
  }, [api]);

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
        {loading ? (
          <View style={globalStyles.centeredContainer}>
            <Spinner />
          </View>
        ) : null}
        <View style={styles.header}>
          <Text category={'s1'}>Members</Text>
          <Text category={'p2'}>{`seats ${data?.length}/${data?.length}`}</Text>
        </View>
        <List
          data={data}
          renderItem={({item}: {item: Exclude<typeof data, undefined>[0]}) => {
            const text = u8aToString(item.info.display.asRaw);
            return <ListItem title={text} accessoryLeft={() => <Identicon value={item.accountId} size={30} />} />;
          }}
          keyExtractor={(item: Exclude<typeof data, undefined>[0], index) =>
            item.accountId.toString() ?? index.toString()
          }
          ItemSeparatorComponent={Divider}
        />
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {justifyContent: 'space-between', flexDirection: 'row', padding: standardPadding * 2},
});
