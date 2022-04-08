import type {DemocracyProposal, DemocracyReferendum, ProposalArg} from 'src/api/hooks/useDemocracy';
import type {MotionProposal} from 'src/api/hooks/useCouncilMotions';
import {stringShorten} from '@polkadot/util';

type Proposal = DemocracyProposal | DemocracyReferendum | MotionProposal;

export function getProposalTitle(proposal: Proposal) {
  if (proposal.method && proposal.section) {
    return `${proposal.method}.${proposal.section}()`;
  } else if (proposal.__typename === 'SubstrateChainDemocracyReferendum') {
    return `preimage ${proposal.imageHash}`;
  }

  return '';
}

export function formatProposalArgs(arg: ProposalArg) {
  switch (arg.type) {
    case 'AccountId':
    case 'MultiAddress':
      return `${arg.name}: ${arg.value ? stringShorten(arg.value.toLowerCase(), 14) : ''}`;

    default:
      return `${arg.name}: ${arg.value}`;
  }
}
