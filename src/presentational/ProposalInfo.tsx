import type {Proposal as ProposalType} from '@polkadot/types/interfaces';
import Padder from 'presentational/Padder';
import React from 'react';
import {View} from 'react-native';
import {Paragraph} from 'src/packages/base_components';
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
