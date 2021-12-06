import React from 'react';
import {View} from 'react-native';
import type {Proposal as ProposalType} from '@polkadot/types/interfaces';
import {Padder} from '@ui/components/Padder';
import {Paragraph} from '@ui/library';
import {CallInspector} from 'src/packages/call_inspector/CallInspector';
import {formatCallMeta} from 'src/packages/call_inspector/useCallParams';

export function ProposalInfo({proposal}: {proposal: ProposalType}) {
  const {meta} = proposal.registry.findMetaCall(proposal.callIndex);

  return (
    <View>
      <Padder scale={1} />
      <Paragraph>{`${formatCallMeta(meta)}`}</Paragraph>
      <Padder scale={1} />
      <CallInspector call={proposal} />
    </View>
  );
}
