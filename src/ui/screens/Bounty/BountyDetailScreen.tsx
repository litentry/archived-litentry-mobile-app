import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Identicon from '@polkadot/reactnative-identicon';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useBounty} from 'src/api/hooks/useBounty';
import {Subheading, Paragraph, Text, Divider} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import LoadingView from '@ui/components/LoadingView';
// import AccountInfoInlineTeaser from '@ui/components/AccountInfoInlineTeaser';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Bounty'>;
};

export function BountyDetailScreen({route}: ScreenProps) {
  const index = route.params.index;
  const {data: bounty, loading} = useBounty(index);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        {bounty?.proposer ? (
          <View style={styles.alignItemsCenter}>
            <Subheading>Proposer</Subheading>
            <View style={styles.section}>
              <Identicon value={bounty.proposer.address} size={35} />
              <Padder scale={0.5} />
              {/* @TODO:
                Refactor AccountInfoInlineTeaser component to make it work with account info
              */}
              {/* <AccountInfoInlineTeaser identity={bounty.proposer.account} /> */}
              <Paragraph>{bounty.proposer.account.display}</Paragraph>
            </View>
            <Padder scale={1} />
          </View>
        ) : null}
        <View style={styles.section}>
          <View style={[styles.sectionItem, styles.alignItemsCenter]}>
            <Subheading>Status</Subheading>
            <Text>{bounty?.bountyStatus.status}</Text>
          </View>
          <View style={[styles.sectionItem, styles.alignItemsCenter]}>
            <Subheading>Value</Subheading>
            <Text>{bounty?.formattedValue}</Text>
          </View>
        </View>
        <Padder scale={1} />
        <Divider />
        <Padder scale={1} />
        <View>
          <Subheading>Description</Subheading>
          <Paragraph>{bounty?.description}</Paragraph>
        </View>
        <Padder scale={1} />
        <Divider />
        <Padder scale={1} />
        {bounty?.bountyStatus.curator ? (
          <View>
            <Subheading>Curator</Subheading>
            <View style={styles.section}>
              <Identicon value={bounty.bountyStatus.curator.address} size={35} />
              <Padder scale={0.5} />
              {/* @TODO:
                Refactor AccountInfoInlineTeaser component to make it work with account info
              */}
              {/* <AccountInfoInlineTeaser identity={curatorIdentity} /> */}
              <Paragraph>{bounty.bountyStatus.curator.account.display}</Paragraph>
            </View>
            <Padder scale={1} />
            <Divider />
          </View>
        ) : null}
        <Padder scale={1} />
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <Subheading>Curator's Fee</Subheading>
            <Paragraph>{String(bounty?.formattedFee ?? 0)}</Paragraph>
          </View>
          <View style={styles.sectionItem}>
            <Subheading>Curator's Deposit</Subheading>
            <Text>{String(bounty?.formattedCuratorDeposit ?? 0)}</Text>
          </View>
        </View>
        <Padder scale={1} />
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <Subheading>Bond</Subheading>
            <Text>{String(bounty?.formattedBond ?? 0)}</Text>
          </View>
          <View style={styles.sectionItem}>
            {bounty?.bountyStatus.unlockAtTime ? (
              <>
                <Subheading>Payout at</Subheading>
                <Text>{bounty.bountyStatus.unlockAtTime.slice(0, 2).join('')}</Text>
              </>
            ) : null}
            {bounty?.bountyStatus.updateDueTime ? (
              <>
                <Subheading>Update at</Subheading>
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
