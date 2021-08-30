import {ApiPromise} from '@polkadot/api';
import type {AccountId} from '@polkadot/types/interfaces';
import type {Data, Option} from '@polkadot/types';
import type {ITuple} from '@polkadot/types/types';
import {u8aToString} from '@polkadot/util';

import useApiQuery from 'src/api/hooks/useApiQuery';
import {useSubAccounts} from 'src/api/hooks/useSubAccounts';

export type SubIdentity = {
  accountId: string;
  name: string;
};

const ACCOUNTS_INDEX = 1;

export function useSubIdentities(address?: string) {
  const {data: subAccounts} = useSubAccounts(address);
  const subIds = subAccounts ? subAccounts[ACCOUNTS_INDEX].map((accountId) => accountId.toString()) : [];

  return useApiQuery(
    ['sub-identities', {address, subsCount: subAccounts?.length || 0}],
    async (api: ApiPromise): Promise<Array<SubIdentity>> => {
      const superAccountsOpt = await api.query.identity.superOf.multi<Option<ITuple<[AccountId, Data]>>>(subIds);
      const superAccounts = superAccountsOpt.reduce(
        (
          subIdentities: Array<{accountId: string; name: string}>,
          accountOpt: Option<ITuple<[AccountId, Data]>>,
          index: number,
        ) => {
          const accountId = subIds[index];
          if (accountId && accountOpt.isSome) {
            const [, data] = accountOpt.unwrap();
            if (data.isRaw) {
              subIdentities.push({accountId, name: u8aToString(data.asRaw)});
            }
          }
          return subIdentities;
        },
        [],
      );
      return superAccounts;
    },
    {enabled: Boolean(address) && Boolean(subAccounts)},
  );
}
