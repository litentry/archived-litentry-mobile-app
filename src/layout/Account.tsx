import React, {useContext} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import {getAccountsIdentityInfo} from 'service/api/account';
import {AccountId, Registration} from '@polkadot/types/interfaces';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';

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
  const {api} = useContext(ChainApiContext);

  const {value} = useAsyncRetry(async () => (api ? await getAccountsIdentityInfo([id], api) : undefined), [api, id]);
  const account = value?.[0];

  if (!account) {
    return children({accountId: id});
  }

  return children(account);
}
