import React, {useContext} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';
import {getAccountsIdentityInfo} from 'service/api/account';
import {AccountId, Registration} from '@polkadot/types/interfaces';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';
import {useQuery} from 'react-query';

export function Account({
  id,
  children,
}: {
  id: string;
  children: (info: {
    info?: IdentityInfo;
    registration?: Registration;
    accountId: string | AccountId | Uint8Array;
  }) => JSX.Element;
}) {
  const {data: account} = useAccountIdentity(id);

  if (!account) {
    return children({accountId: id});
  }

  return children(account);
}

export function useAccountIdentity(id?: string) {
  const {api} = useContext(ChainApiContext);
  if (!id) {
    throw new Error('Account Not Provided!');
  }

  return useQuery(
    ['account_identity', id],
    async () => {
      console.log('GETTING IDENTITY');
      const accounts = api ? await getAccountsIdentityInfo([id], api) : undefined;
      return accounts?.[0];
    },
    {staleTime: 1000 * 60},
  );
}
