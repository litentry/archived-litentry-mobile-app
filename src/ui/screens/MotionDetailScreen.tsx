import {default as React, useContext, useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AccountId} from '@polkadot/types/interfaces';
import {RouteProp} from '@react-navigation/native';
import {Card, Icon, Caption, Subheading, Paragraph, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {NetworkContext} from 'context/NetworkContext';
import AddressInlineTeaser from '@ui/components/AddressInlineTeaser';
import _ from 'lodash';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import WebView from 'react-native-webview';
import {useCouncilMembers} from 'src/api/hooks/useCouncilMembers';
import {useMotionDetail} from 'src/api/hooks/useMotionDetail';
import {useVotingStatus} from 'src/api/hooks/useVotingStatus';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {buildMotionDetailUrl} from 'src/service/Polkasembly';
import globalStyles, {colorGreen, colorRed, standardPadding} from '@ui/styles';

const {height} = Dimensions.get('window');

type PropTypes = {
  route: RouteProp<DashboardStackParamList, 'Motion'>;
};

function VoteItem({vote, type = 'aye', emptyText}: {vote?: AccountId; type?: 'aye' | 'nay'; emptyText?: string}) {
  return (
    <View style={globalStyles.rowAlignCenter}>
      <Icon
        name={type === 'aye' ? 'thumb-up-outline' : 'thumb-down-outline'}
        color={type === 'aye' ? colorGreen : colorRed}
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
  const {status} = useVotingStatus(motion?.votes, membersCount, 'council');

  if (!motion) {
    return <LoadingView />;
  }

  const proposer = motion.votes?.ayes[0];

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={[globalStyles.paddedContainer, styles.container]}>
        <Card>
          <Card.Content>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="ID">{String(motion.votes?.index)}</StatInfoBlock>
              <StatInfoBlock title="Detail">
                {['kusama', 'polkadot'].includes(currentNetwork.key) ? (
                  <TouchableOpacity onPress={() => modalRef.current?.open()}>
                    <View style={globalStyles.rowAlignCenter}>
                      <Caption numberOfLines={1}>on Polkassembly</Caption>
                      <Padder scale={0.3} />
                      <Icon name="share-outline" size={20} />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </StatInfoBlock>
              <StatInfoBlock title="Status">
                <Paragraph style={{color: colorGreen}}>{status}</Paragraph>
              </StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Proposer">
              {proposer && <AddressInlineTeaser address={proposer.toString()} />}
            </StatInfoBlock>
          </Card.Content>
        </Card>
        <Padder scale={0.3} />
        <View style={globalStyles.spaceBetweenRowContainer}>
          <Card style={[styles.item, styles.left]}>
            <Card.Content>
              <StatInfoBlock title="Section">{_.capitalize(motion.proposal.section)}</StatInfoBlock>
              <Padder scale={0.5} />
              <StatInfoBlock title="Method">{motion.proposal.method}</StatInfoBlock>
            </Card.Content>
          </Card>
          <Card style={[styles.item, styles.right]}>
            <Card.Content>
              <View>
                <Caption>Votes</Caption>
                <Subheading style={globalStyles.aye}>
                  {`Aye (${motion.votes?.ayes.length}/${motion.votes?.threshold.toNumber()})`}
                </Subheading>
                <Subheading style={globalStyles.nay}>
                  {`Nay (${motion.votes?.nays.length}/${motion.votes?.threshold.toNumber()})`}
                </Subheading>
              </View>
            </Card.Content>
          </Card>
        </View>
        {motion.votes ? (
          <View style={styles.votesContainer}>
            <Subheading>Votes</Subheading>
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
        <Layout>
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
        </Layout>
      </Modalize>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
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
});
