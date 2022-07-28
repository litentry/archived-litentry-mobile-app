import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import type {DemocracyProposal, DemocracyReferendum, ProposalSubCall} from 'src/api/hooks/useDemocracy';
import type {MotionProposal} from 'src/api/hooks/useCouncilMotions';
import {standardPadding} from '@ui/styles';
import {formatProposalArgs} from 'src/utils/proposal';

type ProposalCallProps = {
  proposal: DemocracyProposal | DemocracyReferendum | MotionProposal;
};

export function ProposalCall({proposal}: ProposalCallProps) {
  if (!proposal.method || !proposal.section) {
    return null;
  }

  return (
    <>
      {Boolean(proposal.meta) && (
        <>
          <Text variant="bodyMedium">{proposal.meta}</Text>
          <Padder scale={0.5} />
        </>
      )}
      <Card mode="outlined">
        <Card.Content>
          <Text>{`${proposal.method}.${proposal.section}():`}</Text>
          <Padder scale={0.5} />
          {proposal.args?.map((arg, index) => (
            <View key={`${index}-${arg.name}`}>
              <Text variant="bodySmall">{formatProposalArgs(arg)}</Text>
              {arg.subCalls &&
                arg.subCalls.map((subCall, subCallIndex) => {
                  if (subCall) {
                    return <SubCall key={`${subCallIndex}-${subCall.method}`} subCall={subCall} />;
                  }
                  return null;
                })}
            </View>
          ))}
        </Card.Content>
      </Card>
    </>
  );
}

type SubCallProps = {
  subCall: ProposalSubCall;
};

function SubCall({subCall}: SubCallProps) {
  const title = `${subCall.method}.${subCall.section}`;
  return (
    <Card mode="outlined" style={styles.subCallContainer}>
      <Card.Content>
        {subCall.meta ? (
          <>
            <Text variant="bodyMedium">{subCall.meta}</Text>
            <Padder scale={0.5} />
          </>
        ) : null}
        <Text variant="bodySmall">{title}</Text>
        {subCall.args?.map((arg, index) => (
          <View key={`${index}-${arg?.name}`}>
            <Text variant="bodySmall">{`${arg?.name}: ${arg?.value}`}</Text>
            {arg?.subCalls &&
              arg.subCalls.map((nestedSubCall, nestedSubCallIndex) => {
                if (nestedSubCall) {
                  return <SubCall key={`${nestedSubCallIndex}-${nestedSubCall.method}`} subCall={nestedSubCall} />;
                }
                return null;
              })}
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  subCallContainer: {
    marginBottom: standardPadding,
  },
});
