import {Button, Divider, Icon, Text, useTheme} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import globalStyles, {standardPadding} from 'src/styles';
import {NavigationProp} from '@react-navigation/native';
import {ChainApiContext} from 'context/ChainApiContext';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {formatNumber} from '@polkadot/util';
import {useVotingStatus} from 'src/hook/useVotingStatus';
import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';
import {TxContext} from 'context/TxContext';
import {EmptyView} from 'presentational/EmptyView';
import Padder from 'presentational/Padder';
import {useQuery, useQueryClient} from 'react-query';
import {useAccounts} from 'context/AccountsContext';
import {useCouncilMembers} from 'src/hook/useCouncilMembers';
import {CallInspector, formatCallMeta} from 'src/packages/call_inspector/CallInspector';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {DashboardStackParamList} from 'src/navigation/navigation';

export function MotionsScreen({navigation}: {navigation: NavigationProp<DashboardStackParamList>}) {
  const {api} = useContext(ChainApiContext);
  const {data, refetch, isLoading} = useQuery('motions', () => api?.derive.council.proposals());

  return (
    <SafeView edges={noTopEdges}>
      <FlatList
        refreshing={isLoading}
        onRefresh={refetch}
        style={styles.flatList}
        data={data}
        renderItem={({item}) => {
          return <Motion item={item} />;
        }}
        ItemSeparatorComponent={Divider}
        keyExtractor={(item) => item.hash.toHex()}
        ListEmptyComponent={EmptyView}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({flatList: {padding: standardPadding * 2}});

function Motion({item}: {item: DeriveCollectiveProposal}) {
  const theme = useTheme();
  const {api} = useContext(ChainApiContext);
  const {start} = useContext(TxContext);
  const {accounts} = useAccounts();
  const account = accounts?.[0];

  const {votes, proposal, hash} = item;
  const {data} = useCouncilMembers();
  const membersCount = data?.members.length ?? 0;
  const {isCloseable, isVoteable} = useVotingStatus(votes, membersCount, 'council');

  const {meta, method, section} = proposal.registry.findMetaCall(proposal.callIndex);

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const onPressClose = () => {
    if (api && account) {
      start({
        api,
        address: account.address,
        title: 'treasury.approveProposal',
        description:
          'Approve a proposal. At a later time, the proposal will be allocated to the beneficiary and the original deposit will be returned.',
        params: api.tx.council.close?.meta.args.length === 4 ? [hash, votes?.index, 0, 0] : [hash, votes?.index],
        txMethod: 'council.close',
      })
        .then(() => {
          return queryClient.invalidateQueries('motions');
        })
        .catch((e) => console.warn(e));
    }
  };

  const onPressNay = () => {
    if (api && account) {
      start({
        api,
        address: account.address,
        title: 'council.vote(proposal, index, approve)',
        description: 'Add a nay vote for the sender to the given proposal.',
        params: [hash, votes?.index, false],
        txMethod: 'council.vote',
      })
        .then(() => queryClient.invalidateQueries('motions'))
        .catch((e) => console.warn(e));
    }
  };

  const onPressAye = () => {
    if (api && account) {
      start({
        api,
        address: account.address,
        title: 'council.vote(proposal, index, approve)',
        description: 'Add an aye vote for the sender to the given proposal.',
        params: [hash, votes?.index, true],
        txMethod: 'council.vote',
      })
        .then(() => queryClient.invalidateQueries('motions'))
        .catch((e) => console.warn(e));
    }
  };

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
        <Text category={'c1'}>{`Aye ${votes?.ayes.length}/${membersCount} `}</Text>
        <Padder scale={0.5} />
        {(() => {
          if (data?.isMember) {
            if (isCloseable) {
              return (
                <View>
                  <Button status={'warning'} size={'tiny'} onPress={onPressClose}>
                    Close
                  </Button>
                </View>
              );
            } else if (isVoteable) {
              return (
                <View style={motionStyle.buttons}>
                  <Button status={'danger'} size={'tiny'} onPress={onPressNay}>
                    Nay
                  </Button>
                  <Padder scale={0.5} />
                  <Button status={'success'} size={'tiny'} onPress={onPressAye}>
                    Aye
                  </Button>
                </View>
              );
            }
          }
        })()}
      </View>
      {open ? (
        <View style={motionStyle.footer}>
          <Text category={'c1'} style={[motionStyle.desc, {color: theme['color-basic-600']}]}>{`${formatCallMeta(
            meta,
          )}`}</Text>
          <Padder scale={1} />
          <CallInspector call={proposal} />
        </View>
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
  footer: {paddingVertical: standardPadding, paddingHorizontal: standardPadding / 2},
});
