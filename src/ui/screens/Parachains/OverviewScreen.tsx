import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Divider, Card, List, Text} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {ProgressChart} from '@ui/components/ProgressChart';
import LoadingView from '@ui/components/LoadingView';
import {parachainDetailScreen} from '@ui/navigation/routeKeys';
import {Parachain, ParachainsSummary, useParachainsSummary} from 'src/api/hooks/useParachainsSummary';
import {ParachainsStackParamList} from '@ui/navigation/navigation';
import {Padder} from '@ui/components/Padder';
import globalStyles, {standardPadding} from '@ui/styles';

type ScreenProps = {
  navigation: NavigationProp<ParachainsStackParamList>;
};

function ParachainsOverviewHeader({parachainsSummary}: {parachainsSummary?: ParachainsSummary}) {
  return (
    <>
      <Card>
        <Card.Content>
          <View style={globalStyles.rowAlignCenter}>
            <View style={styles.progressChart}>
              {parachainsSummary?.leasePeriod.progressPercent && (
                <View>
                  <Text variant="bodySmall" style={globalStyles.textCenter}>
                    Lease Period
                  </Text>
                  <ProgressChart width={100} percent={parachainsSummary.leasePeriod.progressPercent / 100} />
                </View>
              )}
            </View>
            <View style={styles.summaryInfo}>
              {parachainsSummary?.parachainsCount ? (
                <Row label="Parachains">
                  <Text variant="bodySmall">{parachainsSummary.parachainsCount.toString()}</Text>
                </Row>
              ) : null}
              {parachainsSummary?.proposalsCount ? (
                <Row label="Proposals">
                  <Text variant="bodySmall">{parachainsSummary.proposalsCount.toString()}</Text>
                </Row>
              ) : null}
              {parachainsSummary?.leasePeriod ? (
                <>
                  <Row label="Current lease">
                    <Text variant="bodySmall">{parachainsSummary.leasePeriod.currentLease}</Text>
                  </Row>
                  <Row label="Total period">
                    <Text variant="bodySmall">{parachainsSummary.leasePeriod.totalPeriod}</Text>
                  </Row>
                  <Row label="Remaining">
                    <Text variant="bodySmall">{parachainsSummary.leasePeriod.remainderParts[0]}</Text>
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
          <Text variant="titleMedium">{`Parachains`}</Text>
        </View>
        <View style={[globalStyles.flex, globalStyles.alignCenter]}>
          <Text variant="titleMedium">{`Leases`}</Text>
        </View>
      </View>
    </>
  );
}

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
          ListHeaderComponent={<ParachainsOverviewHeader parachainsSummary={parachainsSummary} />}
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

  const ItemLeft = React.useCallback(
    () => (
      <View style={globalStyles.justifyCenter}>
        <Text variant="bodySmall">{parachain.id}</Text>
      </View>
    ),
    [parachain.id],
  );

  const ItemRight = React.useCallback(
    () => (
      <View style={styles.rightItem}>
        <Text>{lease?.period}</Text>
        <Text style={globalStyles.rowContainer}>{days || hours ? `${days || ''} ${hours || ''}` : null}</Text>
      </View>
    ),
    [days, hours, lease],
  );

  return <List.Item title={parachain.name} onPress={onPress} left={ItemLeft} right={ItemRight} />;
}

function Row({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <View style={styles.row}>
      <Text variant="bodySmall" style={styles.rowLabel}>
        {label}:
      </Text>
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
    width: '60%',
  },
});
