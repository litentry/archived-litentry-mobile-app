import React, {useReducer} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Button, Divider, Headline, Modal, Select, Subheading, Caption, List, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {ProgressBar} from '@ui/components/ProgressBar';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useConvictions, Conviction} from 'src/api/hooks/useConvictions';
import {getBNFromLocalInputString} from 'src/api/utils/balance';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {referendumScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {ProposalCallInfo} from '@ui/components/ProposalCallInfo';
import BalanceInput from '@ui/components/BalanceInput';
import {Account} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';

export function ReferendumScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const startTx = useApiTx();
  const [state, dispatch] = useReducer(reducer, initialState);
  const referendum = route.params.referendum;
  const convictions = useConvictions();
  const {data: chainInfo} = useChainInfo();

  const title = `${referendum.method}.${referendum.section}`;

  const reset = () => {
    dispatch({type: 'RESET'});
  };

  const voteNo = () => {
    dispatch({type: 'CHANGE_VOTING', payload: 'NO'});
  };

  const voteYes = () => {
    dispatch({type: 'CHANGE_VOTING', payload: 'YES'});
  };

  const vote = () => {
    if (chainInfo && state.account && state.conviction && state.voteValue) {
      const balance = getBNFromLocalInputString(chainInfo.registry, state.voteValue);
      startTx({
        address: state.account.address,
        txMethod: 'democracy.vote',
        params: [
          referendum?.index,
          {
            Standard: {
              balance,
              vote: {aye: state.voting === 'YES' ? true : false, conviction: state.conviction.value},
            },
          },
        ],
      });
      reset();
    }
  };

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <ScrollView contentContainerStyle={styles.container}>
          <List.Item title={title} disabled left={() => <Headline>{referendum.index}</Headline>} />
          <ProposalCallInfo proposal={referendum} />
          <Padder scale={1} />

          <Caption>{`Proposal Hash:`}</Caption>
          <Text selectable>{referendum.hash}</Text>

          <View style={styles.row}>
            <View style={styles.center}>
              <Caption>{`Time left to vote`}</Caption>
              <Caption adjustsFontSizeToFit={true} numberOfLines={1}>
                {referendum.endPeriod.slice(0, 2).join(' ')}
              </Caption>
            </View>
            <View style={styles.center}>
              <Caption>{`Time left to activate`}</Caption>
              <Caption adjustsFontSizeToFit={true} numberOfLines={1}>
                {referendum.activatePeriod.slice(0, 2).join(' ')}
              </Caption>
            </View>
          </View>
          <Padder scale={1} />

          <Headline>{`Live Results`}</Headline>
          <Padder scale={0.5} />
          <Divider />
          <Padder scale={0.5} />
          <ProgressBar percentage={referendum.ayePercent} requiredAmount={80} />
          <View style={styles.row}>
            <View style={styles.center}>
              <Subheading>{`YES`}</Subheading>
              <Caption>{referendum.formattedVotedAye}</Caption>
              <Caption>{`${referendum.voteCountAye} participants`}</Caption>
            </View>
            <View style={styles.center}>
              <Subheading>{`NO`}</Subheading>
              <Caption>{referendum.formattedVotedNay}</Caption>
              <Caption>{`${referendum.voteCountNay} participants`}</Caption>
            </View>
          </View>
          <Padder scale={1} />

          <Headline>{`Vote!`}</Headline>
          <Padder scale={0.5} />
          <Divider />
          <View style={styles.row}>
            <Button mode="contained" icon="alert-circle-outline" onPress={voteNo}>
              {`Vote No`}
            </Button>
            <Button mode="contained" icon="check" onPress={voteYes}>
              {`Vote Yes`}
            </Button>
          </View>
        </ScrollView>

        <Modal visible={state.voting !== undefined} onDismiss={() => dispatch({type: 'RESET'})}>
          <Caption>{`Vote with account`}</Caption>
          <SelectAccount
            onSelect={(account) => {
              dispatch({type: 'SELECT_ACCOUNT', payload: account.accountInfo});
            }}
          />
          <Padder scale={1} />

          <Caption>{`Vote Value`}</Caption>
          <BalanceInput
            account={state.account}
            onChangeBalance={(amount) => dispatch({type: `SET_VOTE_VALUE`, payload: amount})}
          />

          <Padder scale={1} />

          <Caption>{`Conviction`}</Caption>
          <Padder scale={0.5} />

          <Select
            items={convictions}
            onSelect={(selectedItem) => {
              dispatch({type: 'SELECT_CONVICTION', payload: selectedItem});
            }}
          />
          <Padder scale={0.5} />

          <View style={styles.row}>
            <Button mode="outlined" onPress={reset}>
              {`Cancel`}
            </Button>
            <Button
              mode="outlined"
              disabled={!state.account || !state.conviction}
              onPress={vote}>{`VOTE ${state.voting}`}</Button>
          </View>
        </Modal>
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: standardPadding * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: standardPadding * 2,
  },
  center: {
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: standardPadding,
  },
});

const initialState: State = {
  voteValue: '',
};

type State = {
  voting?: 'YES' | 'NO';
  account?: Account | undefined;
  voteValue: string;
  conviction?: Conviction;
};

type Action =
  | {type: 'RESET'}
  | {type: 'CHANGE_VOTING'; payload: 'YES' | 'NO'}
  | {type: 'SET_VOTE_VALUE'; payload: string}
  | {type: 'SELECT_ACCOUNT'; payload: Account | undefined}
  | {type: 'SELECT_CONVICTION'; payload: Conviction};

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
