import * as React from 'react';
import {Button, Icon, Input, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import ScreenNavigation from 'layout/ScreenNavigation';
import globalStyles, {standardPadding} from 'src/styles';
import {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useContext} from 'react';
import {AccountContext} from 'context/AccountContextProvider';
import {useAsyncRetry} from 'react-use';
import {getAccountsIdentityInfo} from 'service/api/account';
import {ChainApiContext} from 'context/ChainApiContext';
import {u8aToString} from '@polkadot/util';
import Identicon from '@polkadot/reactnative-identicon';

export function SubmitTipScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {loading, value: data, error} = useAccount();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    return <Text>Something went wrong</Text>;
  }
  const account = data[0];

  return (
    <Layout style={globalStyles.flex}>
      <ScreenNavigation
        renderTitle={() => (
          <Text category={'s1'} style={globalStyles.monoFont}>
            Submit Tip
          </Text>
        )}
        accessoryLeft={
          <TopNavigationAction onPress={navigation.goBack} icon={(p) => <Icon {...p} name={'arrow-back-outline'} />} />
        }
      />
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <View style={globalStyles.flex}>
          <Text>Sending from</Text>
          <Identicon value={account.accountId} />
          <Text>{u8aToString(account.info.display.asRaw)}</Text>

          <Text>beneficiary</Text>
          <Input placeholder={'beneficiary'} />

          <Text>Tip reason</Text>
          <Input placeholder={'Tip reason'} />
        </View>

        <Button>Sign and Submit</Button>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: standardPadding * 2, paddingBottom: standardPadding * 4},
  rowContainer: {flexDirection: 'row', alignItems: 'center'},
});

function useAccount() {
  const {api} = useContext(ChainApiContext);
  const {accounts} = useContext(AccountContext);
  const account = accounts?.[0];

  return useAsyncRetry(async () => {
    if (!api || !account) {
      throw new Error('Context is missing');
    }
    return await getAccountsIdentityInfo([account.address], api);
  }, [api, account]);
}
