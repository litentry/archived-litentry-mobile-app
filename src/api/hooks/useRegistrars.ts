import type {PalletIdentityRegistrarInfo} from '@polkadot/types/lookup';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {notEmpty} from 'src/utils';

export interface RegistrarInfoWithIndex extends PalletIdentityRegistrarInfo {
  index: number;
}

export function useRegistrars(): RegistrarInfoWithIndex[] {
  const {data: registrarsInfo} = useApiQuery('registrars', (api) => api.query.identity.registrars());

  return (registrarsInfo || [])
    .map((r) => r.unwrapOr(undefined))
    .filter(notEmpty)
    .map((r, index) => Object.assign({}, r, {index}));
}
