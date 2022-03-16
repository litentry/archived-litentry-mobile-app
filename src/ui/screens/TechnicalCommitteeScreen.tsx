import React from 'react';
import {View} from 'react-native';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useTechnicalCommitteeSummary} from 'src/api/hooks/useTechnicalCommitteeSummary';
import LoadingView from '@ui/components/LoadingView';
import globalStyles from '@ui/styles';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {AccountsList} from '@ui/components/Account/AccountsList';

export function TechnicalCommitteeScreen() {
  const {data: technicalCommittee, loading} = useTechnicalCommitteeSummary();

  return (
    <SafeView edges={noTopEdges}>
      {loading && !technicalCommittee ? (
        <LoadingView />
      ) : (
        <View style={globalStyles.paddedContainer}>
          <AccountsList
            accounts={technicalCommittee?.members || []}
            header={
              <View style={[globalStyles.spaceBetweenRowContainer, globalStyles.paddedContainer]}>
                <StatInfoBlock title="Members">{String(technicalCommittee?.memberCount || 0)}</StatInfoBlock>
                <StatInfoBlock title="Active proposals">
                  {String(technicalCommittee?.activeProposalCount || 0)}
                </StatInfoBlock>
                <StatInfoBlock title="Total proposal">{technicalCommittee?.totalProposalCount || '0'}</StatInfoBlock>
              </View>
            }
          />
        </View>
      )}
    </SafeView>
  );
}
