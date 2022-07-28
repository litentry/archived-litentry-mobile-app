import React, {useReducer} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Button, Divider, Modal, Select, List, Text} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {ProgressBar} from '@ui/components/ProgressBar';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useConvictions, Conviction} from 'src/api/hooks/useConvictions';
import {formattedStringToBn, stringToBn as stringToBnUtil} from 'src/utils/balance';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {referendumScreen} from '@ui/navigation/routeKeys';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';
import {ProposalCall} from '@ui/components/ProposalCall';
import BalanceInput from '@ui/components/BalanceInput';
import {Account} from 'src/api/hooks/useAccount';
import {useChainInfo} from 'src/api/hooks/useChainInfo';
import {getProposalTitle} from 'src/utils/proposal';
import {bnToHex, BN_ZERO} from '@polkadot/util';
import {useFormatBalance} from 'src/hooks/useFormatBalance';
import {useStartTx} from 'context/TxContext';

export function ReferendumScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const {startTx} = useStartTx();
  const [state, dispatch] = useReducer(reducer, initialState);
  const referendum = route.params.referendum;
  const {data: convictions} = useConvictions();
  const {data: chainInfo} = useChainInfo();
  const {stringToBn} = useFormatBalance();

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
      const balance = stringToBnUtil(chainInfo.registry, state.voteValue);
      startTx({
        address: state.account.address,
        txConfig: {
          method: 'democracy.vote',
          params: [
            referendum?.index,
            {
              balance: bnToHex(balance),
              vote: {aye: state.voting === 'YES' ? true : false, conviction: state.conviction.value},
            },
          ],
        },
      });
      reset();
    }
  };

  const balance = stringToBn(state.voteValue) ?? BN_ZERO;
  const disabled =
    !state.account ||
    !state.conviction ||
    !balance.gt(BN_ZERO) ||
    balance.gt(formattedStringToBn(state.account.balance?.free));

  const ReferendumHeadline = React.useCallback(
    () => <Text variant="headlineSmall">{referendum.index}</Text>,
    [referendum.index],
  );

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <ScrollView contentContainerStyle={styles.container}>
          <List.Item title={getProposalTitle(referendum)} disabled left={ReferendumHeadline} />
          <ProposalCall proposal={referendum} />
          <Padder scale={1} />

          {referendum.hash ? (
            <>
              <Text variant="bodySmall">{`Proposal Hash:`}</Text>
              <Text selectable>{referendum.hash}</Text>
            </>
          ) : (
            <>
              <Text variant="bodySmall">{`Image Hash:`}</Text>
              <Text selectable>{referendum.imageHash}</Text>
            </>
          )}

          <View style={styles.row}>
            <View style={styles.center}>
              <Text variant="bodySmall">{`Time left to vote`}</Text>
              <Text variant="bodySmall" adjustsFontSizeToFit={true} numberOfLines={1}>
                {referendum.endPeriod.slice(0, 2).join(' ')}
              </Text>
            </View>
            <View style={styles.center}>
              <Text variant="bodySmall">{`Time left to activate`}</Text>
              <Text variant="bodySmall" adjustsFontSizeToFit={true} numberOfLines={1}>
                {referendum.activatePeriod.slice(0, 2).join(' ')}
              </Text>
            </View>
          </View>
          <Padder scale={1} />

          <Text variant="headlineSmall">{`Live Results`}</Text>
          <Padder scale={0.5} />
          <Divider />
          <Padder scale={0.5} />
          <ProgressBar percentage={referendum.ayePercent} requiredAmount={80} />
          <View style={styles.row}>
            <View style={styles.center}>
              <Text variant="titleMedium">{`YES`}</Text>
              <Text variant="bodySmall">{referendum.formattedVotedAye}</Text>
              <Text variant="bodySmall">{`${referendum.voteCountAye} participants`}</Text>
            </View>
            <View style={styles.center}>
              <Text variant="titleMedium">{`NO`}</Text>
              <Text variant="bodySmall">{referendum.formattedVotedNay}</Text>
              <Text variant="bodySmall">{`${referendum.voteCountNay} participants`}</Text>
            </View>
          </View>
          <Padder scale={1} />

          <Text variant="headlineSmall">{`Vote!`}</Text>
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
          <Text variant="bodySmall">{`Vote with account`}</Text>
          <SelectAccount
            onSelect={(account) => {
              dispatch({type: 'SELECT_ACCOUNT', payload: account.accountInfo});
            }}
          />
          <Padder scale={1} />

          <Text variant="bodySmall">{`Vote Value`}</Text>
          <BalanceInput
            account={state.account}
            onChangeBalance={(amount) => dispatch({type: `SET_VOTE_VALUE`, payload: amount})}
          />

          <Padder scale={1} />

          <Text variant="bodySmall">{`Conviction`}</Text>
          <Padder scale={0.5} />

          <Select
            items={convictions ?? []}
            onSelect={(selectedItem) => {
              dispatch({type: 'SELECT_CONVICTION', payload: selectedItem});
            }}
          />
          <Padder scale={0.5} />

          <View style={styles.row}>
            <Button mode="outlined" onPress={reset}>
              {`Cancel`}
            </Button>
            <Button mode="outlined" disabled={disabled} onPress={vote}>{`VOTE ${state.voting}`}</Button>
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
