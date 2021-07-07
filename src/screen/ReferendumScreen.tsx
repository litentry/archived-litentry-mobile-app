import React from 'react';
import {Button, Card, Divider, Icon, IndexPath, Layout, Modal, Select, SelectItem, Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {RouteProp} from '@react-navigation/native';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {referendumScreen} from 'src/navigation/routeKeys';
import {useReferenda} from 'src/hook/useReferenda';
import {formatCallMeta} from 'src/packages/call_inspector/CallInspector';
import {BN_ONE} from '@polkadot/util';
import {useBlockTime} from 'src/hook/useBlockTime';
import {useBestNumber} from 'src/hook/useVotingStatus';
import {useFormatBalance} from 'src/hook/useFormatBalance';
import Padder from 'presentational/Padder';
import {useReducer} from 'react';
import {getAccountDisplayValue, useAccounts} from 'context/AccountsContext';

export function ReferendumScreen({route}: {route: RouteProp<DashboardStackParamList, typeof referendumScreen>}) {
  const formatBalance = useFormatBalance();
  const {data} = useReferenda();
  const referendum = data?.find((r) => r.index.toString() === route.params.index);
  const proposal = referendum?.image?.proposal;
  const bestNumber = useBestNumber();
  const remainBlock = bestNumber ? referendum?.status.end.sub(bestNumber).isub(BN_ONE) : undefined;
  const enactBlock = bestNumber ? referendum?.status.end.add(referendum.status.delay).sub(bestNumber) : undefined;
  const {timeStringParts: remainingTime} = useBlockTime(remainBlock);
  const {timeStringParts: activateTime} = useBlockTime(enactBlock);

  const [state, dispatch] = useReducer(reducer, initialState);

  const {accounts} = useAccounts();
  const selectedAccount = state.account && accounts[state.account.row];
  const accountDisplayValue = selectedAccount ? getAccountDisplayValue(selectedAccount) : undefined;

  if (!proposal) {
    return null;
  }

  const {meta, method, section} = proposal.registry.findMetaCall(proposal.callIndex);

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <Text category={'h5'}>Proposal</Text>
          <Padder scale={0.5} />
          <Divider />
          <View style={styles.paddedBox}>
            <Text appearance={'hint'}>Proposal</Text>
            <Text category={'c1'}>{`${section}.${method}`}</Text>
            <Text category={'c1'}>{`${formatCallMeta(meta)}`}</Text>
            <Padder scale={1.5} />
            <Text appearance={'hint'}>Has of the proposal</Text>
            <Text category={'c1'} numberOfLines={1}>
              {proposal.hash.toString()}
            </Text>
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
            <Select
              selectedIndex={state.account}
              value={accountDisplayValue}
              onSelect={(index) => {
                if (!Array.isArray(index)) {
                  dispatch({type: 'SELECT_ACCOUNT', payload: index});
                }
              }}>
              {accounts.map((account) => {
                return <SelectItem key={account.address} title={getAccountDisplayValue(account)} />;
              })}
            </Select>
            <Button
              onPress={() => {
                dispatch({type: 'RESET'});
              }}
              appearance="ghost"
              status="basic">
              CANCEL
            </Button>
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

const initialState: State = {voteValue: 0, conviction: 0.1};

type State = {
  voting?: 'YES' | 'NO';
  account?: IndexPath;
  voteValue: number;
  conviction: number;
};

type Action =
  | {type: 'RESET'}
  | {type: 'CHANGE_VOTING'; payload: 'YES' | 'NO' | undefined}
  | {type: 'SELECT_ACCOUNT'; payload: IndexPath};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'CHANGE_VOTING':
      return {...state, voting: action.payload};

    case 'SELECT_ACCOUNT':
      return {...state, account: action.payload};

    default:
      return state;
  }
}
