import React, {useContext} from 'react';
import {Divider, Icon, Layout, List, ListItem, Spinner, Text, TopNavigationAction} from '@ui-kitten/components';
import globalStyles from 'src/styles';
import {ChainApiContext} from 'context/ChainApiContext';
import {View} from 'react-native';
import {u8aToString} from '@polkadot/util';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';
import {ApiPromise} from '@polkadot/api';
import {AccountId, Registration} from '@polkadot/types/interfaces';
import {Option, Vec} from '@polkadot/types';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import Identicon from '@polkadot/reactnative-identicon';

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
      {loading ? (
        <View style={globalStyles.centeredContainer}>
          <Spinner />
        </View>
      ) : null}
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
    </Layout>
  );
}

// const styles = StyleSheet.create({
//   loadingContainer: {flex:1}
// })

async function getAccountsIdentityInfo(accountIds: Vec<AccountId>, api: ApiPromise) {
  const registrationOptions = await api.query.identity.identityOf.multi<Option<Registration>>(accountIds);

  let response: {info: IdentityInfo; accountId: AccountId}[] = [];

  for (const index in registrationOptions) {
    const registration = registrationOptions[index].unwrapOr(undefined);
    if (registration) {
      response.push({accountId: accountIds[index], info: registration.info});
    } else {
      // check for parent accounts
      const superAccount = (await api.query.identity.superOf(accountIds[index])).unwrapOr(undefined);
      if (superAccount) {
        const [accountId] = superAccount;
        const r = (await api.query.identity.identityOf(accountId)).unwrapOr(undefined);
        if (r) {
          response.push({accountId, info: r.info});
        }
      }
    }
  }

  return response;
}
