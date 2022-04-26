import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Divider, Card, List, Caption, Text, Subheading} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import ProgressChartWidget from '@ui/components/ProgressWidget';
import globalStyles, {standardPadding} from '@ui/styles';
import LoadingView from '@ui/components/LoadingView';
import {NavigationProp} from '@react-navigation/native';
import {parachainDetailScreen} from '@ui/navigation/routeKeys';
import {Parachain, useParachainsSummary} from 'src/api/hooks/useParachainsSummary';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';

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
          ListHeaderComponent={
            <>
              <Card>
                <Card.Content>
                  <View style={globalStyles.rowAlignCenter}>
                    <View style={styles.progressChart}>
                      {parachainsSummary?.leasePeriod.progressPercent && (
                        <ProgressChartWidget
                          chartTextStyle={styles.chartText}
                          title={`Lease Period`}
                          detail={`\n${parachainsSummary.leasePeriod.progressPercent}%\n${parachainsSummary.leasePeriod.remainderParts[0]}`}
                          data={[parachainsSummary.leasePeriod.progressPercent / 100]}
                        />
                      )}
                    </View>
                    <View style={styles.summaryInfo}>
                      {parachainsSummary?.parachainsCount ? (
                        <Row label="Parachains">
                          <Caption>{parachainsSummary.parachainsCount.toString()}</Caption>
                        </Row>
                      ) : null}
                      {parachainsSummary?.parathreadsCount ? (
                        <Row label="Parathreads">
                          <Caption>{parachainsSummary.parathreadsCount.toString()}</Caption>
                        </Row>
                      ) : null}
                      {parachainsSummary?.proposalsCount ? (
                        <Row label="Proposals">
                          <Caption>{parachainsSummary.proposalsCount.toString()}</Caption>
                        </Row>
                      ) : null}
                      {parachainsSummary?.leasePeriod ? (
                        <>
                          <Row label="Current lease">
                            <Caption>{parachainsSummary.leasePeriod.currentLease}</Caption>
                          </Row>
                          <Row label="Total period">
                            <Caption>{parachainsSummary.leasePeriod.totalPeriod}</Caption>
                          </Row>
                        </>
                      ) : null}
                    </View>
                  </View>
                </Card.Content>
              </Card>

              <Padder scale={1} />
              <View style={[globalStyles.rowContainer, globalStyles.paddedContainer]}>
                <View style={globalStyles.flex}>
                  <Subheading>{`Parachains`}</Subheading>
                </View>
                <View style={[globalStyles.flex, globalStyles.alignCenter]}>
                  <Subheading>{`Leases`}</Subheading>
                </View>
              </View>
            </>
          }
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

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Caption style={styles.rowLabel}>{label}:</Caption>
      <View style={globalStyles.flex}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressChart: {
    flex: 1.5,
    alignItems: 'flex-start',
  },
  summaryInfo: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    marginRight: standardPadding,
    width: '35%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: standardPadding,
  },
  rowLabel: {
    width: '65%',
  },
  chartText: {
    left: '32%',
    top: '10%',
  },
});
