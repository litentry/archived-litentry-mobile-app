import {Compact, getTypeDef} from '@polkadot/types';
import {Call, ProposalIndex} from '@polkadot/types/interfaces';
import {Codec, IExtrinsic, IMethod, TypeDef} from '@polkadot/types/types';
import {ChainApiContext} from 'context/ChainApiContext';
import {useContext} from 'react';
import {useQuery} from 'react-query';

const METHOD_TREA = ['approveProposal', 'rejectProposal'];

export interface Param {
  name: string;
  type: TypeDef;
  value?: Codec;
}

export function useProposalCallParams(proposal: Call): Param[] {
  const {api} = useContext(ChainApiContext);
  const {method, section} = proposal.registry.findMetaCall(proposal.callIndex);
  const isTreasury = section === 'treasury' && METHOD_TREA.includes(method);
  const proposalId = isTreasury ? (proposal.args[0] as Compact<ProposalIndex>).unwrap() : undefined;
  const {data: treasuryProposal} = useQuery(
    ['proposal', proposalId?.toString()],
    () => (proposalId ? api?.query.treasury.proposals(proposalId).then((p) => p.unwrapOr(undefined)) : undefined),
    {
      enabled: !!proposalId,
    },
  );
  const extractedParams = extractParams(proposal);
  if (treasuryProposal) {
    extractedParams.push({type: getTypeDef('AccountId'), value: treasuryProposal.beneficiary, name: 'beneficiary'});
    extractedParams.push({type: getTypeDef('AccountId'), value: treasuryProposal.proposer, name: 'proposer'});
    extractedParams.push({type: getTypeDef('Balance'), value: treasuryProposal.value, name: 'payout'});
  }
  return extractedParams;
}

function extractParams(value: IExtrinsic | IMethod): Param[] {
  const params = value.meta.args.map(
    ({name, type}, index): Param => ({
      name: name.toString(),
      type: getTypeDef(type.toString()),
      value: value.args[index],
    }),
  );
  return params;
}
