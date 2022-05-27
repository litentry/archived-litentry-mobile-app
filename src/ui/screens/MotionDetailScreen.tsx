import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Card, Icon, Caption, Subheading, Paragraph, useBottomSheet} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {useNetwork} from 'context/NetworkContext';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {ScrollView} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import {useMotionDetail} from 'src/api/hooks/useMotionDetail';
import {AppStackParamList, DashboardStackParamList} from '@ui/navigation/navigation';
import {buildMotionDetailUrl} from 'src/service/Polkasembly';
import globalStyles, {colorGreen, colorRed, standardPadding} from '@ui/styles';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {accountScreen} from '@ui/navigation/routeKeys';

const {height} = Dimensions.get('window');

type PropTypes = {
  route: RouteProp<DashboardStackParamList, 'Motion'>;
  navigation: StackNavigationProp<AppStackParamList>;
};

type VoteItemProps = {
  type: 'aye' | 'nay';
  children?: React.ReactNode;
};

function VoteItem({type, children}: VoteItemProps) {
  return (
    <View style={globalStyles.rowAlignCenter}>
      <Icon
        name={type === 'aye' ? 'thumb-up-outline' : 'thumb-down-outline'}
        color={type === 'aye' ? colorGreen : colorRed}
      />
      <Padder scale={1} />
      {children}
    </View>
  );
}

export function MotionDetailScreen({route, navigation}: PropTypes) {
  const {openBottomSheet, BottomSheet} = useBottomSheet();
  const {currentNetwork} = useNetwork();
  const {data: motion, loading} = useMotionDetail(route.params.hash);

  if (loading && !motion) {
    return <LoadingView />;
  }

  if (!motion) {
    return null;
  }

  const {proposal, votes, votingStatus} = motion;

  const toAccountDetails = (address?: string) => () => {
    if (address) {
      navigation.navigate(accountScreen, {address});
    }
  };

  return (
    <SafeView edges={noTopEdges}>
      <ScrollView style={[globalStyles.paddedContainer, styles.container]}>
        <Card>
          <Card.Content>
            <View style={globalStyles.spaceBetweenRowContainer}>
              <StatInfoBlock title="ID">{motion?.proposal.index || ''}</StatInfoBlock>
              <StatInfoBlock title="Detail">
                {['kusama', 'polkadot'].includes(currentNetwork.key) ? (
                  <TouchableOpacity onPress={openBottomSheet}>
                    <View style={globalStyles.rowAlignCenter}>
                      <Caption numberOfLines={1}>on Polkassembly</Caption>
                      <Padder scale={0.3} />
                      <Icon name="share-outline" size={20} />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </StatInfoBlock>
              <StatInfoBlock title="Status">
                <Paragraph style={{color: colorGreen}}>{votingStatus?.status}</Paragraph>
              </StatInfoBlock>
            </View>
            <Padder scale={1} />
            <StatInfoBlock title="Proposer">
              {proposal.proposer && (
                <AccountTeaser
                  account={proposal.proposer.account}
                  onPress={toAccountDetails(proposal.proposer?.account.address)}
                />
              )}
            </StatInfoBlock>
          </Card.Content>
        </Card>
        <Padder scale={0.3} />
        <View style={globalStyles.spaceBetweenRowContainer}>
          <Card style={[styles.item, styles.left]}>
            <Card.Content>
              <StatInfoBlock title="Section">
                {<Caption style={styles.textCapitalize}>{proposal.section}</Caption>}
              </StatInfoBlock>
              <Padder scale={0.5} />
              <StatInfoBlock title="Method">{proposal.method}</StatInfoBlock>
            </Card.Content>
          </Card>
          <Card style={[styles.item, styles.right]}>
            <Card.Content>
              <View>
                <Caption>Votes</Caption>
                <Subheading style={globalStyles.aye}>
                  {`Aye (${votes?.ayes?.length}/${motion?.votes?.threshold})`}
                </Subheading>
                <Subheading style={globalStyles.nay}>
                  {`Nay (${votes?.nays?.length}/${motion?.votes?.threshold})`}
                </Subheading>
              </View>
            </Card.Content>
          </Card>
        </View>
        {motion?.votes ? (
          <View style={styles.votesContainer}>
            <Subheading>Votes</Subheading>
            {votes?.ayes?.length ? (
              votes.ayes.map((vote) => (
                <View style={styles.voteContainer} key={vote.account.address}>
                  <VoteItem type="aye">
                    <AccountTeaser account={vote.account} onPress={toAccountDetails(vote.account.address)} />
                  </VoteItem>
                </View>
              ))
            ) : (
              <>
                <Padder scale={0.5} />
                <VoteItem type="aye">
                  <Paragraph>{`No one voted "Aye" yet.`}</Paragraph>
                </VoteItem>
              </>
            )}
            {votes?.nays?.length ? (
              votes.nays.map((vote) => (
                <View style={styles.voteContainer} key={vote.account.address}>
                  <VoteItem type="nay">
                    <AccountTeaser account={vote.account} onPress={toAccountDetails(vote.account.address)} />
                  </VoteItem>
                </View>
              ))
            ) : (
              <>
                <Padder scale={0.5} />
                <VoteItem type="nay">
                  <Paragraph>{`No one voted "Nay" yet.`}</Paragraph>
                </VoteItem>
              </>
            )}
          </View>
        ) : null}
      </ScrollView>
      <BottomSheet>
        <Layout>
          <WebView
            injectedJavaScript={`(function() {
                // remove some html element
                document.getElementById('menubar').remove();
                document.getElementsByClassName('sidebar-parent')[0].parentElement.remove();
                var footer = document.getElementsByTagName('footer');
                Array.prototype.forEach.call(footer, el => el.remove());
            })();`}
            source={{
              uri: buildMotionDetailUrl(Number(motion?.proposal?.index) ?? 0, currentNetwork?.key || 'polkadot'),
            }}
            style={{height: height * 0.6}}
            onMessage={() => null}
          />
        </Layout>
      </BottomSheet>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  textCapitalize: {
    textTransform: 'capitalize',
  },
});
