import {ApiPromise} from '@polkadot/api';
import {u8aToString} from '@polkadot/util';
import {Registration} from '@polkadot/types/interfaces';

export async function getAccountIdentityInfo(api: ApiPromise, accountId: string) {
  const registrationOption = await api.query.identity.identityOf(accountId);
  const registration = registrationOption.unwrapOr(undefined);

  if (registration) {
    return {accountId, registration, display: getDisplay(registration, accountId)};
  }

  const superAccountDataOption = await api.query.identity.superOf(accountId);
  const superAccountData = superAccountDataOption.unwrapOr(undefined);

  if (superAccountData) {
    const [superAccountId] = superAccountData;
    const superAccountOption = await api.query.identity.identityOf(superAccountId);
    const superRegistration = superAccountOption.unwrapOr(undefined);

    if (superRegistration) {
      return {
        accountId: superAccountId,
        registration: superRegistration,
        display: getDisplay(superRegistration, accountId),
      };
    }
  } else {
    return {accountId, display: accountId};
  }
}

function getDisplay(registration: Registration, accountId: string) {
  return u8aToString(registration.info.display.asRaw) || accountId;
}
