import type {Proposal as ProposalType} from '@polkadot/types/interfaces';
import {Text, useTheme} from '@ui-kitten/components';
import Padder from 'presentational/Padder';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CallInspector, formatCallMeta} from 'src/packages/call_inspector/CallInspector';
import {standardPadding} from 'src/styles';

export function ProposalInfo({proposal}: {proposal: ProposalType}) {
  const theme = useTheme();
  const {meta} = proposal.registry.findMetaCall(proposal.callIndex);

  return (
    <View style={styles.container}>
      <Text category={'c1'} style={[styles.desc, {color: theme['color-basic-600']}]}>{`${formatCallMeta(meta)}`}</Text>
      <Padder scale={1} />
      <CallInspector call={proposal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingVertical: standardPadding, paddingHorizontal: standardPadding / 2},
  desc: {paddingHorizontal: standardPadding},
});
