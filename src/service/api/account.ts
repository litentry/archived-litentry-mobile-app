import {Data, Option} from '@polkadot/types';
import {AccountId, Registration} from '@polkadot/types/interfaces';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';
import {ApiPromise} from '@polkadot/api';
import {ITuple} from '@polkadot/types/types';
import {AddressDetailType} from 'src/types';

export async function getAccountsIdentityInfo(accountIds: AccountId[] | string[] | Uint8Array[], api: ApiPromise) {
  const registrationOptions = await api.query.identity.identityOf.multi<Option<Registration>>(accountIds);

  const response: {info?: IdentityInfo; accountId: AccountId | Uint8Array | string; registration?: Registration}[] = [];

  for (const index in registrationOptions) {
    const registration = registrationOptions[index]!.unwrapOr(undefined);
    if (registration) {
      response.push({accountId: accountIds[index]!, info: registration.info, registration});
    } else {
      // check for parent accounts
      const superAccount = (
        (await api.query.identity.superOf(accountIds[index])) as Option<ITuple<[AccountId, Data]>>
      ).unwrapOr(undefined);

      if (superAccount) {
        const [accountId] = superAccount;
        const r = ((await api.query.identity.identityOf(accountId)) as Option<Registration>).unwrapOr(undefined);
        if (r) {
          response.push({accountId, info: r.info});
        }
      } else {
        response.push({accountId: accountIds[index]!});
      }
    }
  }

  return response;
}
