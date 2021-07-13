import {ApiPromise} from '@polkadot/api';
import {Option} from '@polkadot/types';
import {AccountId, Registration} from '@polkadot/types/interfaces';
import {IdentityInfo} from '@polkadot/types/interfaces/identity/types';
import {useQuery} from 'react-query';
import {useApi} from 'context/ChainApiContext';

type AccountDetail = {
  accountId: AccountId | Uint8Array | string;
  info?: IdentityInfo;
  registration?: Registration;
};

export async function getAccountsDetail(api: ApiPromise, accountIds: AccountId[] | string[] | Uint8Array[]) {
  const registrationOptions = await api.query.identity.identityOf.multi<Option<Registration>>(accountIds);
  const accountsInfo: Array<AccountDetail> = [];

  for (const [index, registrationOption] of registrationOptions.entries()) {
    const registration = registrationOption.unwrapOr(undefined);
    const accountId = accountIds[index];

    if (!accountId) {
      continue;
    }

    if (registration) {
      accountsInfo.push({accountId, info: registration.info, registration});
    } else {
      const superAccountDataOption = await api.query.identity.superOf(accountId);
      const superAccountData = superAccountDataOption.unwrapOr(undefined);

      if (superAccountData) {
        const [superAccountId] = superAccountData;
        const superAccountOption = await api.query.identity.identityOf(superAccountId);
        const superRegistration = superAccountOption.unwrapOr(undefined);

        if (superRegistration) {
          accountsInfo.push({
            accountId: superAccountId,
            info: superRegistration.info,
            registration: superRegistration,
          });
        }
      } else {
        accountsInfo.push({accountId});
      }
    }
  }

  return accountsInfo;
}

function useAccountsDetail(accountIds: AccountId[] | string[] | Uint8Array[]) {
  const {api} = useApi();

  return useQuery(['accounts_detail', accountIds], async () => {
    if (!api) {
      throw new Error('Api not defined');
    }

    return getAccountsDetail(api, accountIds);
  });
}

export default useAccountsDetail;
