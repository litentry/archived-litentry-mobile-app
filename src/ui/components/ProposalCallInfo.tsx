import React from 'react';
import {View} from 'react-native';
import {Paragraph, Card, Caption, Text} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import type {DemocracyProposal} from 'src/api/hooks/useDemocracyProposals';
import type {DemocracyReferendum} from 'src/api/hooks/useDemocracyReferendum';
import type {MotionProposal} from 'src/api/hooks/useCouncilMotions';

type ProposalInfoProps = {
  proposal: DemocracyProposal | DemocracyReferendum | MotionProposal;
};

export function ProposalCallInfo({proposal}: ProposalInfoProps) {
  return (
    <View>
      {'meta' in proposal && <Paragraph>{proposal.meta}</Paragraph>}
      <Padder scale={1} />
      <Card>
        <Card.Content>
          <Text>{`${proposal.method}.${proposal.section}():`}</Text>
          {proposal.args?.map((arg) => (
            <Caption key={arg.name}>{`${arg.name}: ${arg.value}`}</Caption>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
}
