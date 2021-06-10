import {useContext, useMemo} from 'react';

import {RegistrarInfo} from '@polkadot/types/interfaces';
import {Option} from '@polkadot/types';
import {BN_ZERO} from '@polkadot/util';

import {ChainApiContext} from 'src/context/ChainApiContext';
import {useCall} from 'src/hook/useCall';

function toRegistrar(wrappedRegistrar: Option<RegistrarInfo>, index: number) {
  const unwrappedRegistrar = wrappedRegistrar.unwrapOr({account: '', fee: BN_ZERO});
  return {...unwrappedRegistrar, index};
}

type Registrar = ReturnType<typeof toRegistrar>;

function withFees(registrar: Registrar) {
  return registrar.fee.gt(BN_ZERO);
}

export function useRegistrars(): ReadonlyArray<Registrar> {
  const {api} = useContext(ChainApiContext);
  const registrarsInfo = useCall<Option<RegistrarInfo>[]>(api?.query.identity.registrars);

  return useMemo(() => {
    return (registrarsInfo || []).map(toRegistrar).filter(withFees);
  }, [registrarsInfo]);
}
