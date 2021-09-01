import {AccountId} from '@polkadot/types/interfaces';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';
import {useAccountIdentityInfo} from 'src/api/hooks/useAccountIdentityInfo';
import {DeriveAccountRegistration} from '@polkadot/api-derive/types';

export function Account({
  id,
  children,
}: {
  id: string;
  children: (info: {
    info?: IdentityInfo;
    registration?: DeriveAccountRegistration;
    accountId: string | AccountId | Uint8Array;
  }) => JSX.Element;
}) {
  const {data: account} = useAccountIdentityInfo(id);

  if (!account) {
    return children({accountId: id});
  }

  return children(account);
}
