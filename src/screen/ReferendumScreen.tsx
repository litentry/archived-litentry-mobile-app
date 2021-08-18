import {BN, BN_ONE} from '@polkadot/util';
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
import Padder from 'presentational/Padder';
import {ProgressBar} from 'presentational/ProgressBar';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {SelectAccount} from 'presentational/SelectAccount';
import React, {useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import {useBestNumber} from 'src/api/hooks/useBestNumber';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {useConvictions} from 'src/api/hooks/useConvictions';
import {useDemocracy} from 'src/api/hooks/useDemocracy';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';
import {getBalanceFromString} from 'src/api/utils/balance';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {referendumScreen} from 'src/navigation/routeKeys';
import {formatCallMeta} from 'src/packages/call_inspector/CallInspector';
import globalStyles, {standardPadding} from 'src/styles';

export function ReferendumScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const {start} = useTX();
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
  const selectedConviction = state.conviction && convictions[state.conviction.row];
  const convictionDisplayValue = selectedConviction?.text;

  const {meta, method, section} = proposal?.registry.findMetaCall(proposal.callIndex) ?? {};

  const ayePercentage =
    referendum && !referendum.votedTotal.isZero()
      ? referendum.allAye
          .reduce((total: BN, {balance}) => total.add(balance), new BN(0))
          .muln(10000)
          .div(referendum.votedTotal)
          .toNumber() / 100
      : 0;

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <Text category={'h5'}>Proposal</Text>
          <Padder scale={0.5} />
          <Divider />
          <View style={styles.paddedBox}>
            {proposal ? (
              <>
                <Text appearance={'hint'}>Proposal</Text>
                <Text category={'c1'}>{`${section}.${method}`}</Text>
                <Text category={'c1'}>{`${formatCallMeta(meta)}`}</Text>
                <Padder scale={1.5} />
                <Text appearance={'hint'}>Hash of the proposal</Text>
                <Text category={'c1'} numberOfLines={1}>
                  {String(proposal?.hash)}
                </Text>
              </>
            ) : (
              <>
                <Text appearance={'hint'}>Preimage</Text>
                <Text category={'c1'} numberOfLines={1} ellipsizeMode="middle">
                  {String(referendum?.imageHash)}
                </Text>
              </>
            )}
            <Padder scale={1.5} />

            <View style={styles.row}>
              <View style={styles.center}>
                <Text appearance={'hint'}>Time left to vote</Text>
                <Text category={'c1'} adjustsFontSizeToFit={true} numberOfLines={1}>
                  {remainingTime.slice(0, 2).join(' ')}
                </Text>
              </View>
              <View style={styles.center}>
                <Text appearance={'hint'}>Time left to activate</Text>
                <Text category={'c1'} adjustsFontSizeToFit={true} numberOfLines={1}>
                  {activateTime.slice(0, 2).join(' ')}
                </Text>
              </View>
            </View>
          </View>

          <Text category={'h6'}>Live Results</Text>
          <Padder scale={0.5} />
          <Divider />
          <View style={styles.paddedBox}>
            <ProgressBar percentage={ayePercentage} requiredAmount={80} />
            <View style={styles.row}>
              <View style={styles.center}>
                <Text category={'h6'} status={'success'}>
                  YES
                </Text>
                <Text>{referendum ? formatBalance(referendum.votedAye) : undefined}</Text>
                <Text>{`${referendum?.voteCountAye} participants`}</Text>
              </View>
              <View style={styles.center}>
                <Text category={'h6'} status={'danger'}>
                  NO
                </Text>
                <Text>{referendum ? formatBalance(referendum.votedNay) : undefined}</Text>
                <Text>{`${referendum?.voteCountNay} participants`}</Text>
              </View>
            </View>
          </View>

          <Text category={'h6'}>Vote!</Text>
          <Padder scale={0.5} />
          <Divider />
          <View style={styles.paddedBox}>
            <View style={styles.row}>
              <Button
                accessoryLeft={(p) => <Icon {...p} name={'alert-circle-outline'} />}
                onPress={() => dispatch({type: 'CHANGE_VOTING', payload: 'NO'})}>
                Vote No
              </Button>
              <Button
                accessoryLeft={(p) => <Icon {...p} name={'checkmark-circle-2-outline'} />}
                onPress={() => {
                  dispatch({type: 'CHANGE_VOTING', payload: 'YES'});
                }}>
                Vote Yes
              </Button>
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
                        referendum?.index,
                        {
                          Standard: {
                            balance,
                            vote: {aye: state.voting === 'YES' ? true : false, conviction: selectedConviction.value},
                          },
                        },
                      ],
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
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: standardPadding * 2},
  center: {alignItems: 'center'},
  paddedBox: {padding: standardPadding * 2},
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
