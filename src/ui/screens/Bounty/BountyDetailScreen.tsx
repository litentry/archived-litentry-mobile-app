import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useBounty} from 'src/api/hooks/useBounty';
import {Text, Divider} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import LoadingView from '@ui/components/LoadingView';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {accountScreen} from '@ui/navigation/routeKeys';

type ScreenProps = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Bounty'>;
};

export function BountyDetailScreen({route, navigation}: ScreenProps) {
  const index = route.params.index;
  const {data: bounty, loading} = useBounty(index);

  if (loading && !bounty) {
    return <LoadingView />;
  }

  const toAccountDetails = (address?: string) => {
    if (address) {
      navigation.navigate(accountScreen, {address});
    }
  };

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        {bounty?.proposer ? (
          <View style={styles.alignItemsCenter}>
            <Text variant="titleMedium">Proposer</Text>
            <AccountTeaser account={bounty.proposer.account} identiconSize={40} />
            <Padder scale={1} />
          </View>
        ) : null}
        <View style={styles.section}>
          <View style={[styles.sectionItem, styles.alignItemsCenter]}>
            <Text variant="titleMedium">Status</Text>
            <Text>{bounty?.bountyStatus.status}</Text>
          </View>
          <View style={[styles.sectionItem, styles.alignItemsCenter]}>
            <Text variant="titleMedium">Value</Text>
            <Text>{bounty?.formattedValue}</Text>
          </View>
        </View>
        <Padder scale={1} />
        <Divider />
        <Padder scale={1} />
        <View>
          <Text variant="titleMedium">Description</Text>
          <Text variant="bodyMedium">{bounty?.description}</Text>
        </View>
        <Padder scale={1} />
        <Divider />
        <Padder scale={1} />
        {bounty?.bountyStatus?.curator ? (
          <View>
            <Text variant="titleMedium">Curator</Text>
            <AccountTeaser
              account={bounty.bountyStatus.curator.account}
              identiconSize={30}
              onPress={() => toAccountDetails(bounty?.bountyStatus?.curator?.account.address)}
            />
            <Padder scale={1} />
            <Divider />
          </View>
        ) : null}
        <Padder scale={1} />
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <Text variant="titleMedium">Curator's Fee</Text>
            <Text variant="bodyMedium">{String(bounty?.formattedFee ?? 0)}</Text>
          </View>
          <View style={styles.sectionItem}>
            <Text variant="titleMedium">Curator's Deposit</Text>
            <Text variant="bodyMedium">{String(bounty?.formattedCuratorDeposit ?? 0)}</Text>
          </View>
        </View>
        <Padder scale={1} />
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <Text variant="titleMedium">Bond</Text>
            <Text>{String(bounty?.formattedBond ?? 0)}</Text>
          </View>
          <View style={styles.sectionItem}>
            {bounty?.bountyStatus.unlockAtTime ? (
              <>
                <Text variant="titleMedium">Payout at</Text>
                <Text>{bounty.bountyStatus.unlockAtTime.slice(0, 2).join('')}</Text>
              </>
            ) : null}
            {bounty?.bountyStatus.updateDueTime ? (
              <>
                <Text variant="titleMedium">Update at</Text>
                <Text>{bounty.bountyStatus.updateDueTime.slice(0, 2).join('')}</Text>
              </>
            ) : null}
          </View>
        </View>
        <Padder scale={1} />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  alignItemsCenter: {alignItems: 'center'},
  section: {flexDirection: 'row', alignItems: 'center'},
  sectionItem: {flex: 0.5},
});
