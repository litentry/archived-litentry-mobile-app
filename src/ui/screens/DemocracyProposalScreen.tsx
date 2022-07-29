import React, {useCallback, useReducer, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';
import {Padder} from '@ui/components/Padder';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {democracyProposalScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Button, Caption, Headline, Icon, List, Modal, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {AccountTeaser} from '@ui/components/Account/AccountTeaser';
import {ProposalCall} from '@ui/components/ProposalCall';
import {Account} from 'src/api/hooks/useAccount';
import {useStartTx} from 'context/TxContext';
import {useTx} from '@polkadotApi/useTx';

export function DemocracyProposalScreen({
  route,
}: {
  route: RouteProp<DashboardStackParamList, typeof democracyProposalScreen>;
}) {
  const {startTx} = useStartTx();
  const {getTxMethodArgsLength} = useTx();
  const [endorsedOpen, setEndorsedOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const proposal = route.params.proposal;
  const title = `${proposal.method}.${proposal.section}`;

  const onEndorsePress = useCallback(async () => {
    if (state.account) {
      const method = 'democracy.second';
      const argsLength = await getTxMethodArgsLength(method);
      await startTx({
        address: state.account.address,
        txConfig: {
          method,
          params: argsLength === 2 ? [proposal.index, proposal.seconds.length] : [proposal.index],
        },
      });
      dispatch({type: 'RESET'});
    }
  }, [startTx, proposal, state.account, getTxMethodArgsLength]);

  const ItemLeft = React.useCallback(() => <Headline>{proposal.index}</Headline>, [proposal.index]);

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <ScrollView contentContainerStyle={styles.container}>
          <List.Item title={title} disabled left={ItemLeft} />
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
              <Caption>{`Endorsed:`}</Caption>
            </View>
            <View style={styles.listRight}>
              <TouchableOpacity
                style={[styles.row, globalStyles.rowAlignCenter]}
                onPress={() => {
                  setEndorsedOpen(!endorsedOpen);
                }}>
                <Text>{proposal.seconds.length}</Text>
                <Icon name={endorsedOpen ? 'chevron-up' : 'chevron-down'} size={25} color="grey" />
              </TouchableOpacity>
              {endorsedOpen && (
                <>
                  <Padder scale={0.5} />
                  {proposal.seconds.map((endorsed, index) => (
                    <View key={`${endorsed.address}-${index}`}>
                      <AccountTeaser account={endorsed.account} />
                      <Padder scale={0.5} />
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>

          <Padder scale={2} />
          <Button mode="outlined" onPress={() => dispatch({type: 'OPEN'})}>
            {`Endorse`}
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
              <Caption>{`Endorsing a proposal indicates your backing for the proposal.`}</Caption>
            </View>
          </View>
        </ScrollView>

        <Modal visible={state.open} onDismiss={() => dispatch({type: 'RESET'})}>
          <Text>{`Vote with account`}</Text>
          <Padder scale={0.5} />
          <SelectAccount
            onSelect={(account) => {
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
            <Button mode="outlined" disabled={!state.account} onPress={onEndorsePress}>
              {`Endorse`}
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

type State = {open: boolean; account?: Account | undefined};
type Action =
  | {type: 'RESET'}
  | {type: 'SELECT_ACCOUNT'; payload: Account | undefined}
  | {type: 'OPEN'}
  | {type: 'CLOSE'};

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
