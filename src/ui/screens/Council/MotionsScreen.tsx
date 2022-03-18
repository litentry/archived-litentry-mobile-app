import React, {useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useQueryClient} from 'react-query';
import {Card, List, Subheading, Button, Headline, useTheme} from '@ui/library';
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
import {useIsCouncilMember} from 'src/api/hooks/useIsCouncilMember';
import {ProposalCallInfo} from '@ui/components/ProposalCallInfo';

export function MotionsScreen() {
  const {data: motions, loading} = useCouncilMotions();
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
            return <Motion motion={item} isCouncilMember={isCouncil} />;
          }}
          ItemSeparatorComponent={() => <Padder scale={1} />}
          keyExtractor={(item) => item.proposal.hash}
          ListEmptyComponent={EmptyView}
        />
      )}
    </SafeView>
  );
}

function Motion({motion, isCouncilMember}: {motion: CouncilMotion; isCouncilMember: boolean}) {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<DashboardStackParamList>>();
  const {api} = useContext(ChainApiContext);
  const startTx = useApiTx();
  const {accounts} = useAccounts();
  const account = accounts?.[0];
  const {votes, proposal} = motion;
  const queryClient = useQueryClient();

  const onPressClose = () => {
    if (account) {
      startTx({
        address: account.address,
        params:
          api?.tx.council.close?.meta.args.length === 4
            ? [proposal.hash, motion.proposal.index, 0, 0]
            : [proposal.hash, motion.proposal.index],
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
        params: [proposal.hash, motion.proposal.index, false],
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
        params: [proposal.hash, motion.proposal.index, true],
        txMethod: 'council.vote',
      })
        .then(() => queryClient.invalidateQueries('motions'))
        .catch((e) => console.warn(e));
    }
  };

  return (
    <Card
      onPress={() => {
        navigation.navigate(motionDetailScreen, {hash: String(proposal.hash)});
      }}>
      <Card.Content>
        <List.Item
          title={<Headline>{motion.proposal.index}</Headline>}
          right={() => (
            <View style={globalStyles.rowAlignCenter}>
              <Subheading>{`Aye ${votes?.ayes.length}/${votes?.threshold} `}</Subheading>
              <Padder scale={0.5} />
              {(() => {
                if (isCouncilMember) {
                  if (motion.votingStatus?.isCloseable) {
                    return (
                      <Button onPress={onPressClose} color={colors.error} mode="outlined" compact uppercase={false}>
                        Close
                      </Button>
                    );
                  } else if (motion.votingStatus?.isVoteable) {
                    return (
                      <View style={globalStyles.rowAlignCenter}>
                        <Button onPress={onPressNay} color={colors.error} mode="outlined" compact uppercase={false}>
                          Nay
                        </Button>
                        <Padder scale={0.5} />
                        <Button onPress={onPressAye} color={colors.success} mode="outlined" compact uppercase={false}>
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
