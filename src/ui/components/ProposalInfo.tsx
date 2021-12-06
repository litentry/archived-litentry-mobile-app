import React from 'react';
import {View} from 'react-native';
import type {Proposal as ProposalType} from '@polkadot/types/interfaces';
import {Padder} from '@ui/components/Padder';
import {Paragraph} from '@ui/library';
import {ProposalCall} from '@ui/components/ProposalCall';
import {formatCallMeta} from 'src/utils';

export function ProposalInfo({proposal}: {proposal: ProposalType}) {
  const {meta} = proposal.registry.findMetaCall(proposal.callIndex);

  return (
    <View>
      <Padder scale={1} />
      <Paragraph>{`${formatCallMeta(meta)}`}</Paragraph>
      <Padder scale={1} />
      <ProposalCall call={proposal} />
    </View>
  );
}
