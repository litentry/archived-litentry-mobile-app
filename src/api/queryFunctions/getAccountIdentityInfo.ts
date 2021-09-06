import {ApiPromise} from '@polkadot/api';
import {DeriveAccountRegistration} from '@polkadot/api-derive/accounts/types';
import {AccountId} from '@polkadot/types/interfaces';

export type IdentityInfo =
  | {
      hasIdentity: boolean;
      hasJudgements: boolean;
      accountId: string | AccountId;
      display: string;
      registration: DeriveAccountRegistration;
    }
  | {
      hasIdentity: false;
      hasJudgements: false;
      accountId: string;
      display: string;
      registration: undefined;
    };

export async function getAccountIdentityInfo(api: ApiPromise, accountId: string): Promise<IdentityInfo> {
  const info = await api.derive.accounts.info(accountId);

  if (info) {
    const display = info.identity.displayParent
      ? `${info.identity.displayParent}/${info.identity.display || info.identity.displayParent}`
      : info.identity.display ?? accountId;

    return {
      hasIdentity: Boolean(info.identity.display),
      hasJudgements: info.identity.judgements.length > 0,
      accountId,
      registration: info.identity,
      display,
    };
  }

  return {hasIdentity: false, hasJudgements: false, accountId, display: accountId, registration: undefined};
}
