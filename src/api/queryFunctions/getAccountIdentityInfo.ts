import {ApiPromise} from '@polkadot/api';
import {u8aToString} from '@polkadot/util';
import {Registration, AccountId} from '@polkadot/types/interfaces';

type IdentityInfo =
  | {
      hasIdentity: true;
      hasJudgements: boolean;
      accountId: string | AccountId;
      display: string;
      registration: Registration;
    }
  | {
      hasIdentity: false;
      hasJudgements: false;
      accountId: string;
      display: undefined;
      registration: undefined;
    };

export async function getAccountIdentityInfo(api: ApiPromise, accountId: string): Promise<IdentityInfo> {
  const registrationOption = await api.query.identity.identityOf(accountId);
  const registration = registrationOption.unwrapOr(undefined);

  if (registration) {
    return {
      hasIdentity: true,
      hasJudgements: registration.judgements.length > 0,
      accountId,
      registration,
      display: getDisplay(registration, accountId),
    };
  }

  const superAccountDataOption = await api.query.identity.superOf(accountId);
  const superAccountData = superAccountDataOption.unwrapOr(undefined);

  if (superAccountData) {
    const [superAccountId] = superAccountData;
    const superAccountOption = await api.query.identity.identityOf(superAccountId);
    const superRegistration = superAccountOption.unwrapOr(undefined);

    if (superRegistration) {
      return {
        hasIdentity: true,
        hasJudgements: superRegistration.judgements.length > 0,
        accountId: superAccountId,
        registration: superRegistration,
        display: getDisplay(superRegistration, accountId),
      };
    }
  }

  return {hasIdentity: false, hasJudgements: false, accountId, display: undefined, registration: undefined};
}

function getDisplay(registration: Registration, accountId: string) {
  return u8aToString(registration.info.display.asRaw) || accountId;
}
