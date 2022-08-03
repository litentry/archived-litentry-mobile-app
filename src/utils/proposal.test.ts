import {MotionProposal} from 'src/api/hooks/useCouncilMotions';
import type {SubstrateChainProposalArg} from 'src/generated/litentryGraphQLTypes';
import {formatProposalArgs, getProposalTitle} from './proposal';

type Proposal = MotionProposal;

test('getProposalTitle  test case for empty proposal', () => {
  const proposal = {} as Proposal;
  const proposalTitle = getProposalTitle(proposal);
  expect(proposalTitle).toBe('');
});

test('getProposalTitle  test case for method and section', () => {
  const proposal = {method: 'getProposalTitle', section: 'methodSection'} as Proposal;
  const proposalTitle = getProposalTitle(proposal);
  expect(proposalTitle).toBe('getProposalTitle.methodSection()');
});

test('formatProposalArgs when the value prop is defined', () => {
  const args = {
    name: 'AccountId',
    type: 'string',
    subCall: 'subcall',
    value: '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw',
  } as SubstrateChainProposalArg;

  const proposalArgs = formatProposalArgs(args);
  expect(proposalArgs).toEqual('AccountId: 1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw');
});

test('formatProposalArgs when the value prop is not defined', () => {
  const args = {
    name: 'AccountId',
    type: 'AccountId',
    subCall: 'subcall',
  } as SubstrateChainProposalArg;

  const proposalArgs = formatProposalArgs(args);
  expect(proposalArgs).toEqual('AccountId: ');
});

test('formatProposalArgs when the type prop is not AccountId or MultiAddress', () => {
  const args = {
    name: 'AccountId',
    type: 'PropTest',
    subCall: 'subcall',
    value: '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw',
  } as SubstrateChainProposalArg;

  const proposalArgs = formatProposalArgs(args);
  expect(proposalArgs).toEqual('AccountId: 1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw');
});
