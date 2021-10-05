import type {LinkOption} from '@polkadot/apps-config/endpoints/types';
import type BN from 'bn.js';
import {useRelayEndpoints} from './useRelayEndpoints';
import {bnToBn} from '@polkadot/util';

export function extractParaEndpoints(allEndpoints: LinkOption[], paraId: BN | number): LinkOption[] {
  const numId = bnToBn(paraId).toNumber();
  return allEndpoints.filter(({paraId}) => paraId === numId);
}

// @TODO: move it somewhere else?? since it is not using the api
export function useParaEndpoints(paraId: BN | number) {
  const {data: endpoints} = useRelayEndpoints();
  if (endpoints != null) {
    return extractParaEndpoints(endpoints, paraId);
  }
}
