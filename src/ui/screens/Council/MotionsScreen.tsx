import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useQueryClient} from 'react-query';
import {Card, List, Subheading, Button, Headline, useTheme} from '@ui/library';
import {formatNumber} from '@polkadot/util';
import {ChainApiContext} from 'context/ChainApiContext';
import {EmptyView} from '@ui/components/EmptyView';
import {Padder} from '@ui/components/Padder';
import {useAccounts} from 'context/AccountsContext';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {CouncilMotion, useCouncilMotions} from 'src/api/hooks/useCouncilMotions';
import globalStyles, {standardPadding} from '@ui/styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {motionDetailScreen} from '@ui/navigation/routeKeys';
import {DashboardStackParamList} from '@ui/navigation/navigation';
import LoadingView from '@ui/components/LoadingView';
import {useApiTx} from 'src/api/hooks/useApiTx';
import { ProposalCallInfo } from '@ui/components/ProposalCallInfo';
import { CouncilMember, useCouncil } from 'src/api/hooks/useCouncil';
import { useIsCouncilMember } from 'src/api/hooks/useIsCouncilMember';

export function MotionsScreen() {
  const {data: motions, loading} = useCouncilMotions();
  const {data: council} = useCouncil();
  const isCouncil = useIsCouncilMember();
  return (
    <SafeView edges={noTopEdges}>
      {loading && !motions ? (
        <LoadingView />
      ) : (
        <FlatList
          style={styles.flatList}
          data={motions}
          renderItem={({item}) => {
            return <Motion motion={item} isCouncilMemeber={isCouncil} />;
          }}
          ItemSeparatorComponent={() => <Padder scale={1} />}
          keyExtractor={(item) => item.hash}
          ListEmptyComponent={EmptyView}
        />
      )}
    </SafeView>
  );
}

function Motion({motion , isCouncilMemeber}: {motion: CouncilMotion, isCouncilMemeber: boolean}) {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<DashboardStackParamList>>();
  const {api} = useContext(ChainApiContext);
  const startTx = useApiTx();
  const {accounts} = useAccounts();
  const account = accounts?.[0];

  const {votes, proposal, hash} = motion;
  const {data} = useCouncil();
  const membersCount = data?.members.length ?? 0;
  // const {isCloseable, isVoteable} = useVotingStatus(votes, membersCount, 'council');

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
      onPress={() => {
        navigation.navigate(motionDetailScreen, {motion});
      }}>
      <Card.Content>
        <List.Item
          title={<Headline>{formatNumber(votes?.index)}</Headline>}
          right={() => (
            <View style={globalStyles.justifyCenter}>
              <Subheading>{`Aye ${votes?.ayes.length}/${votes?.threshold} `}</Subheading>
               {(() => {
                if (isCouncilMemeber) {
                  if (motion.votingStatus?.isCloseable) {
                    return (
                      <Button onPress={onPressClose} color={colors.error} mode="outlined">
                        Close
                      </Button>
                    );
                  } else if (motion.votingStatus?.isVoteable) {
                    return (
                      <View style={globalStyles.rowAlignCenter}>
                        <Button onPress={onPressNay} color={colors.error} mode="outlined">
                          Nay
                        </Button>
                        <Button onPress={onPressAye} color={colors.success} mode="outlined">
                          Aye
                        </Button>
                      </View>
                    );
                  }
                }
              })()}
            </View>
          )}
        />
        <ProposalCallInfo proposal={proposal} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  flatList: {
    padding: standardPadding * 2,
  },
});
