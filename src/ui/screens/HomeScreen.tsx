import React from 'react';
import {View, Text} from 'react-native';
import {useBottomSheet} from '@ui/library';
import {NetworkSwitch} from '@ui/components/NetworkSwitch';
import NetworkSelectionList from '@ui/components/NetworkSelectionList';
import globalStyles from '@ui/styles';
import {useNetwork} from 'context/NetworkContext';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {NetworkType} from 'src/types';
import {useParachainAppEnabled} from 'src/hooks/useParachainAppEnabled';

// TODO: This is a dummy screen, should be removed!!
export function HomeScreen({navigation}: {navigation: any}) {
  const {currentNetwork, getAvailableNetworks, select} = useNetwork();
  const {closeBottomSheet, openBottomSheet, BottomSheet} = useBottomSheet();
  const {parachainAppEnabled} = useParachainAppEnabled();

  const changeNetwork = (network: NetworkType) => {
    select(network);
    closeBottomSheet();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <NetworkSwitch onPress={openBottomSheet} />,
    });
  }, [navigation, openBottomSheet]);

  return (
    <View style={globalStyles.fillCenter}>
      <Text>Home</Text>
      <BottomSheet>
        <Layout style={globalStyles.paddedContainer}>
          <NetworkSelectionList
            items={getAvailableNetworks({parachainsEnabled: parachainAppEnabled})}
            selected={currentNetwork}
            onSelect={changeNetwork}
          />
          <Padder scale={2} />
        </Layout>
      </BottomSheet>
    </View>
  );
}
