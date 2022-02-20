import React from 'react';
import {View} from 'react-native';
import {Paragraph, Card, Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import type {DemocracyProposal} from 'src/api/hooks/useDemocracyProposals';
import type {DemocracyReferendum} from 'src/api/hooks/useDemocracyReferendum';

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
