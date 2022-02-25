import React from 'react';
import {View} from 'react-native';
import {Paragraph, Card, Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import type {DemocracyProposal, DemocracyReferendum} from 'src/api/hooks/useDemocracy';

type ProposalInfoProps = {
  proposal: DemocracyProposal | DemocracyReferendum;
};

export function ProposalCallInfo({proposal}: ProposalInfoProps) {
  return (
    <View>
      <Paragraph>{proposal.meta}</Paragraph>
      <Padder scale={1} />
      <Card>
        <Card.Content>
          {proposal.args.map((arg) => (
            <Caption key={arg.name}>{`${arg.name}: ${arg.value}`}</Caption>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
}
