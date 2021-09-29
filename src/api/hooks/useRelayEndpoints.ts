import {ApiPromise} from '@polkadot/api';
import {createWsEndpoints} from '@polkadot/apps-config/endpoints';
import type {LinkOption} from '@polkadot/apps-config/endpoints/types';
import useApiQuery from './useApiQuery';

const endpoints = createWsEndpoints((key: string, value: string | undefined) => value || key);

function extractRelayEndpoints(genesisHash: string): LinkOption[] {
  return endpoints.filter(({genesisHashRelay}) => genesisHash === genesisHashRelay);
}

export function useRelayEndpoints() {
  return useApiQuery('relayEndpoints', (api: ApiPromise) => {
    const genesisHash = api.genesisHash.toHex();
    return extractRelayEndpoints(genesisHash);
  });
}
