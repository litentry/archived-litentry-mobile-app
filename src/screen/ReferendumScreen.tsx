import React from 'react';
import {Button, Divider, Layout, Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {referendumScreen} from 'src/navigation/routeKeys';
import {useReferenda} from 'src/hook/useReferenda';
import {formatCallMeta} from 'src/packages/call_inspector/CallInspector';
import {BN_ONE} from '@polkadot/util';
import {useBlockTime} from 'src/hook/useBlockTime';
import {useBestNumber} from 'src/hook/useVotingStatus';
import {useFormatBalance} from 'src/hook/useFormatBalance';
import Padder from 'presentational/Padder';

export function ReferendumScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const formatBalance = useFormatBalance();
  const {data} = useReferenda();
  const referendum = data?.find((r) => r.index.toString() === route.params.index);
  const proposal = referendum?.image?.proposal;
  const bestNumber = useBestNumber();
  const remainBlock = bestNumber ? referendum?.status.end.sub(bestNumber).isub(BN_ONE) : undefined;
  const enactBlock = bestNumber ? referendum?.status.end.add(referendum.status.delay).sub(bestNumber) : undefined;
  const {timeStringParts: remainingTime} = useBlockTime(remainBlock);
  const {timeStringParts: activateTime} = useBlockTime(enactBlock);

  if (!proposal) {
    return null;
  }

  const {meta, method, section} = proposal.registry.findMetaCall(proposal.callIndex);

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <Text category={'h5'}>Proposal</Text>
          <Divider />
          <Text appearance={'hint'}>Proposal</Text>
          <Text category={'c1'}>{`${section}.${method}`}</Text>
          <Text category={'c1'}>{`${formatCallMeta(meta)}`}</Text>
          <Text appearance={'hint'}>Has of the proposal</Text>
          <Text category={'c1'} numberOfLines={1}>
            {proposal.hash.toString()}
          </Text>

          <View style={styles.row}>
            <View>
              <Text appearance={'hint'}>Time left to vote</Text>
              <Text category={'c1'} adjustsFontSizeToFit={true} numberOfLines={1}>
                {remainingTime.slice(0, 2).join(' ')}
              </Text>
            </View>
            <View>
              <Text appearance={'hint'}>Time left to activate</Text>
              <Text category={'c1'} adjustsFontSizeToFit={true} numberOfLines={1}>
                {activateTime.slice(0, 2).join(' ')}
              </Text>
            </View>
          </View>

          <Padder scale={2} />
          <Text category={'h5'}>Live Results</Text>
          <Divider />
          <View style={styles.row}>
            <View style={styles.center}>
              <Text category={'h6'} status={'success'}>
                YES
              </Text>
              <Text>{referendum ? formatBalance(referendum.votedAye) : undefined}</Text>
              <Text>{`${referendum?.voteCountAye} participants`}</Text>
            </View>
            <View style={styles.center}>
              <Text category={'h6'} status={'danger'}>
                NO
              </Text>
              <Text>{referendum ? formatBalance(referendum.votedNay) : undefined}</Text>
              <Text>{`${referendum?.voteCountNay} participants`}</Text>
            </View>
          </View>

          <Padder scale={2} />
          <Text category={'h5'}>Vote</Text>
          <Divider />
          <View style={styles.row}>
            <Button>Vote Yes</Button>
            <Button>Vote No</Button>
          </View>
        </View>
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {padding: standardPadding * 2},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: standardPadding * 2},
  center: {alignItems: 'center'},
});
