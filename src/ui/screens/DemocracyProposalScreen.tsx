import React, {useReducer, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';
import {useApi} from 'context/ChainApiContext';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {democracyProposalScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Button, Caption, Headline, Icon, List, Modal, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {ProposalCall} from '@ui/components/ProposalCall';
import {Account} from 'src/api/hooks/useAccount';

export function DemocracyProposalScreen({
  route,
}: {
  route: RouteProp<DashboardStackParamList, typeof democracyProposalScreen>;
}) {
  const startTx = useApiTx();
  const {api} = useApi();

  const [secondsOpen, setSecondsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const proposal = route.params.proposal;
  const title = `${proposal.method}.${proposal.section}`;

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <ScrollView contentContainerStyle={styles.container}>
          <List.Item title={title} disabled left={() => <Headline>{proposal.index}</Headline>} />
          <ProposalCall proposal={proposal} />
          <Padder scale={1} />

          <Caption>{`Proposal Hash:`}</Caption>
          <Text selectable>{proposal.hash}</Text>

          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.listLeft}>
              <Caption>{`Proposer:`}</Caption>
            </View>
            <View style={styles.listRight}>
              <AccountTeaser account={proposal.proposer.account} />
            </View>
          </View>

          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.listLeft}>
              <Caption>{`Locked:`}</Caption>
            </View>
            <View style={styles.listRight}>
              <Text>{proposal.formattedBalance}</Text>
            </View>
          </View>

          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.listLeft}>
              <Caption>{`Seconds:`}</Caption>
            </View>
            <View style={styles.listRight}>
              <TouchableOpacity
                style={[styles.row, globalStyles.rowAlignCenter]}
                onPress={() => {
                  setSecondsOpen(!secondsOpen);
                }}>
                <Text>{proposal.seconds.length}</Text>
                <Icon name={secondsOpen ? 'chevron-up' : 'chevron-down'} size={25} color="grey" />
              </TouchableOpacity>
              {secondsOpen && (
                <>
                  <Padder scale={0.5} />
                  {proposal.seconds.map((second, index) => (
                    <View key={`${second.address}-${index}`}>
                      <AccountTeaser account={second.account} />
                      <Padder scale={0.5} />
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>

          <Padder scale={2} />
          <Button mode="outlined" onPress={() => dispatch({type: 'OPEN'})}>
            {`Second`}
          </Button>

          <Padder scale={2} />
          <View style={styles.row}>
            <View style={styles.infoIcon}>
              <Icon color="grey" name="information-outline" size={25} />
            </View>
            <View style={globalStyles.flex}>
              <Caption>
                {`The proposal is in the queue for future referendums. One proposal from this list will move forward to
                voting.`}
              </Caption>
              <Padder scale={0.5} />
              <Caption>{`Seconding a proposal that indicates your backing for the proposal.`}</Caption>
            </View>
          </View>
        </ScrollView>

        <Modal visible={state.open} onDismiss={() => dispatch({type: 'RESET'})}>
          <Text>{`Vote with account`}</Text>
          <Padder scale={0.5} />
          <SelectAccount
            onSelect={(account) => {
              console.log('selected account ::', account);
              dispatch({type: 'SELECT_ACCOUNT', payload: account.accountInfo});
            }}
          />
          <Padder scale={1.5} />

          <Text>{`Deposit required:`}</Text>
          <Padder scale={0.5} />
          <Text>{proposal.formattedBalance}</Text>
          <Padder scale={1.5} />

          <View style={globalStyles.spaceBetweenRowContainer}>
            <Button onPress={() => dispatch({type: 'RESET'})} mode="outlined">
              {`Cancel`}
            </Button>
            <Padder scale={1} />
            <Button
              mode="outlined"
              disabled={!state.account}
              onPress={() => {
                if (state.account) {
                  startTx({
                    address: state.account.address,
                    txMethod: 'democracy.second',
                    params:
                      api?.tx.democracy.second.meta.args.length === 2
                        ? [proposal.index, proposal.seconds.length]
                        : [proposal.index],
                  });
                  dispatch({type: 'RESET'});
                }
              }}
              testID="second-button">
              {`Second`}
            </Button>
          </View>
        </Modal>
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {padding: standardPadding * 2},
  row: {flexDirection: 'row'},
  listLeft: {width: '30%'},
  listRight: {flex: 1},
  infoIcon: {paddingRight: standardPadding, paddingLeft: standardPadding},
});

const initialState: State = {open: false};

export type State = {open: boolean; account?: Account | undefined};
type Action =
  | {type: 'RESET'}
  | {type: 'SELECT_ACCOUNT'; payload: Account | undefined}
  | {type: 'OPEN'}
  | {type: 'CLOSE'};

export function reducer(state: State, action: Action): State {
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
