import type {SubstrateChainProposalArg} from 'src/generated/litentryGraphQLTypes';
import type {MotionProposal} from 'src/api/hooks/useCouncilMotions';
import {stringShorten} from '@polkadot/util';

type Proposal = MotionProposal;

export function getProposalTitle(proposal: Proposal) {
  if (proposal.method && proposal.section) {
    return `${proposal.method}.${proposal.section}()`;
  }

  return '';
}

export function formatProposalArgs(arg: SubstrateChainProposalArg) {
  switch (arg.type) {
    case 'AccountId':
    case 'MultiAddress':
      return `${arg.name}: ${arg.value ? stringShorten(arg.value.toLowerCase(), 14) : ''}`;

    default:
      return `${arg.name}: ${arg.value}`;
  }
}
