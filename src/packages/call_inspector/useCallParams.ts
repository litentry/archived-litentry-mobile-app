import {Compact, getTypeDef} from '@polkadot/types';
import {Call, FunctionMetadataLatest, ProposalIndex} from '@polkadot/types/interfaces';
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

export function useParams(proposal: Call): Param[] {
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

/**
 * functions bellow help extract useful data
 * from each motion object. they are mostly loosely copied from
 * https://github.com/polkadot-js/apps/blob/master/packages/react-components/src/Call.tsx
 */

export function formatCallMeta(meta?: FunctionMetadataLatest): string {
  if (!meta || !meta.docs.length) {
    return '';
  }

  const strings = meta.docs.map((doc) => doc.toString().trim());
  const firstEmpty = strings.findIndex((doc) => !doc.length);
  const combined = (firstEmpty === -1 ? strings : strings.slice(0, firstEmpty))
    .join(' ')
    .replace(/#(<weight>| <weight>).*<\/weight>/, '');
  const parts = splitParts(combined.replace(/\\/g, '').replace(/`/g, ''));

  return parts.join(' ');
}

function splitSingle(value: string[], sep: string): string[] {
  return value.reduce((result: string[], value: string): string[] => {
    return value.split(sep).reduce((result: string[], value: string) => result.concat(value), result);
  }, []);
}

function splitParts(value: string): string[] {
  return ['[', ']'].reduce((result: string[], sep) => splitSingle(result, sep), [value]);
}
