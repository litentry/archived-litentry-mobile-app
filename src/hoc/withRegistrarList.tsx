import React, {useContext} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';

import {RegistrarInfo} from '@polkadot/types/interfaces';
import {useCall} from 'src/hook/useCall';
import {Option, Vec} from '@polkadot/types';
import {BN_ZERO} from '@polkadot/util';

export type InjectedPropTypes = {
  registrars: Vec<Option<RegistrarInfo>> | undefined;
};

function withRegistrarList<T>(Comp: React.ComponentType<T & InjectedPropTypes>) {
  return function Hoc(props: T) {
    const {api} = useContext(ChainApiContext);

    const registrars = useCall<Vec<Option<RegistrarInfo>>>(api?.query.identity.registrars);

    return <Comp {...props} registrars={registrars} />;
  };
}

export const getValidRegistrars = (registrars: InjectedPropTypes['registrars']) => {
  if (!registrars) {
    return [];
  }

  return registrars.filter((registrar) => {
    // filter out the ones with fee is zero
    const unwraped = registrar.unwrapOr({fee: BN_ZERO, account: ''});
    return unwraped.fee.gt(BN_ZERO);
  });
};

export const getSortedRegistrars = (registrars: Array<Option<RegistrarInfo>> | undefined) => {
  if (!registrars) {
    return [];
  }

  return registrars.sort((a, b) => {
    if (a.unwrapOr({fee: BN_ZERO}).fee.toNumber() > b.unwrapOr({fee: BN_ZERO}).fee.toNumber()) {
      return 1;
    }
    return -1;
  });
};

export default withRegistrarList;
