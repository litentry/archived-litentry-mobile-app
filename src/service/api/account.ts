import {Option} from '@polkadot/types';
import {AccountId, Registration} from '@polkadot/types/interfaces';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';
import {ApiPromise} from '@polkadot/api';

export async function getAccountsIdentityInfo(accountIds: AccountId[] | string[] | Uint8Array[], api: ApiPromise) {
  const registrationOptions = await api.query.identity.identityOf.multi<Option<Registration>>(accountIds);

  let response: {info: IdentityInfo; accountId: AccountId | Uint8Array | string}[] = [];

  for (const index in registrationOptions) {
    const registration = registrationOptions[index]!.unwrapOr(undefined);
    if (registration) {
      response.push({accountId: accountIds[index]!, info: registration.info});
    } else {
      // check for parent accounts
      const superAccount = ((await api.query.identity.superOf(accountIds[index])) as any).unwrapOr(undefined);
      if (superAccount) {
        const [accountId] = superAccount;
        const r = (await api.query.identity.identityOf(accountId)).unwrapOr(undefined);
        if (r) {
          response.push({accountId, info: r.info});
        }
      }
    }
  }

  return response;
}
