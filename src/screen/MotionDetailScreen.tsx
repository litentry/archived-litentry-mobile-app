import {AccountId} from '@polkadot/types/interfaces';
import {RouteProp} from '@react-navigation/native';
import {Card, Icon, Text} from '@ui-kitten/components';
import {NetworkContext} from 'context/NetworkContext';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import _ from 'lodash';
import Badge from 'presentational/Badge';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import StatInfoBlock from 'presentational/StatInfoBlock';
import {default as React, useContext, useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import WebView from 'react-native-webview';
import {useCouncilMembers} from 'src/api/hooks/useCouncilMembers';
import {useMotionDetail} from 'src/api/hooks/useMotionDetail';
import {useVotingStatus} from 'src/api/hooks/useVotingStatus';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {buildMotionDetailUrl} from 'src/service/Polkasembly';
import globalStyles, {colorGreen, colorRed, monofontFamily, standardPadding} from 'src/styles';

const {height} = Dimensions.get('window');

type PropTypes = {
  route: RouteProp<DashboardStackParamList, 'Motion'>;
};

function VoteItem({vote, type = 'aye', emptyText}: {vote?: AccountId; type?: 'aye' | 'nay'; emptyText?: string}) {
  return (
    <View style={[globalStyles.rowContainer, globalStyles.rowAlignCenter]}>
      <Icon
        pack="ionic"
        name={type === 'aye' ? 'thumbs-up-outline' : 'thumbs-down-outline'}
        style={[globalStyles.icon, {color: type === 'aye' ? colorGreen : colorRed}]}
      />
      <Padder scale={1} />
      {emptyText ? <Text>{emptyText}</Text> : vote && <AddressInlineTeaser address={vote.toString()} />}
    </View>
  );
}

export function MotionDetailScreen(props: PropTypes) {
  const modalRef = useRef<Modalize>(null);
  const {currentNetwork} = useContext(NetworkContext);

  const {
    route: {params},
  } = props;

  const {data: motion} = useMotionDetail(params);

  const {data} = useCouncilMembers();
  const membersCount = data?.members.length ?? 0;
  const {isCloseable, isVoteable, hasFailed, hasPassed} = useVotingStatus(motion?.votes, membersCount, 'council');

  const status = isCloseable
    ? 'Closable'
    : isVoteable
    ? 'Voteable'
    : hasFailed
    ? 'Closed'
    : hasPassed
    ? 'Passed'
    : 'Open';

  if (!motion) {
    return <LoadingView />;
  }

  const proposer = motion.votes?.ayes[0];

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={[globalStyles.paddedContainer, styles.container]}>
        <View style={styles.rowContainer}>
          <Card style={[styles.item, styles.left]} disabled>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="#ID">{String(motion.votes?.index)}</StatInfoBlock>
              <StatInfoBlock title="#Detail">
                {['kusama', 'polkadot'].includes(currentNetwork.key) ? (
                  <TouchableOpacity onPress={() => modalRef.current?.open()}>
                    <View style={[globalStyles.rowContainer, globalStyles.rowAlignCenter]}>
                      <Text style={[styles.stats, styles.small, styles.hackPolkassemblyTextWidth]} numberOfLines={1}>
                        on Polkassembly
                      </Text>
                      <Padder scale={0.3} />
                      <Icon pack="ionic" name="share-outline" style={globalStyles.icon} />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </StatInfoBlock>
              <StatInfoBlock title="Status">
                <Padder scale={0.3} />
                <Badge text={status} />
              </StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Proposer">
              {proposer && <AddressInlineTeaser address={proposer.toString()} />}
            </StatInfoBlock>
          </Card>
        </View>
        <Padder scale={0.3} />
        <View style={styles.rowContainer}>
          <Card style={[styles.item, styles.left]} disabled>
            <StatInfoBlock title="#Section">{_.capitalize(motion.proposal.section)}</StatInfoBlock>
            <Padder scale={0.5} />
            <StatInfoBlock title="#Method">{motion.proposal.method}</StatInfoBlock>
          </Card>
          <Card style={[styles.item, styles.right]} disabled>
            <View>
              <Text category="c1">Votes</Text>
              <Padder scale={0.5} />
              <View>
                <Text style={globalStyles.aye}>
                  {`Aye (${motion.votes?.ayes.length}/${motion.votes?.threshold.toNumber()})`}
                </Text>
                <Padder scale={0.5} />
                <Text style={globalStyles.nay}>
                  {`Nay (${motion.votes?.nays.length}/${motion.votes?.threshold.toNumber()})`}
                </Text>
                <Padder scale={0.5} />
              </View>
            </View>
          </Card>
        </View>
        {motion.votes ? (
          <View style={styles.votesContainer}>
            <Text category="h6">Votes</Text>
            {motion.votes.ayes.length ? (
              motion.votes.ayes.map((vote) => (
                <View style={styles.voteContainer} key={String(vote.hash)}>
                  <VoteItem key={vote.toString()} vote={vote} type="aye" />
                </View>
              ))
            ) : (
              <>
                <Padder scale={0.5} />
                <VoteItem emptyText='No one voted "Aye" yet.' type="aye" />
              </>
            )}
            {motion.votes.nays.length ? (
              motion.votes.nays.map((vote) => (
                <View style={styles.voteContainer} key={String(vote.hash)}>
                  <VoteItem key={vote.toString()} vote={vote} type="nay" />
                </View>
              ))
            ) : (
              <>
                <Padder scale={0.5} />
                <VoteItem emptyText='No one voted "Nay" yet.' type="nay" />
              </>
            )}
          </View>
        ) : null}
      </ScrollView>
      <Modalize
        ref={modalRef}
        threshold={250}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        adjustToContentHeight
        handlePosition="outside"
        closeOnOverlayTap
        withReactModal
        useNativeDriver
        panGestureEnabled>
        <WebView
          injectedJavaScript={`(function() {
                // remove some html element
                document.getElementById('menubar').remove();
                var footer = document.getElementsByTagName('footer');
                Array.prototype.forEach.call(footer, el => el.remove());
            })();`}
          source={{
            uri: buildMotionDetailUrl(motion.votes?.index.toNumber() ?? 0, currentNetwork?.key || 'polkadot'),
          }}
          style={{height: height * 0.6}}
          onMessage={() => null}
        />
      </Modalize>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  small: {fontSize: 10},
  stats: {
    textAlign: 'center',
    paddingVertical: standardPadding,
    fontSize: 16,
    color: '#ccc',
    fontFamily: monofontFamily,
  },
  item: {
    flex: 1,
  },
  left: {
    marginRight: 2,
  },
  right: {
    marginLeft: 2,
  },
  votesContainer: {
    marginTop: standardPadding * 2,
  },
  voteContainer: {
    paddingVertical: standardPadding / 2,
  },
  hackPolkassemblyTextWidth: {
    width: 70,
  },
});
