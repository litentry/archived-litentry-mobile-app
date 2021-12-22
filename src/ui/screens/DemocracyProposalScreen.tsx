import React, {useReducer, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';
import {useApi} from 'context/ChainApiContext';
import AddressInlineTeaser from '@ui/components/AddressInlineTeaser';
import {EmptyView} from '@ui/components/EmptyView';
import LoadingView from '@ui/components/LoadingView';
import {Padder} from '@ui/components/Padder';
import {ProposalInfo} from '@ui/components/ProposalInfo';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {referendumScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Button, Caption, Headline, Icon, List, Modal, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';

export function DemocracyProposalScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const startTx = useApiTx();
  const {api} = useApi();

  const [secondsOpen, setSecondsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const formatBalance = useFormatBalance();
  const {data, isLoading} = useDemocracy();
  if (isLoading) {
    return <LoadingView />;
  }
  const activeProposal = data?.activeProposals.find((p) => String(p.index) === route.params.index);
  if (!activeProposal) {
    return <EmptyView />;
  }

  const proposal = activeProposal.image?.proposal;
  const {method, section} = proposal?.registry.findMetaCall(proposal.callIndex) ?? {};
  const title = proposal ? `${method}.${section}` : `preimage`;

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <ScrollView contentContainerStyle={styles.container}>
          <List.Item title={title} disabled left={() => <Headline>{route.params.index}</Headline>} />
          {proposal ? (
            <ProposalInfo proposal={proposal} />
          ) : (
            <View>
              <Caption>Preimage:</Caption>
              <Text numberOfLines={1} ellipsizeMode="middle">
                {String(activeProposal?.imageHash)}
              </Text>
            </View>
          )}
          <Padder scale={3} />
          <Caption>Proposal Hash:</Caption>
          <Text>{String(proposal?.hash)}</Text>

          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.listLeft}>
              <Caption>Proposer:</Caption>
            </View>
            <View style={styles.listRight}>
              <AddressInlineTeaser address={activeProposal.proposer.toString()} />
            </View>
          </View>

          <Padder scale={2} />

          {activeProposal.balance ? (
            <View style={styles.row}>
              <View style={styles.listLeft}>
                <Caption>Locked:</Caption>
              </View>
              <View style={styles.listRight}>
                <Text>{formatBalance(activeProposal.balance)}</Text>
              </View>
            </View>
          ) : undefined}

          <Padder scale={2} />

          <View style={styles.row}>
            <View style={styles.listLeft}>
              <Caption>Seconds:</Caption>
            </View>
            <View style={styles.listRight}>
              <TouchableOpacity
                style={[styles.row, globalStyles.rowAlignCenter]}
                onPress={() => {
                  setSecondsOpen(!secondsOpen);
                }}>
                <Text>{activeProposal.seconds.length}</Text>

                <Icon name={secondsOpen ? 'chevron-up' : 'chevron-down'} size={25} color="grey" />
              </TouchableOpacity>

              {secondsOpen && (
                <>
                  <Padder scale={0.5} />
                  {activeProposal.seconds.map((account) => (
                    <View key={String(account)}>
                      <AddressInlineTeaser address={String(account)} />
                      <Padder scale={0.5} />
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
          <Padder scale={2} />
          <Button mode="outlined" onPress={() => dispatch({type: 'OPEN'})}>
            Second
          </Button>
          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.infoIcon}>
              <Icon color="grey" name="information-outline" size={25} />
            </View>
            <View style={globalStyles.flex}>
              <Caption>
                The proposal is in the queue for future referendums. One proposal from this list will move forward to
                voting.
              </Caption>
              <Padder scale={0.5} />
              <Caption>Seconding a proposal that indicates your backing for the proposal.</Caption>
            </View>
          </View>
        </ScrollView>

        <Modal visible={state.open} onDismiss={() => dispatch({type: 'RESET'})}>
          <Text>Vote with account</Text>
          <Padder scale={0.5} />
          <SelectAccount
            onSelect={(account) => {
              dispatch({type: 'SELECT_ACCOUNT', payload: account.address});
            }}
          />
          <Padder scale={1.5} />

          <Text>Deposit required:</Text>
          <Padder scale={0.5} />
          <Text>
            {api &&
              formatBalance(activeProposal.balance ? activeProposal.balance : api.consts.democracy.minimumDeposit)}
          </Text>
          <Padder scale={1.5} />

          <View style={globalStyles.spaceBetweenRowContainer}>
            <Button onPress={() => dispatch({type: 'RESET'})} mode="outlined">
              CANCEL
            </Button>
            <Padder scale={1} />
            <Button
              mode="outlined"
              disabled={!state.account}
              onPress={() => {
                if (state.account) {
                  startTx({
                    address: state.account,
                    txMethod: 'democracy.second',
                    params:
                      api?.tx.democracy.second.meta.args.length === 2
                        ? [activeProposal.index, activeProposal.seconds.length]
                        : [activeProposal.index],
                  });
                  dispatch({type: 'RESET'});
                }
              }}>
              Second
            </Button>
          </View>
        </Modal>
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {padding: standardPadding * 2},
  index: {paddingTop: standardPadding, paddingLeft: standardPadding},
  row: {flexDirection: 'row'},
  listLeft: {width: '30%'},
  listRight: {flex: 1},
  modalCard: {width: 300},
  infoIcon: {paddingRight: standardPadding, paddingLeft: standardPadding},
});

const initialState: State = {open: false};

type State = {open: boolean; account?: string};
type Action = {type: 'RESET'} | {type: 'SELECT_ACCOUNT'; payload: string} | {type: 'OPEN'} | {type: 'CLOSE'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'SELECT_ACCOUNT':
      return {...state, account: action.payload};

    case 'OPEN':
      return {...state, open: true};

    case 'CLOSE':
      return {...state, open: false};

    default:
      return state;
  }
}
