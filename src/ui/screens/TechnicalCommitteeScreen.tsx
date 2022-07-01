import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Caption, Icon} from '@ui/library';
import SafeView, {noTopEdges} from '@ui/components/SafeView';
import {useTechnicalCommitteeSummary} from 'src/api/hooks/useTechnicalCommitteeSummary';
import LoadingView from '@ui/components/LoadingView';
import globalStyles, {standardPadding} from '@ui/styles';
import StatInfoBlock from '@ui/components/StatInfoBlock';
import {AccountsList} from '@ui/components/Account/AccountsList';
import {Padder} from '@ui/components/Padder';

export function TechnicalCommitteeScreen() {
  const {data: technicalCommittee, loading} = useTechnicalCommitteeSummary();

  return (
    <SafeView edges={noTopEdges}>
      {loading && !technicalCommittee ? (
        <LoadingView />
      ) : (
        <View style={globalStyles.paddedContainer}>
          <View style={styles.infoContainer}>
            <Icon name="alert-circle" size={20} />
            <Padder scale={0.5} />
            <Caption
              style={
                styles.textWrap
              }>{`The Technical Committee can, along with the Council, produce emergency referenda, which are fast-tracked for voting and implementation.`}</Caption>
          </View>
          <View style={styles.infoContainer}>
            <Icon name="alert-circle" size={20} />
            <Padder scale={0.5} />
            <Caption
              style={
                styles.textWrap
              }>{`Members are added or removed from the Technical Committee via a simple majority vote of the Council.`}</Caption>
          </View>

          <AccountsList
            accounts={technicalCommittee?.members || []}
            header={
              <View style={[globalStyles.spaceBetweenRowContainer, globalStyles.paddedContainer]}>
                <StatInfoBlock title="Members">{String(technicalCommittee?.memberCount || 0)}</StatInfoBlock>
                <StatInfoBlock title="Active proposals">
                  {String(technicalCommittee?.activeProposalCount || 0)}
                </StatInfoBlock>
                <StatInfoBlock title="Total proposals">{technicalCommittee?.totalProposalCount || '0'}</StatInfoBlock>
              </View>
            }
          />
        </View>
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: standardPadding,
  },
  textWrap: {
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'justify',
  },
});
