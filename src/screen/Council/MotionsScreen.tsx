import {Button, Icon, Layout, Text, TopNavigationAction} from '@ui-kitten/components';
import React, {useContext, useMemo} from 'react';
import globalStyles, {standardPadding} from 'src/styles';
import ScreenNavigation from 'layout/ScreenNavigation';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import {FlatList, StyleSheet, View} from 'react-native';
import {Call, FunctionMetadataLatest} from '@polkadot/types/interfaces';
import {formatNumber} from '@polkadot/util';
import {AccountContext} from 'context/AccountContextProvider';
import {useQuery} from 'react-query';
import {useVotingStatus} from '../../hook/useVotingStatus';
import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {TxContext} from 'context/TxContext';

export function MotionsScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {api} = useContext(ChainApiContext);

  const {value: data} = useAsyncRetry(async () => {
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
        style={styles.flatList}
        data={data}
        renderItem={({item}) => {
          return <Motion item={item} members={members} />;
        }}
        keyExtractor={(item) => item.hash.toHex()}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({flatList: {padding: standardPadding * 2}});

function Motion({item, members}: {item: DeriveCollectiveProposal; members: string[]}) {
  const {isCloseable} = useVotingStatus(item.votes, members.length, 'council');
  const {api} = useContext(ChainApiContext);
  const {start} = useContext(TxContext);
  const {accounts} = useContext(AccountContext);
  const account = accounts?.[0];

  return (
    <View style={motionStyle.container}>
      <Text category={'h4'}>{formatNumber(item.votes?.index)}</Text>
      <CallExpander value={item.proposal} />
      {/*<Text>{formatNumber(item.votes?.threshold)}</Text>*/}
      <Text>{` ${item.votes?.ayes.length}/${members.length} `}</Text>
      {isCloseable && (
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
                  api.tx.council.close?.meta.args.length === 4
                    ? [item.hash, item.votes?.index, 0, 0]
                    : [item.hash, item.votes?.index],
                txMethod: 'council.close',
              })
                .then(() => console.log('success'))
                .catch((e) => console.warn(e));
            }
          }}>
          Close
        </Button>
      )}
    </View>
  );
}

const motionStyle = StyleSheet.create({container: {flexDirection: 'row', alignItems: 'center'}});

function CallExpander({
  value,
}: {
  children?: React.ReactNode;
  className?: string;
  labelHash?: React.ReactNode;
  value: Call;
  withHash?: boolean;
}) {
  const {meta, method, section} = value.registry.findMetaCall(value.callIndex);
  return (
    <View style={{flex: 1}}>
      <Text category={'c1'}>
        {section}.{method}
      </Text>
      <Text category={'c1'} numberOfLines={1}>{`${formatMeta(meta)}`}</Text>
    </View>
  );
}

function splitSingle(value: string[], sep: string): string[] {
  return value.reduce((result: string[], value: string): string[] => {
    return value.split(sep).reduce((result: string[], value: string) => result.concat(value), result);
  }, []);
}

function splitParts(value: string): string[] {
  return ['[', ']'].reduce((result: string[], sep) => splitSingle(result, sep), [value]);
}

function formatMeta(meta?: FunctionMetadataLatest): string {
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
