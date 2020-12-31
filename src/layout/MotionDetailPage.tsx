import React from 'react';
import * as _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import {mapMotionDetail} from 'src/hoc/withMotionDetail';
import {Button, Text, Layout, Card, Icon} from '@ui-kitten/components';
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

type PropTypes = {
  motion: ReturnType<typeof mapMotionDetail> | null;
  onDismiss: () => void;
};

function VoteItem({
  vote,
  type = 'aye',
  emptyText,
}: {
  vote?: AccountId;
  type?: 'aye' | 'nye';
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
  const {motion, onDismiss} = props;

  if (!motion) {
    return null;
  }

  return (
    <>
      <View style={[globalStyles.paddedContainer, styles.container]}>
        <Text category="h4" style={styles.header}>
          Motion #{motion.proposalId}
        </Text>
        <View>
          <Layout style={styles.rowContainer}>
            <Card style={[styles.item, styles.left]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text category="c1">#ID</Text>
                  <Text style={styles.stats}>{motion.proposalId}</Text>
                </View>
                <View>
                  <Text category="c1">#Detail</Text>
                  <View
                    style={[
                      globalStyles.rowContainer,
                      globalStyles.rowAlignCenter,
                    ]}>
                    <Text style={styles.stats}>Polkassembly</Text>
                    <Padder scale={0.3} />
                    <Icon
                      pack="ionic"
                      name="share-outline"
                      style={globalStyles.icon}
                    />
                  </View>
                </View>
                <View>
                  <Text category="c1">Status</Text>
                  <Padder scale={0.3} />
                  <Badge text={motion.status.toUpperCase()} />
                </View>
              </View>
              <Padder scale={1} />
              <Text category="c1">Proposer</Text>
              <AddressInlineTeaser address={motion.proposerAddress} />
            </Card>
          </Layout>
        </View>
        <Padder scale={0.3} />
        <View>
          <Layout style={styles.rowContainer}>
            <Card style={[styles.item, styles.left]}>
              <View>
                <Text category="c1">#Section</Text>
                <Text style={[styles.stats, {textAlign: 'left'}]}>
                  {_.capitalize(motion.section)}
                </Text>
              </View>
              <Padder scale={0.5} />
              <View>
                <Text category="c1">#Method</Text>
                <View
                  style={[
                    globalStyles.rowContainer,
                    globalStyles.rowAlignCenter,
                  ]}>
                  <Text style={styles.stats} numberOfLines={1}>
                    {motion.methodName}
                  </Text>
                </View>
              </View>
            </Card>
            <Card style={[styles.item, styles.right]}>
              <View>
                <Text category="c1">Votes</Text>
                <Padder scale={0.5} />
                <View>
                  <Text style={globalStyles.aye}>
                    Aye ({motion.votes?.ayes.length}/
                    {motion.votes?.threshold.toNumber()})
                  </Text>
                  <Padder scale={0.5} />
                  <Text style={globalStyles.nye}>
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
                <VoteItem key={vote.toString()} vote={vote} type="nye" />
              ))
            ) : (
              <>
                <Padder scale={0.5} />
                <VoteItem emptyText='No one voted "Nye" yet.' type="nye" />
              </>
            )}
          </View>
        ) : null}
      </View>
      <Button appearance="ghost" style={styles.btn} onPress={onDismiss}>
        Dismiss
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {paddingBottom: standardPadding * 2},
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
  btn: {
    margin: standardPadding,
  },
});

export default MotionDetailPage;
