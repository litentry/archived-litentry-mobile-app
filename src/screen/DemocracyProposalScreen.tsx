import {RouteProp} from '@react-navigation/native';
import {
  Button,
  Card,
  Divider,
  Icon,
  IndexPath,
  Input,
  Layout,
  Modal,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {useApi} from 'context/ChainApiContext';
import {useTX} from 'context/TxContext';
import AddressInlineTeaser from 'layout/AddressInlineTeaser';
import LoadingView from 'presentational/LoadingView';
import Padder from 'presentational/Padder';
import {ProposalInfo} from 'presentational/ProposalInfo';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {SelectAccount} from 'presentational/SelectAccount';
import React, {useReducer, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useConvictions} from 'src/api/hooks/useConvictions';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {referendumScreen} from 'src/navigation/routeKeys';
import globalStyles, {standardPadding} from 'src/styles';

export function DemocracyProposalScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const {start} = useTX();
  const {api} = useApi();

  const [secondsOpen, setSecondsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const convictions = useConvictions();
  const selectedConviction = state.conviction && convictions[state.conviction.row];
  const convictionDisplayValue = selectedConviction?.text;

  const formatBalance = useFormatBalance();
  const {data} = useDemocracy();
  const activeProposal = data?.activeProposals.find((p) => String(p.index) === route.params.index);
  if (!activeProposal) {
    return <LoadingView />;
  }

  const proposal = activeProposal.image?.proposal;
  const {method, section} = proposal?.registry.findMetaCall(proposal.callIndex) ?? {};

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <Text category={'h5'}>Proposal</Text>
          <Padder scale={0.5} />
          <Divider />
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
        </View>

        <Modal
          visible={state.voting !== undefined}
          backdropStyle={globalStyles.backdrop}
          onBackdropPress={() => dispatch({type: 'RESET'})}>
          <Card disabled={true} style={styles.modalCard}>
            <Text>Vote with account</Text>
            <Padder scale={0.5} />
            <SelectAccount
              selected={state.account}
              onSelect={(account) => {
                dispatch({type: 'SELECT_ACCOUNT', payload: account});
              }}
            />
            <Padder scale={1.5} />

            <Text>Vote Value</Text>
            <Padder scale={0.5} />
            <Input
              placeholder="Place your Text"
              keyboardType="decimal-pad"
              value={state.voteValue}
              onFocus={() => dispatch({type: 'SET_VOTE_VALUE', payload: ''})}
              onChangeText={(nextValue) =>
                dispatch({type: 'SET_VOTE_VALUE', payload: nextValue.replace(/[^(\d+).(\d+)]/g, '')})
              }
            />
            <Text>{api && formatBalance(getBalanceFromString(api, state.voteValue))}</Text>
            <Padder scale={1.5} />

            <Text>Conviction</Text>
            <Padder scale={0.5} />
            <Select
              selectedIndex={state.conviction}
              value={convictionDisplayValue}
              onSelect={(index) => {
                if (!Array.isArray(index)) {
                  dispatch({type: 'SELECT_CONVICTION', payload: index});
                }
              }}>
              {convictions.map((conviction) => {
                return <SelectItem key={conviction.value} title={conviction.text} />;
              })}
            </Select>
            <Padder scale={0.5} />

            <View style={styles.row}>
              <Button
                onPress={() => {
                  dispatch({type: 'RESET'});
                }}
                appearance="ghost"
                status="basic">
                CANCEL
              </Button>
              <Button
                disabled={!state.account || !selectedConviction}
                onPress={() => {
                  if (api && state.account && selectedConviction) {
                    const balance = getBalanceFromString(api, state.voteValue);

                    start({
                      api,
                      address: state.account,
                      txMethod: 'democracy.vote',
                      params: [
                        activeProposal?.index,
                        {
                          Standard: {
                            balance,
                            vote: {aye: state.voting === 'YES' ? true : false, conviction: selectedConviction.value},
                          },
                        },
                      ],
                      title: 'Sending transaction democracy.vote(ref_index, vote)',
                      description:
                        'Vote in a referendum. If vote.is_aye(), the vote is to enact the proposal; otherwise it is a vote to keep the status quo.',
                    });
                    dispatch({type: 'RESET'});
                  }
                }}>{`VOTE ${state.voting}`}</Button>
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
});

const initialState: State = {voteValue: '0.0000'};

type State = {
  voting?: 'YES' | 'NO';
  account?: string;
  voteValue: string;
  conviction?: IndexPath;
};

type Action =
  | {type: 'RESET'}
  | {type: 'CHANGE_VOTING'; payload: 'YES' | 'NO' | undefined}
  | {type: 'SET_VOTE_VALUE'; payload: string}
  | {type: 'SELECT_ACCOUNT'; payload: string}
  | {type: 'SELECT_CONVICTION'; payload: IndexPath};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'CHANGE_VOTING':
      return {...state, voting: action.payload};

    case 'SELECT_CONVICTION':
      return {...state, conviction: action.payload};

    case 'SELECT_ACCOUNT':
      return {...state, account: action.payload};

    case 'SET_VOTE_VALUE':
      return {...state, voteValue: action.payload};

    default:
      return state;
  }
}
