import * as React from 'react';
import {Button, Icon, Input, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import ScreenNavigation from 'layout/ScreenNavigation';
import globalStyles, {standardPadding} from 'src/styles';
import {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {useContext} from 'react';
import {AccountContext} from 'context/AccountContextProvider';

export function SubmitTipScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {accounts} = useContext(AccountContext);
  const account = accounts?.[0];

  if (!account) {
    throw new Error('no accounts found');
  }

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
          <Text>{account.address}</Text>

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
