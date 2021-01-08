import React, {useContext} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';

import {RegistrarInfo} from '@polkadot/types/interfaces';
import {useCall} from 'src/hook/useCall';
import {Option, Vec} from '@polkadot/types';

export type InjectedPropTypes = {
  registrars: Vec<Option<RegistrarInfo>> | undefined;
};

function withRegistrarList<T>(
  Comp: React.ComponentType<T & InjectedPropTypes>,
) {
  return function Hoc(props: T) {
    const {api} = useContext(ChainApiContext);

    const registrars = useCall<Vec<Option<RegistrarInfo>>>(
      api?.query.identity.registrars,
    );

    return <Comp {...props} registrars={registrars} />;
  };
}

export default withRegistrarList;
