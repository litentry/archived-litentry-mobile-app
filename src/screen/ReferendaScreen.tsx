import * as React from 'react';
import {Divider, Layout, Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {FlatList, StyleSheet, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {useApi} from 'context/ChainApiContext';
import {useQuery} from 'react-query';
import {EmptyView} from 'presentational/EmptyView';
import type {DeriveReferendumExt} from '@polkadot/api-derive/types';
import {Proposal} from 'presentational/Proposal';
import {useBestNumber} from 'src/hook/useVotingStatus';
import {BN_ONE} from '@polkadot/util';
import {useBlockTime} from 'src/hook/useBlockTime';

export function ReferendaScreen() {
  const {data, isLoading, refetch} = useReferendums();

  return (
    <Layout style={globalStyles.flex}>
      <SafeView edges={noTopEdges}>
        <View style={styles.container}>
          <FlatList
            refreshing={isLoading}
            onRefresh={refetch}
            style={styles.flatList}
            data={data}
            renderItem={({item}) => {
              return <Referenda item={item} />;
            }}
            ItemSeparatorComponent={Divider}
            keyExtractor={(item) => item.index.toString()}
            ListEmptyComponent={EmptyView}
          />
        </View>
      </SafeView>
    </Layout>
  );
}

const styles = StyleSheet.create({container: {}, flatList: {padding: standardPadding * 2}});

function useReferendums() {
  const {api} = useApi();

  return useQuery('referendums', () => api?.derive.democracy.referendums());
}

function Referenda({item}: {item: DeriveReferendumExt}) {
  const {image: {proposal} = {proposal: undefined}} = item;
  const bestNumber = useBestNumber();

  const remainBlock = bestNumber ? item.status.end.sub(bestNumber).isub(BN_ONE) : undefined;
  const {timeStringParts} = useBlockTime(remainBlock);

  return proposal ? (
    <Proposal
      proposal={proposal}
      accessoryLeft={() => <Text category={'h4'}>{item.index.toString()}</Text>}
      accessoryRight={() => (
        <Text category={'c1'} adjustsFontSizeToFit={true} numberOfLines={1}>
          {timeStringParts.slice(0, 2).join(' ')}
        </Text>
      )}
    />
  ) : (
    <Text>{item.imageHash.toString()}</Text>
  );
}
