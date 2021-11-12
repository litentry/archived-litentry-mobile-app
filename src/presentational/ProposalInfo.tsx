import type {Proposal as ProposalType} from '@polkadot/types/interfaces';
import {Text, useTheme} from '@ui-kitten/components';
import Padder from 'presentational/Padder';
import React from 'react';
import {View} from 'react-native';
import {CallInspector} from 'src/packages/call_inspector/CallInspector';
import {formatCallMeta} from 'src/packages/call_inspector/useCallParams';

export function ProposalInfo({proposal}: {proposal: ProposalType}) {
  const theme = useTheme();
  const {meta} = proposal.registry.findMetaCall(proposal.callIndex);

  return (
    <View>
      <Text category={'c1'} style={{color: theme['color-basic-600']}}>{`${formatCallMeta(meta)}`}</Text>
      <Padder scale={1} />
      <CallInspector call={proposal} />
    </View>
  );
}
