import React, {useReducer, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';
import {Button, Card, Icon, Layout, Modal, Text} from '@ui-kitten/components';
import {useApi} from 'context/ChainApiContext';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import {EmptyView} from 'presentational/EmptyView';
import LoadingView from 'presentational/LoadingView';
import {Padder} from 'src/packages/base_components';
import {ProposalInfo} from 'presentational/ProposalInfo';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {SelectAccount} from 'presentational/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {referendumScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';
import {useAccounts} from 'context/AccountsContext';

export function DemocracyProposalScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const {networkAccounts} = useAccounts();
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

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <ScrollView style={styles.container}>
          <View style={styles.row}>
            <Text category="h3" style={styles.index}>
              {route.params.index}
            </Text>
            {proposal ? (
              <View style={globalStyles.paddedContainer}>
                <Text category={'c1'}>{`${section}.${method}`}</Text>
                <ProposalInfo proposal={proposal} />
              </View>
            ) : (
              <View style={globalStyles.paddedContainer}>
                <Text appearance={'hint'}>Preimage</Text>
                <Text category={'c1'} numberOfLines={1} ellipsizeMode="middle">
                  {String(activeProposal?.imageHash)}
                </Text>
              </View>
            )}
          </View>
          <Padder scale={1} />
          <Text appearance={'hint'}>Proposal Hash:</Text>
          <Text category={'c1'}>{String(proposal?.hash)}</Text>

          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.listLeft}>
              <Text appearance={'hint'}>Proposer:</Text>
            </View>
            <View style={styles.listRight}>
              <AddressInlineTeaser address={activeProposal.proposer.toString()} />
            </View>
          </View>

          <Padder scale={2} />

          {activeProposal.balance ? (
            <View style={styles.row}>
              <View style={styles.listLeft}>
                <Text appearance={'hint'}>Locked:</Text>
              </View>
              <View style={styles.listRight}>
                <Text>{formatBalance(activeProposal.balance)}</Text>
              </View>
            </View>
          ) : undefined}

          <Padder scale={2} />

          <View style={styles.row}>
            <View style={styles.listLeft}>
              <Text appearance={'hint'}>Seconds:</Text>
            </View>
            <View style={styles.listRight}>
              <TouchableOpacity
                style={[styles.row, globalStyles.rowAlignCenter]}
                onPress={() => {
                  setSecondsOpen(!secondsOpen);
                }}>
                <Text>{activeProposal.seconds.length}</Text>

                <Icon
                  name={secondsOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
                  style={globalStyles.icon25}
                  fill="grey"
                />
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
          <Button status="basic" onPress={() => dispatch({type: 'OPEN'})}>
            Second
          </Button>
          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.infoIcon}>
              <Icon fill="grey" name="info-outline" style={globalStyles.icon} />
            </View>
            <View style={globalStyles.flex}>
              <Text category="c1">
                The proposal is in the queue for future referendums. One proposal from this list will move forward to
                voting.
              </Text>
              <Padder scale={0.5} />
              <Text category="c1">Seconding a proposal that indicates your backing for the proposal.</Text>
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={state.open}
          backdropStyle={globalStyles.backdrop}
          onBackdropPress={() => dispatch({type: 'RESET'})}>
          <Card disabled={true} style={styles.modalCard}>
            <Text>Vote with account</Text>
            <Padder scale={0.5} />
            <SelectAccount
              accounts={networkAccounts}
              selected={state.account}
              onSelect={(account) => {
                dispatch({type: 'SELECT_ACCOUNT', payload: account});
              }}
            />
            <Padder scale={1.5} />

            <Text>Deposit required:</Text>
            <Padder scale={0.5} />
            <Text>
              {api &&
                formatBalance(activeProposal.balance ? activeProposal.balance : api.consts.democracy.minimumDeposit)}
            </Text>
            <Padder scale={0.5} />

            <View style={[styles.row, globalStyles.centeredContainer]}>
              <Button onPress={() => dispatch({type: 'RESET'})} appearance="ghost" status="basic">
                CANCEL
              </Button>
              <Padder scale={1} />
              <Button
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
          </Card>
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
