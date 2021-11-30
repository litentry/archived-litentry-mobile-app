import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {bnToBn} from '@polkadot/util';
import Identicon from '@polkadot/reactnative-identicon';
import {DashboardStackParamList} from 'src/navigation/navigation';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {useBounty} from 'src/api/hooks/useBounty';
import {Subheading, Paragraph, Text, Divider, Padder} from 'src/packages/base_components';
import AccountInfoInlineTeaser from 'src/presentational/AccountInfoInlineTeaser';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useBestNumber} from 'src/api/hooks/useBestNumber';

type ScreenProps = {
  navigation: StackNavigationProp<DashboardStackParamList>;
  route: RouteProp<DashboardStackParamList, 'Bounty'>;
};

export function BountyDetailScreen({route}: ScreenProps) {
  const index = route.params.index;
  const bountyData = useBounty(index);
  const formatBalance = useFormatBalance();
  const bestNumber = useBestNumber();

  const proposerAccount = bountyData?.bounty.proposer.toString();
  const {data: proposerIdentity} = useAccountIdentityInfo(proposerAccount);

  const curatorAccount = bountyData?.bountyStatus.curator?.toString();
  const {data: curatorIdentity} = useAccountIdentityInfo(curatorAccount);

  const updateDue = bountyData?.bountyStatus.updateDue;
  const blocksUntilUpdate = React.useMemo(() => updateDue?.sub(bnToBn(bestNumber)), [bestNumber, updateDue]);
  const {timeStringParts: untilUpdateTimeParts} = useBlockTime(blocksUntilUpdate);
  const untilUpdateTime = untilUpdateTimeParts.filter(Boolean).slice(0, 2).join(' ');

  const unlockAt = bountyData?.bountyStatus.unlockAt;
  const blocksUntilPayout = React.useMemo(() => unlockAt?.sub(bnToBn(bestNumber)), [bestNumber, unlockAt]);
  const {timeStringParts: untilPayoutTimeParts} = useBlockTime(blocksUntilPayout);
  const untilPayoutTime = untilPayoutTimeParts.filter(Boolean).slice(0, 2).join(' ');

  if (!bountyData) {
    return null;
  }

  return (
    <SafeView edges={noTopEdges}>
      <View style={styles.container}>
        {proposerIdentity ? (
          <View style={styles.alignItemsCenter}>
            <Subheading>Proposer</Subheading>
            <View style={styles.section}>
              <Identicon value={proposerAccount} size={35} />
              <Padder scale={0.5} />
              <AccountInfoInlineTeaser identity={proposerIdentity} />
            </View>
            <Padder scale={1} />
          </View>
        ) : null}
        <View style={styles.section}>
          <View style={[styles.sectionItem, styles.alignItemsCenter]}>
            <Subheading>Status</Subheading>
            <Text>{bountyData.bountyStatus.status}</Text>
          </View>
          <View style={[styles.sectionItem, styles.alignItemsCenter]}>
            <Subheading>Value</Subheading>
            <Text>{formatBalance(bountyData.bounty.value)}</Text>
          </View>
        </View>
        <Padder scale={1} />
        <Divider />
        <Padder scale={1} />
        <View>
          <Subheading>Description</Subheading>
          <Paragraph>{bountyData.description}</Paragraph>
        </View>
        <Padder scale={1} />
        <Divider />
        <Padder scale={1} />
        {curatorIdentity ? (
          <View>
            <Subheading>Curator</Subheading>
            <View style={styles.section}>
              <Identicon value={curatorAccount} size={35} />
              <Padder scale={0.5} />
              <AccountInfoInlineTeaser identity={curatorIdentity} />
            </View>
            <Padder scale={1} />
          </View>
        ) : null}
        <Divider />
        <Padder scale={1} />
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <Subheading>Curator's Fee</Subheading>
            <Paragraph>{formatBalance(bountyData.bounty.fee)}</Paragraph>
          </View>
          <View style={styles.sectionItem}>
            <Subheading>Curator's Deposit</Subheading>
            <Text>{formatBalance(bountyData.bounty.curatorDeposit)}</Text>
          </View>
        </View>
        <Padder scale={1} />
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <Subheading>Bond</Subheading>
            <Text>{formatBalance(bountyData.bounty.bond)}</Text>
          </View>
          <View style={styles.sectionItem}>
            <View>
              {blocksUntilPayout && unlockAt ? (
                <View>
                  <Subheading>Payout at</Subheading>
                  <Text>{untilPayoutTime}</Text>
                </View>
              ) : null}
            </View>
            <View>
              {blocksUntilUpdate && updateDue ? (
                <View>
                  <Subheading>Update at</Subheading>
                  <Text>{untilUpdateTime}</Text>
                </View>
              ) : null}
            </View>
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
