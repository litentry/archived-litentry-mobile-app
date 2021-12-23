import type {PalletIdentityRegistrarInfo} from '@polkadot/types/lookup';
import {BN_ZERO} from '@polkadot/util';
import useApiQuery from 'src/api/hooks/useApiQuery';

interface RegistrarInfoWithIndex extends PalletIdentityRegistrarInfo {
  index: number;
}

export function useRegistrars(): RegistrarInfoWithIndex[] {
  const {data: registrarsInfo} = useApiQuery('registrars', (api) => api.query.identity.registrars());

  return (registrarsInfo || [])
    .map((r) => r.unwrapOr(undefined))
    .filter((r) => !!r?.fee.gt(BN_ZERO))
    .map((r, index) => Object.assign({}, r, {index}));
}
