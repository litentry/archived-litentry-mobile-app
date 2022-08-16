import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Divider, Card, List, Caption, Text, Subheading, FlatList} from '@ui/library';
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
      <Card style={styles.parachainItem}>
        <Card.Content>
          <View style={globalStyles.rowAlignCenter}>
            <View style={styles.progressChart}>
              {parachainsSummary?.leasePeriod.progressPercent && (
                <View>
                  <Caption style={globalStyles.textCenter}> Lease Period</Caption>
                  <ProgressChart width={100} percent={parachainsSummary.leasePeriod.progressPercent / 100} />
                </View>
              )}
            </View>
            <View style={styles.summaryInfo}>
              {parachainsSummary?.parachainsCount ? (
                <Row label="Parachains">
                  <Caption>{parachainsSummary.parachainsCount.toString()}</Caption>
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
                  <Row label="Remaining">
                    <Caption>{parachainsSummary.leasePeriod.remainderParts[0]}</Caption>
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
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ParachainsOverviewHeader parachainsSummary={parachainsSummary} />}
          data={parachains}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <ParachainItem parachain={item} onPress={() => toParachainDetails(item.id)} />}
          ItemSeparatorComponent={Divider}
          estimatedItemSize={parachains?.length}
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
        <Caption>{parachain.id}</Caption>
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

  return (
    <List.Item
      title={parachain.name}
      onPress={onPress}
      left={ItemLeft}
      right={ItemRight}
      style={styles.parachainItem}
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
    width: '60%',
  },
  parachainItem: {
    paddingVertical: standardPadding,
    marginHorizontal: standardPadding,
  },
});
