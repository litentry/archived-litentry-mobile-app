import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import {Button, Card, Divider, ListItem, Text} from '@ui-kitten/components';
import {formatNumber} from '@polkadot/util';
import type {DeriveCollectiveProposal} from '@polkadot/api-derive/types';

import {ChainApiContext} from 'context/ChainApiContext';
import {EmptyView} from 'presentational/EmptyView';
import Padder from 'presentational/Padder';
import {useAccounts} from 'context/AccountsContext';
import {useVotingStatus} from 'src/api/hooks/useVotingStatus';
import {useCouncilMembers} from 'src/api/hooks/useCouncilMembers';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {ProposalInfo} from 'presentational/ProposalInfo';
import {useCouncilMotions} from 'src/api/hooks/useCouncilMotions';
import {standardPadding} from 'src/styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {motionDetailScreen} from 'src/navigation/routeKeys';
import {DashboardStackParamList} from 'src/navigation/navigation';
import LoadingView from 'presentational/LoadingView';
import {useApiTx} from 'src/api/hooks/useApiTx';

export function MotionsScreen() {
  const {data, refetch, isLoading, isFetching} = useCouncilMotions();

  return (
    <SafeView edges={noTopEdges}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          refreshing={isFetching}
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
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({flatList: {padding: standardPadding * 2}});

function Motion({item}: {item: DeriveCollectiveProposal}) {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList>>();
  const {api} = useContext(ChainApiContext);
  const startTx = useApiTx();
  const {accounts} = useAccounts();
  const account = accounts?.[0];

  const {votes, proposal, hash} = item;
  const {data} = useCouncilMembers();
  const membersCount = data?.members.length ?? 0;
  const {isCloseable, isVoteable} = useVotingStatus(votes, membersCount, 'council');

  const queryClient = useQueryClient();

  const onPressClose = () => {
    if (account) {
      startTx({
        address: account.address,
        params: api?.tx.council.close?.meta.args.length === 4 ? [hash, votes?.index, 0, 0] : [hash, votes?.index],
        txMethod: 'council.close',
      })
        .then(() => {
          return queryClient.invalidateQueries('motions');
        })
        .catch((e) => console.warn(e));
    }
  };

  const onPressNay = () => {
    if (account) {
      startTx({
        address: account.address,
        params: [hash, votes?.index, false],
        txMethod: 'council.vote',
      })
        .then(() => queryClient.invalidateQueries('motions'))
        .catch((e) => console.warn(e));
    }
  };

  const onPressAye = () => {
    if (account) {
      startTx({
        address: account.address,
        params: [hash, votes?.index, true],
        txMethod: 'council.vote',
      })
        .then(() => queryClient.invalidateQueries('motions'))
        .catch((e) => console.warn(e));
    }
  };

  return (
    <Card
      style={motionStyle.container}
      onPress={() => {
        navigation.navigate(motionDetailScreen, {hash: String(hash)});
      }}>
      <ListItem
        style={motionStyle.listItem}
        disabled
        accessoryLeft={() => {
          return <Text category={'h4'}>{formatNumber(votes?.index)}</Text>;
        }}
        accessoryRight={() => {
          return (
            <>
              <Text category={'c1'}>{`Aye ${votes?.ayes.length}/${votes?.threshold} `}</Text>
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
            </>
          );
        }}
      />
      <ProposalInfo proposal={proposal} />
    </Card>
  );
}

const motionStyle = StyleSheet.create({
  container: {marginBottom: standardPadding},
  buttons: {display: 'flex', flexDirection: 'row'},
  listItem: {backgroundColor: 'transparent'},
});
