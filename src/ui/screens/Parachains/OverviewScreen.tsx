import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Divider, Card, List, Caption, Text, Subheading} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import LoadingView from '@ui/components/LoadingView';
import {NavigationProp} from '@react-navigation/native';
import {parachainDetailScreen} from '@ui/navigation/routeKeys';
import {Parachain, useParachainsSummary} from 'src/api/hooks/useParachainsSummary';
import {ParachainsStackParamList} from '@ui/navigation/navigation';

type ScreenProps = {
  navigation: NavigationProp<ParachainsStackParamList>;
};

export function ParachainsOverviewScreen({navigation}: ScreenProps) {
  const {parachainsSummary, parachains, loading} = useParachainsSummary();

  const toParachainDetails = (parachainId: Parachain['id']) => {
    navigation.navigate(parachainDetailScreen, {parachainId});
  };

  return (
    <SafeView edges={noTopEdges}>
      {loading && (!parachainsSummary || !parachains) ? (
        <LoadingView />
      ) : (
        <FlatList
          contentContainerStyle={globalStyles.paddedContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <>
                <Card>
                  <Card.Content>
                    <View style={[styles.itemRow, styles.cardTop]}>
                      <StatInfoBlock title="Parachains">{parachainsSummary?.parachainsCount.toString()}</StatInfoBlock>
                      <StatInfoBlock title="Parathreads">
                        {parachainsSummary?.parathreadsCount.toString()}
                      </StatInfoBlock>
                    </View>
                    {parachainsSummary?.proposalsCount ? (
                      <View style={styles.itemRow}>
                        <StatInfoBlock title="Proposals">{parachainsSummary.proposalsCount}</StatInfoBlock>
                      </View>
                    ) : null}
                    <Divider />
                    <Padder scale={1} />
                    <View style={globalStyles.spaceBetweenRowContainer}>
                      <View style={styles.leasePeriodContainer}>
                        {parachainsSummary?.leasePeriod.progressPercent && (
                          <ProgressChartWidget
                            title={`Lease Period`}
                            detail={`\n${parachainsSummary.leasePeriod.progressPercent}%`}
                            data={[parachainsSummary.leasePeriod.progressPercent]}
                          />
                        )}
                      </View>
                      <View style={styles.leasePeriodInfo}>
                        <View style={globalStyles.spaceBetweenRowContainer}>
                          <Caption>{'Current Lease : '}</Caption>
                          <Caption style={styles.leaseCaptionFont}>
                            {parachainsSummary?.leasePeriod.currentLease}
                          </Caption>
                        </View>
                        <View style={globalStyles.spaceBetweenRowContainer}>
                          <Caption>{'Total : '}</Caption>
                          <Caption style={styles.leaseCaptionFont}>
                            {parachainsSummary?.leasePeriod.totalPeriod}
                          </Caption>
                        </View>
                        <View style={globalStyles.spaceBetweenRowContainer}>
                          <Caption>{'Remainder : '}</Caption>
                          <Caption style={styles.leaseCaptionFont}>{parachainsSummary?.leasePeriod.remainder}</Caption>
                        </View>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
                <Padder scale={1} />
                <View style={styles.parachainsHeaderContainer}>
                  <Subheading>Parachains</Subheading>
                  <Subheading>Leases</Subheading>
                </View>
                <Padder scale={1} />
              </>
            );
          }}
          data={parachains}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <ParachainItem parachain={item} onPress={() => toParachainDetails(item.id)} />}
          ItemSeparatorComponent={Divider}
        />
      )}
    </SafeView>
  );
}

type ParachainProps = {
  parachain: Parachain;
  onPress: () => void;
};

function ParachainItem({parachain, onPress}: ParachainProps) {
  const {lease} = parachain;
  const [days, hours] = lease?.blockTime || [];

  return (
    <List.Item
      title={parachain.name}
      key={parachain.id}
      onPress={onPress}
      left={() => (
        <View style={globalStyles.justifyCenter}>
          <Caption>{parachain.id}</Caption>
        </View>
      )}
      right={() => {
        return (
          <View style={styles.rightItem}>
            <Text>{lease?.period}</Text>
            <Text style={globalStyles.rowContainer}>{days || hours ? `${days || ''} ${hours || ''}` : null}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: standardPadding * 2,
  },
  cardTop: {marginHorizontal: standardPadding * 2},
  leasePeriodContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '40%',
  },
  leasePeriodInfo: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
  },
  parachainsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rightItem: {
    marginRight: standardPadding,
  },
  leaseCaptionFont: {
    fontSize: 16,
  },
});
