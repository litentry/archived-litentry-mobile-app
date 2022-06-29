import React from 'react';
import {View, Text} from 'react-native';
import {useBottomSheet} from '@ui/library';
import {NetworkSwitch} from '@ui/components/NetworkSwitch';
import NetworkSelectionList from '@ui/components/NetworkSelectionList';
import {MainAppBar} from '@ui/navigation/AppBars';
import globalStyles from '@ui/styles';
import {NetworkType, useAvailableNetworks, useNetwork} from '@atoms/network';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';

// TODO: This is a dummy screen, should be removed!!
export function HomeScreen({navigation, route}: {navigation: any; route: any}) {
  const {currentNetwork, selectCurrentNetwork} = useNetwork();
  const {availableNetworks} = useAvailableNetworks();
  const {closeBottomSheet, openBottomSheet, BottomSheet} = useBottomSheet();

  const changeNetwork = (network: NetworkType) => {
    selectCurrentNetwork(network);
    closeBottomSheet();
  };

  const appBarOptions = React.useMemo(() => {
    return {
      headerRight: () => <NetworkSwitch onPress={openBottomSheet} />,
    };
  }, [openBottomSheet]);

  return (
    <Layout style={{flex: 1}}>
      <MainAppBar navigation={navigation} route={route} options={appBarOptions} />
      <View style={globalStyles.fillCenter}>
        <Text>Home</Text>
        <BottomSheet>
          <Layout style={globalStyles.paddedContainer}>
            <NetworkSelectionList items={availableNetworks} selected={currentNetwork} onSelect={changeNetwork} />
            <Padder scale={2} />
          </Layout>
        </BottomSheet>
      </View>
    </Layout>
  );
}
