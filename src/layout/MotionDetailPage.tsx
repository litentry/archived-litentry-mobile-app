import React, {useRef, useContext} from 'react';
import _ from 'lodash';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {mapMotionDetail} from 'src/hoc/withMotionDetail';
import {Text, Layout, Card, Icon} from '@ui-kitten/components';
import globalStyles, {
  standardPadding,
  monofontFamily,
  colorGreen,
  colorRed,
} from 'src/styles';
import Padder from 'presentational/Padder';
import AddressInlineTeaser from './AddressInlineTeaser';
import Badge from 'presentational/Badge';
import {AccountId} from '@polkadot/types/interfaces';
import WebView from 'react-native-webview';
import {Modalize} from 'react-native-modalize';
import {ScrollView} from 'react-native-gesture-handler';
import {buildMotionDetailUrl} from 'src/service/Polkasembly';
import {NetworkContext} from 'context/NetworkContext';
import StatInfoBlock from 'presentational/StatInfoBlock';

const {height} = Dimensions.get('window');

type PropTypes = {
  motion: ReturnType<typeof mapMotionDetail> | null;
};

function VoteItem({
  vote,
  type = 'aye',
  emptyText,
}: {
  vote?: AccountId;
  type?: 'aye' | 'nay';
  emptyText?: string;
}) {
  return (
    <View style={[globalStyles.rowContainer, globalStyles.rowAlignCenter]}>
      <Icon
        pack="ionic"
        name={type === 'aye' ? 'thumbs-up-outline' : 'thumbs-down-outline'}
        style={[
          globalStyles.icon,
          {color: type === 'aye' ? colorGreen : colorRed},
        ]}
      />
      <Padder scale={1} />
      {emptyText ? (
        <Text>{emptyText}</Text>
      ) : (
        vote && <AddressInlineTeaser address={vote.toString()} />
      )}
    </View>
  );
}

function MotionDetailPage(props: PropTypes) {
  const {motion} = props;
  const modalRef = useRef<Modalize>(null);
  const {currentNetwork} = useContext(NetworkContext);

  if (!motion) {
    return null;
  }

  return (
    <>
      <ScrollView style={[globalStyles.paddedContainer, styles.container]}>
        <View>
          <Layout style={styles.rowContainer}>
            <Card style={[styles.item, styles.left]}>
              <View style={globalStyles.spaceBetweenRowContainer}>
                <StatInfoBlock title="#ID">
                  {String(motion.proposalId)}
                </StatInfoBlock>
                <StatInfoBlock title="#Detail">
                  <TouchableOpacity onPress={() => modalRef.current?.open()}>
                    <View
                      style={[
                        globalStyles.rowContainer,
                        globalStyles.rowAlignCenter,
                      ]}>
                      <Text
                        style={[
                          styles.stats,
                          styles.small,
                          styles.hackPolkassemblyTextWidth,
                        ]}
                        numberOfLines={1}>
                        on Polkassembly
                      </Text>
                      <Padder scale={0.3} />
                      <Icon
                        pack="ionic"
                        name="share-outline"
                        style={globalStyles.icon}
                      />
                    </View>
                  </TouchableOpacity>
                </StatInfoBlock>
                <StatInfoBlock title="Status">
                  <Padder scale={0.3} />
                  <Badge text={motion.status.toUpperCase()} />
                </StatInfoBlock>
              </View>
              <Padder scale={1} />
              <StatInfoBlock title="Proposer">
                <AddressInlineTeaser address={motion.proposerAddress} />
              </StatInfoBlock>
            </Card>
          </Layout>
        </View>
        <Padder scale={0.3} />
        <View>
          <Layout style={styles.rowContainer}>
            <Card style={[styles.item, styles.left]} disabled>
              <StatInfoBlock title="#Section">
                {_.capitalize(motion.section)}
              </StatInfoBlock>
              <Padder scale={0.5} />
              <StatInfoBlock title="#Method">{motion.methodName}</StatInfoBlock>
            </Card>
            <Card style={[styles.item, styles.right]} disabled>
              <View>
                <Text category="c1">Votes</Text>
                <Padder scale={0.5} />
                <View>
                  <Text style={globalStyles.aye}>
                    Aye ({motion.votes?.ayes.length}/
                    {motion.votes?.threshold.toNumber()})
                  </Text>
                  <Padder scale={0.5} />
                  <Text style={globalStyles.nay}>
                    Nay ({motion.votes?.nays.length}/
                    {motion.votes?.threshold.toNumber()})
                  </Text>
                  <Padder scale={0.5} />
                </View>
              </View>
            </Card>
          </Layout>
        </View>
        {motion.votes ? (
          <View style={styles.votesContainer}>
            <Text category="h6">Votes</Text>
            {motion.votes.ayes.length ? (
              motion.votes.ayes.map((vote) => (
                <VoteItem key={vote.toString()} vote={vote} type="aye" />
              ))
            ) : (
              <>
                <Padder scale={0.5} />
                <VoteItem emptyText='No one voted "Aye" yet.' type="aye" />
              </>
            )}
            {motion.votes.nays.length ? (
              motion.votes.nays.map((vote) => (
                <VoteItem key={vote.toString()} vote={vote} type="nay" />
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
            uri: buildMotionDetailUrl(
              motion.proposalId,
              currentNetwork?.key || 'polkadot',
            ),
          }}
          style={{height: height * 0.6}}
          onMessage={() => null}
        />
      </Modalize>
    </>
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
  hackPolkassemblyTextWidth: {
    width: 70,
  },
});

export default MotionDetailPage;
