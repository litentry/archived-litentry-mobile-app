import {MotionProposal} from 'src/api/hooks/useCouncilMotions';
import {DemocracyProposal, DemocracyReferendum, ProposalArg} from 'src/api/hooks/useDemocracy';
import {formatProposalArgs, getProposalTitle} from './proposal';

type Proposal = DemocracyProposal | DemocracyReferendum | MotionProposal;

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

test('getProposalTitle  test case for preimage', () => {
  const proposal = {__typename: 'SubstrateChainDemocracyReferendum', imageHash: 'imageHash'} as Proposal;
  const proposalTitle = getProposalTitle(proposal);
  expect(proposalTitle).toBe('preimage imageHash');
});

test('formatProposalArgs when the value prop is defined', () => {
  const args = {
    name: 'AccountId',
    type: 'string',
    subCall: 'subcall',
    value: '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw',
  } as ProposalArg;

  const proposalArgs = formatProposalArgs(args);
  expect(proposalArgs).toEqual('AccountId: 1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw');
});

test('formatProposalArgs when the value prop is not defined', () => {
  const args = {
    name: 'AccountId',
    type: 'AccountId',
    subCall: 'subcall',
  } as ProposalArg;

  const proposalArgs = formatProposalArgs(args);
  expect(proposalArgs).toEqual('AccountId: ');
});

test('formatProposalArgs when the type prop is not AccountId or MultiAddress', () => {
  const args = {
    name: 'AccountId',
    type: 'PropTest',
    subCall: 'subcall',
    value: '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw',
  } as ProposalArg;

  const proposalArgs = formatProposalArgs(args);
  expect(proposalArgs).toEqual('AccountId: 1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw');
});
