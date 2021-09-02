import {ApiPromise} from '@polkadot/api';
import {u8aToString} from '@polkadot/util';
import {Registration, AccountId} from '@polkadot/types/interfaces';
import {DeriveAccountRegistration} from '@polkadot/api-derive/accounts/types';

type IdentityInfo =
  | {
      hasIdentity: true;
      hasJudgements: boolean;
      accountId: string | AccountId;
      display: string;
      registration: DeriveAccountRegistration;
    }
  | {
      hasIdentity: false;
      hasJudgements: false;
      accountId: string;
      display: undefined;
      registration: undefined;
    };

export async function getAccountIdentityInfo(api: ApiPromise, accountId: string): Promise<IdentityInfo> {
  const info = await api.derive.accounts.info(accountId);

  if (info) {
    let display = info.identity.display ?? accountId;
    if (info.identity.displayParent) {
      if (info.identity.display) {
        display = `${info.identity.displayParent}/${info.identity.display}`;
      } else {
        display = `${info.identity.displayParent}/${info.identity.displayParent}`;
      }
    }

    return {
      hasIdentity: true,
      hasJudgements: info.identity.judgements.length > 0,
      accountId,
      registration: info.identity,
      display,
    };
  }

  return {hasIdentity: false, hasJudgements: false, accountId, display: undefined, registration: undefined};
}
