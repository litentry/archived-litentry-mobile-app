import {Option} from '@polkadot/types';
import {AccountId, Registration} from '@polkadot/types/interfaces';
import {ApiPromise} from '@polkadot/api';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';

export async function getAccountsIdentityInfo(accountIds: AccountId[], api: ApiPromise) {
  const registrationOptions = await api.query.identity.identityOf.multi<Option<Registration>>(accountIds);

  const response: {info: IdentityInfo; accountId: AccountId}[] = [];

  for (const index in registrationOptions) {
    const registration = registrationOptions[index].unwrapOr(undefined);
    if (registration) {
      response.push({accountId: accountIds[index], info: registration.info});
    } else {
      // check for parent accounts
      const superAccount = (await api.query.identity.superOf(accountIds[index])).unwrapOr(undefined);

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
