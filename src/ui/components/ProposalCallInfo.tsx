import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Paragraph, Card, Caption} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import type {DemocracyProposal, DemocracyReferendum, ProposalSubCall} from 'src/api/hooks/useDemocracy';
import {standardPadding} from '@ui/styles';

type ProposalInfoProps = {
  proposal: DemocracyProposal | DemocracyReferendum;
};

export function ProposalCallInfo({proposal}: ProposalInfoProps) {
  return (
    <>
      {proposal.meta && (
        <>
          <Paragraph>{proposal.meta}</Paragraph>
          <Padder scale={0.5} />
        </>
      )}
      <Card mode="outlined">
        <Card.Content>
          {proposal.args?.map((arg, index) => (
            <View key={`${index}-${arg.name}`}>
              <Caption>{`${arg.name}: ${arg.value}`}</Caption>
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
        {subCall.meta && (
          <>
            <Paragraph>{subCall.meta}</Paragraph>
            <Padder scale={0.5} />
          </>
        )}
        <Caption>{title}</Caption>
        {subCall.args?.map((arg, index) => (
          <View key={`${index}-${arg?.name}`}>
            <Caption>{`${arg?.name}: ${arg?.value}`}</Caption>
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
