import React, {useContext} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import {getAccountsIdentityInfo} from 'service/api/account';
import {AccountId} from '@polkadot/types/interfaces';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';
import {u8aToString} from '@polkadot/util';
import {Text} from '@ui-kitten/components';

export function Account({id, children}: {id: string; children: React.ReactNode}) {
  const {api} = useContext(ChainApiContext);

  const {value} = useAsyncRetry(async () => (api ? await getAccountsIdentityInfo([id], api) : undefined), [api, id]);
  const account = value?.[0];
  console.log(value);

  if (!account) {
    return null;
  }

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}

const AccountContext = React.createContext<{info: IdentityInfo; accountId: string | AccountId | Uint8Array}>({
  info: undefined as unknown as IdentityInfo,
  accountId: '',
});

export function AccountName() {
  const {info} = useContext(AccountContext);
  const text = u8aToString(info.display.asRaw);
  return <Text>{text}</Text>;
}
