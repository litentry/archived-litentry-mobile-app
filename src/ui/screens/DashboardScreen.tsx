import React from 'react';
import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BountySummaryTeaser} from '@ui/components/BountySummaryTeaser';
import {CouncilSummaryTeaser} from '@ui/components/CouncilSummaryTeaser';
import {DemocracySummaryTeaser} from '@ui/components/DemocracySummaryTeaser';
import {TreasurySummaryTeaser} from '@ui/components/TreasurySummaryTeaser';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {
  bountiesScreen,
  councilScreen,
  democracyScreen,
  eventsCalendarScreen,
  treasuryScreen,
} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {MainAppBar} from '@ui/navigation/AppBars';
import {Layout} from '@ui/components/Layout';
import {Padder} from '@ui/components/Padder';
import {ScrollViewRefetch} from '@ui/components/ScrollViewRefetch';
import {DEMOCRACY_SUMMARY_QUERY} from 'src/api/hooks/useDemocracySummary';
import {COUNCIL_SUMMARY_QUERY} from 'src/api/hooks/useCouncilSummary';
import {BOUNTIES_SUMMARY_QUERY} from 'src/api/hooks/useBountiesSummary';
import {TREASURY_SUMMARY_QUERY} from 'src/api/hooks/useTreasurySummary';
import {EventsCalendarTeaser} from '@ui/components/EventsCalendarTeaser';
import {useBottomSheet} from '@ui/library';
import NetworkSelectionList from '@ui/components/NetworkSelectionList';
import {useNetwork} from 'context/NetworkContext';
import {NetworkType} from 'src/types';
import {NetworkSwitch} from '@ui/components/NetworkSwitch';
import {useParachainAppEnabled} from 'src/hooks/useParachainAppEnabled';

const refetchQueries = [DEMOCRACY_SUMMARY_QUERY, COUNCIL_SUMMARY_QUERY, BOUNTIES_SUMMARY_QUERY, TREASURY_SUMMARY_QUERY];

type Props = NativeStackScreenProps<DashboardStackParamList, 'Dashboard'>;

export function DashboardScreen({navigation, route}: Props) {
  const {closeBottomSheet, openBottomSheet, BottomSheet} = useBottomSheet();
  const {currentNetwork, getAvailableNetworks, select} = useNetwork();
  const {parachainAppEnabled} = useParachainAppEnabled();

  const changeNetwork = (network: NetworkType) => {
    select(network);
    closeBottomSheet();
  };

  const appBarOptions = React.useMemo(() => {
    return {
      headerRight: () => <NetworkSwitch onPress={openBottomSheet} />,
    };
  }, [openBottomSheet]);

  return (
    <Layout style={styles.container}>
      <MainAppBar navigation={navigation} route={route} options={appBarOptions} />
      <ScrollViewRefetch contentContainerStyle={styles.scrollView} refetchQueries={refetchQueries}>
        <EventsCalendarTeaser onPress={() => navigation.navigate(eventsCalendarScreen)} />
        <Padder scale={0.6} />
        <DemocracySummaryTeaser onPress={() => navigation.navigate(democracyScreen)} />
        <Padder scale={0.6} />
        <CouncilSummaryTeaser onPress={() => navigation.navigate(councilScreen)} />
        <Padder scale={0.6} />
        <TreasurySummaryTeaser onPress={() => navigation.navigate(treasuryScreen)} />
        <Padder scale={0.6} />
        <BountySummaryTeaser onPress={() => navigation.navigate(bountiesScreen)} />
      </ScrollViewRefetch>

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
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: standardPadding * 1.5,
    paddingHorizontal: standardPadding * 1.5,
    paddingBottom: standardPadding * 6,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
});

export default DashboardScreen;
