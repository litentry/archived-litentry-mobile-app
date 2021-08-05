import type {DeriveCouncilVotes} from '@polkadot/api-derive/types';
import type {AccountId} from '@polkadot/types/interfaces';
import {ApiPromise} from '@polkadot/api';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {useFormatBalance} from 'src/api/hooks/useFormatBalance';

type AccountVotesMap = Record<string, AccountId[]>;

function extractAccountVotes(entries: DeriveCouncilVotes): AccountVotesMap {
  return entries.reduce<AccountVotesMap>((result, [voter, {votes}]) => {
    votes.forEach((candidate) => {
      const address = candidate.toString();

      if (!result[address]) {
        result[address] = [];
      }

      result[address]?.push(voter);
    });

    return result;
  }, {});
}

export function useCouncil() {
  const formatBalance = useFormatBalance();

  return useApiQuery(['council'], async (api: ApiPromise) => {
    const electionsInfo = await api.derive.elections.info();
    const votes = await api.derive.council.votes();
    const members = electionsInfo.members.map(([accountId, balance]) => ({
      accountId,
      backing: formatBalance(balance),
    }));
    const runnersUp = electionsInfo.runnersUp.map(([accountId, balance]) => ({
      accountId,
      backing: formatBalance(balance),
    }));
    const candidates = electionsInfo.candidates;
    const accountVotesMap = extractAccountVotes(votes);

    return {
      members,
      runnersUp,
      candidates,
      getVoters: (account: string) => accountVotesMap[account],
    };
  });
}
