import React, {useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import {BN, BN_ONE} from '@polkadot/util';
import {RouteProp} from '@react-navigation/native';
import {Button, Divider, Headline, Modal, Select, Subheading, Caption, TextInput} from '@ui/library';
import {Layout} from '@ui/components/Layout';
import {useApi} from 'context/ChainApiContext';
import {ProgressBar} from '@ui/components/ProgressBar';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {SelectAccount} from '@ui/components/SelectAccount';
import {useApiTx} from 'src/api/hooks/useApiTx';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useConvictions, Conviction} from 'src/api/hooks/useConvictions';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import {referendumScreen} from '@ui/navigation/routeKeys';
import {formatCallMeta} from 'src/utils/callMetadata';
import globalStyles, {standardPadding} from '@ui/styles';
import {Padder} from '@ui/components/Padder';

export function ReferendumScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const startTx = useApiTx();
  const {api} = useApi();

  const [state, dispatch] = useReducer(reducer, initialState);

  const formatBalance = useFormatBalance();
  const {data} = useDemocracy();
  const referendum = data?.referendums.find((r) => r.index.toString() === route.params.index);
  const proposal = referendum?.image?.proposal;

  const bestNumber = useBestNumber();
  const remainBlock = bestNumber ? referendum?.status.end.sub(bestNumber).isub(BN_ONE) : undefined;
  const enactBlock = bestNumber ? referendum?.status.end.add(referendum.status.delay).sub(bestNumber) : undefined;
  const {timeStringParts: remainingTime} = useBlockTime(remainBlock);
  const {timeStringParts: activateTime} = useBlockTime(enactBlock);

  const convictions = useConvictions();

  const {meta, method, section} = proposal?.registry.findMetaCall(proposal.callIndex) ?? {};

  const ayePercentage =
    referendum && !referendum.votedTotal.isZero()
      ? referendum.allAye
          .reduce((total: BN, {balance}) => total.add(balance), new BN(0))
          .muln(10000)
          .div(referendum.votedTotal)
          .toNumber() / 100
      : 0;

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
    if (api && state.account && state.conviction && state.voteValue) {
      const balance = getBalanceFromString(api, state.voteValue);
      startTx({
        address: state.account,
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
        <View style={styles.container}>
          <Headline>Proposal</Headline>
          <Padder scale={0.5} />
          <Divider />
          {proposal ? (
            <>
              <Caption>{`${section}.${method}`}</Caption>
              <Caption>{`${formatCallMeta(meta)}`}</Caption>
              <Padder scale={1.5} />
              <Subheading>Hash of the proposal</Subheading>
              <Caption numberOfLines={1}>{String(proposal?.hash)}</Caption>
            </>
          ) : (
            <>
              <Subheading>Preimage</Subheading>
              <Caption numberOfLines={1} ellipsizeMode="middle">
                {String(referendum?.imageHash)}
              </Caption>
            </>
          )}

          <View style={styles.row}>
            <View style={styles.center}>
              <Caption>Time left to vote</Caption>
              <Caption adjustsFontSizeToFit={true} numberOfLines={1}>
                {remainingTime.slice(0, 2).join(' ')}
              </Caption>
            </View>
            <View style={styles.center}>
              <Caption>Time left to activate</Caption>
              <Caption adjustsFontSizeToFit={true} numberOfLines={1}>
                {activateTime.slice(0, 2).join(' ')}
              </Caption>
            </View>
          </View>
          <Padder scale={1} />

          <Headline>Live Results</Headline>
          <Padder scale={0.5} />
          <Divider />
          <Padder scale={0.5} />
          <ProgressBar percentage={ayePercentage} requiredAmount={80} />
          <View style={styles.row}>
            <View style={styles.center}>
              <Subheading>YES</Subheading>
              <Caption>{referendum ? formatBalance(referendum.votedAye) : undefined}</Caption>
              <Caption>{`${referendum?.voteCountAye} participants`}</Caption>
            </View>
            <View style={styles.center}>
              <Subheading>NO</Subheading>
              <Caption>{referendum ? formatBalance(referendum.votedNay) : undefined}</Caption>
              <Caption>{`${referendum?.voteCountNay} participants`}</Caption>
            </View>
          </View>
          <Padder scale={1} />

          <Headline>Vote!</Headline>
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
        </View>

        <Modal visible={state.voting !== undefined} onDismiss={() => dispatch({type: 'RESET'})}>
          <Caption>Vote with account</Caption>
          <SelectAccount
            onSelect={(account) => {
              dispatch({type: 'SELECT_ACCOUNT', payload: account.address});
            }}
          />
          <Padder scale={1} />

          <Caption>Vote Value</Caption>
          <TextInput
            dense
            mode="outlined"
            autoComplete="off"
            placeholder="Place your Text"
            keyboardType="decimal-pad"
            value={state.voteValue}
            onChangeText={(nextValue) =>
              dispatch({type: 'SET_VOTE_VALUE', payload: nextValue.replace(/[^(\d+).(\d+)]/g, '')})
            }
          />
          <Subheading style={styles.marginLeft}>
            {api && formatBalance(getBalanceFromString(api, state.voteValue))}
          </Subheading>
          <Padder scale={1} />

          <Caption>Conviction</Caption>
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
  container: {padding: standardPadding * 2},
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
  account?: string;
  voteValue: string;
  conviction?: Conviction;
};

type Action =
  | {type: 'RESET'}
  | {type: 'CHANGE_VOTING'; payload: 'YES' | 'NO'}
  | {type: 'SET_VOTE_VALUE'; payload: string}
  | {type: 'SELECT_ACCOUNT'; payload: string}
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
