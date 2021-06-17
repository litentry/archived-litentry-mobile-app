import {Button, Divider, Icon, Layout, Text, TopNavigationAction, useTheme} from '@ui-kitten/components';
import React, {useContext, useMemo, useState} from 'react';
import globalStyles, {standardPadding} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FunctionMetadataLatest} from '@polkadot/types/interfaces';
import {formatNumber} from '@polkadot/util';
import {AccountContext} from 'context/AccountContextProvider';
import {useQuery} from 'react-query';
import {useVotingStatus} from '../../hook/useVotingStatus';
import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {TxContext} from 'context/TxContext';
import {EmptyView} from 'presentational/EmptyView';
import Padder from 'presentational/Padder';
import type {Codec, IExtrinsic, IMethod, TypeDef} from '@polkadot/types/types';
import {GenericCall, getTypeDef} from '@polkadot/types';
import {Account, AccountName} from 'presentational/Account';
import Identicon from '@polkadot/reactnative-identicon';

export function MotionsScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {api} = useContext(ChainApiContext);

  const {
    value: data,
    retry,
    loading,
  } = useAsyncRetry(async () => {
    try {
      if (api) {
        return api.derive.council.proposals();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [api]);

  const {members} = useMembers();

  return (
    <Layout style={globalStyles.flex}>
      <ScreenNavigation
        renderTitle={() => (
          <Text category={'s1'} style={globalStyles.monoFont}>
            Motions
          </Text>
        )}
        accessoryLeft={
          <TopNavigationAction onPress={navigation.goBack} icon={(p) => <Icon {...p} name={'arrow-back-outline'} />} />
        }
      />
      <FlatList
        refreshing={loading}
        onRefresh={retry}
        style={styles.flatList}
        data={data}
        renderItem={({item}) => {
          return <Motion item={item} members={members} />;
        }}
        ItemSeparatorComponent={Divider}
        keyExtractor={(item) => item.hash.toHex()}
        ListEmptyComponent={EmptyView}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({flatList: {padding: standardPadding * 2}});

function Motion({item, members}: {item: DeriveCollectiveProposal; members: string[]}) {
  const theme = useTheme();
  const {api} = useContext(ChainApiContext);
  const {start} = useContext(TxContext);
  const {accounts} = useContext(AccountContext);
  const account = accounts?.[0];

  const {votes, proposal, hash} = item;
  const {isCloseable, isVoteable} = useVotingStatus(votes, members.length, 'council');

  const {meta, method, section} = proposal.registry.findMetaCall(proposal.callIndex);

  const [open, setOpen] = useState(false);

  const extractedState = extractState(proposal);

  return (
    <View style={motionStyle.container}>
      <View style={motionStyle.mainRow}>
        <Text category={'h4'}>{formatNumber(votes?.index)}</Text>
        <TouchableOpacity onPress={() => setOpen(!open)} style={motionStyle.titleContainer}>
          <Text category={'p1'} style={motionStyle.title} numberOfLines={1}>
            {section}.{method}
          </Text>
          <Icon
            name={open ? 'arrow-up-outline' : 'arrow-down-outline'}
            style={globalStyles.icon}
            fill={theme['color-basic-600']}
          />
        </TouchableOpacity>
        {/*<Text>{formatNumber(votes?.threshold)}</Text>*/}
        <Text category={'c1'}>{`Aye ${votes?.ayes.length}/${members.length} `}</Text>
        <Padder scale={0.5} />
        {isCloseable ? (
          <View>
            <Button
              status={'warning'}
              size={'tiny'}
              onPress={() => {
                if (api && account) {
                  start({
                    api,
                    address: account.address,
                    title: 'treasury.approveProposal',
                    description:
                      'Approve a proposal. At a later time, the proposal will be allocated to the beneficiary and the original deposit will be returned.',
                    params:
                      api.tx.council.close?.meta.args.length === 4 ? [hash, votes?.index, 0, 0] : [hash, votes?.index],
                    txMethod: 'council.close',
                  })
                    .then(() => console.log('success'))
                    .catch((e) => console.warn(e));
                }
              }}>
              Close
            </Button>
          </View>
        ) : isVoteable ? (
          <View style={motionStyle.buttons}>
            <Button
              status={'danger'}
              size={'tiny'}
              onPress={() => {
                if (api && account) {
                  start({
                    api,
                    address: account.address,
                    title: 'council.vote(proposal, index, approve)',
                    description: 'Add a nay vote for the sender to the given proposal.',
                    params: [hash, votes?.index, false],
                    txMethod: 'council.vote',
                  })
                    .then(() => console.log('success'))
                    .catch((e) => console.warn(e));
                }
              }}>
              Nay
            </Button>
            <Padder scale={0.5} />
            <Button
              status={'success'}
              size={'tiny'}
              onPress={() => {
                if (api && account) {
                  start({
                    api,
                    address: account.address,
                    title: 'council.vote(proposal, index, approve)',
                    description: 'Add an aye vote for the sender to the given proposal.',
                    params: [hash, votes?.index, true],
                    txMethod: 'council.vote',
                  })
                    .then(() => console.log('success'))
                    .catch((e) => console.warn(e));
                }
              }}>
              Aye
            </Button>
          </View>
        ) : null}
      </View>
      {open ? (
        <>
          <Text category={'c1'} style={[motionStyle.desc, {color: theme['color-basic-600']}]}>{`${formatCallMeta(
            meta,
          )}`}</Text>
          {extractedState.params.map((p) => {
            if (p.type.type === 'AccountId' && p.value) {
              return (
                <Account id={p.value.toString()}>
                  <View style={motionStyle.paramRow}>
                    <Text>{p.name}: </Text>
                    <Identicon value={p.value.toString()} size={30} />
                    <Padder scale={0.3} />
                    <AccountName />
                  </View>
                </Account>
              );
            }
            return (
              <View style={motionStyle.paramRow}>
                <Text>{`${p.name}: ${p.value?.toString()}`}</Text>
              </View>
            );
          })}
        </>
      ) : null}
    </View>
  );
}

const motionStyle = StyleSheet.create({
  container: {paddingVertical: standardPadding},
  mainRow: {flexDirection: 'row', alignItems: 'center'},
  titleContainer: {padding: standardPadding, flexDirection: 'row', flex: 1, alignItems: 'center'},
  title: {},
  desc: {paddingHorizontal: standardPadding},
  buttons: {display: 'flex', flexDirection: 'row'},
  paramRow: {flexDirection: 'row', alignItems: 'center', padding: standardPadding},
});

interface Result {
  isMember: boolean;
  members: string[];
}

export function useMembers(collective: 'council' | 'technicalCommittee' = 'council'): Result {
  const {api} = useContext(ChainApiContext);
  const {accounts} = useContext(AccountContext);
  const {data: retrieved} = useQuery('members', () => api?.query[collective]?.members());

  return useMemo(() => {
    const members = retrieved?.map((r) => r.toString()) || [];
    return {
      isMember: members.some((accountId) => accounts?.find((a) => a.address.toString() === accountId.toString())),
      members,
    };
  }, [accounts, retrieved]);
}

export function formatCallMeta(meta?: FunctionMetadataLatest): string {
  if (!meta || !meta.documentation.length) {
    return '';
  }

  const strings = meta.documentation.map((doc) => doc.toString().trim());
  const firstEmpty = strings.findIndex((doc) => !doc.length);
  const combined = (firstEmpty === -1 ? strings : strings.slice(0, firstEmpty))
    .join(' ')
    .replace(/#(<weight>| <weight>).*<\/weight>/, '');
  const parts = splitParts(combined.replace(/\\/g, '').replace(/`/g, ''));

  return parts.join(' ');
}

function splitSingle(value: string[], sep: string): string[] {
  return value.reduce((result: string[], value: string): string[] => {
    return value.split(sep).reduce((result: string[], value: string) => result.concat(value), result);
  }, []);
}

function splitParts(value: string): string[] {
  return ['[', ']'].reduce((result: string[], sep) => splitSingle(result, sep), [value]);
}

interface Param {
  name: string;
  type: TypeDef;
  value?: Codec;
}

function extractState(value: IExtrinsic | IMethod): {params: Param[]} {
  const params = GenericCall.filterOrigin(value.meta).map(
    ({name, type}, k): Param => ({
      name: name.toString(),
      type: getTypeDef(type.toString()),
      value: value.args[k],
    }),
  );

  return {params};
}
