import React from 'react';
import {View} from 'react-native';
import {Divider} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useTechnicalCommitteeSummary} from 'src/api/hooks/useTechnicalCommitteeSummary';
import LoadingView from '@ui/components/LoadingView';
import {FlatList} from 'react-native-gesture-handler';
import {AccountListItem} from '@ui/components/Account/AccountListItem';
import globalStyles from '@ui/styles';
import StatInfoBlock from '@ui/components/StatInfoBlock';

export function TechnicalCommitteeScreen() {
  const {data: technicalCommittee, loading} = useTechnicalCommitteeSummary();

  return (
    <SafeView edges={noTopEdges}>
      {loading && !technicalCommittee ? (
        <LoadingView />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={[globalStyles.spaceBetweenRowContainer, globalStyles.paddedContainer]}>
              <StatInfoBlock title="Members">{String(technicalCommittee?.memberCount || 0)}</StatInfoBlock>
              <StatInfoBlock title="Active proposals">
                {String(technicalCommittee?.activeProposalCount || 0)}
              </StatInfoBlock>
              <StatInfoBlock title="Total proposal">{technicalCommittee?.totalProposalCount || '0'}</StatInfoBlock>
            </View>
          )}
          contentContainerStyle={globalStyles.paddedContainer}
          data={technicalCommittee?.members}
          renderItem={({item}) => <AccountListItem account={item} />}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item) => item.address}
        />
      )}
    </SafeView>
  );
}
