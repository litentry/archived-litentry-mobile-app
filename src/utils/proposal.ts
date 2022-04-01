import type {DemocracyProposal, DemocracyReferendum} from 'src/api/hooks/useDemocracy';
import type {MotionProposal} from 'src/api/hooks/useCouncilMotions';

type Proposal = DemocracyProposal | DemocracyReferendum | MotionProposal;

export function getProposalTitle(proposal: Proposal) {
  if (proposal.method && proposal.section) {
    return `${proposal.method}.${proposal.section}()`;
  } else if (proposal.__typename === 'SubstrateChainDemocracyReferendum') {
    return `preimage ${proposal.imageHash}`;
  }

  return '';
}
