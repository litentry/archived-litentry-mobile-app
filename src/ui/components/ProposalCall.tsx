import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Paragraph, Card, Caption, Text} from '@ui/library';
import {Padder} from '@ui/components/Padder';
import type {DemocracyProposal, DemocracyReferendum, ProposalSubCall} from 'src/api/hooks/useDemocracy';
import globalStyles, {standardPadding} from '@ui/styles';
import {MotionProposal} from 'src/api/hooks/useCouncilMotions';
import {Account} from './Account/Account';

type ProposalInfoProps = {
  proposal: DemocracyProposal | DemocracyReferendum | MotionProposal;
};

export function ProposalCall({proposal}: ProposalInfoProps) {
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
          <Text>{`${proposal.method}.${proposal.section}():`}</Text>
          <Padder scale={0.5} />
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
          {'proposer' in proposal && proposal.proposer && (
            <View style={globalStyles.rowAlignCenter}>
              <Caption>{`Proposer: `}</Caption>
              <Account account={proposal.proposer.account} />
            </View>
          )}
          {'beneficiary' in proposal && proposal.beneficiary && (
            <View style={globalStyles.rowAlignCenter}>
              <Caption>{`Beneficiary: `}</Caption>
              <Account account={proposal.beneficiary.account} />
            </View>
          )}
          {'payout' in proposal && proposal.payout && (
            <View style={globalStyles.rowAlignCenter}>
              <Caption>{`Payout: `}</Caption>
              <Caption>{proposal.payout}</Caption>
            </View>
          )}
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
