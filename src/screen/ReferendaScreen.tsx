import * as React from 'react';
import {Divider, Icon, Layout, Text} from '@ui-kitten/components';
import SafeView, {noTopEdges} from 'presentational/SafeView';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import globalStyles, {standardPadding} from 'src/styles';
import {EmptyView} from 'presentational/EmptyView';
import type {DeriveReferendumExt} from '@polkadot/api-derive/types';
import {Proposal} from 'presentational/Proposal';
import {useBestNumber} from 'src/hook/useVotingStatus';
import {BN_ONE} from '@polkadot/util';
import {useBlockTime} from 'src/hook/useBlockTime';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardStackParamList} from 'src/navigation/navigation';
import {referendumScreen} from 'src/navigation/routeKeys';
import {useReferenda} from 'src/hook/useReferenda';

export function ReferendaScreen() {
  const {data, isLoading, refetch} = useReferenda();

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

function Referenda({item}: {item: DeriveReferendumExt}) {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParamList>>();
  const {image: {proposal} = {proposal: undefined}} = item;
  const bestNumber = useBestNumber();

  const remainBlock = bestNumber ? item.status.end.sub(bestNumber).isub(BN_ONE) : undefined;
  const {timeStringParts} = useBlockTime(remainBlock);

  const goToRefrenda = () => {
    navigation.navigate(referendumScreen, {index: item.index.toString()});
  };

  return proposal ? (
    <Proposal
      proposal={proposal}
      accessoryLeft={() => (
        <TouchableOpacity onPress={goToRefrenda}>
          <Text category={'h4'}>{item.index.toString()}</Text>
        </TouchableOpacity>
      )}
      accessoryRight={() => (
        <TouchableOpacity style={referendaStyles.row} onPress={goToRefrenda}>
          <Text category={'c1'} adjustsFontSizeToFit={true} numberOfLines={1}>
            {timeStringParts.slice(0, 2).join(' ')}
          </Text>
          <Icon name="chevron-right-outline" fill="grey" style={globalStyles.icon25} />
        </TouchableOpacity>
      )}
    />
  ) : (
    <Text>{item.imageHash.toString()}</Text>
  );
}

const referendaStyles = StyleSheet.create({row: {flexDirection: 'row', alignItems: 'center'}});
