import {u8aConcat, u8aToU8a, hexToU8a} from '@polkadot/util';
import {CRYPTO_SR25519, SUBSTRATE_ID} from 'src/constants';
import {HexString} from 'polkadot-api';

export function createSignPayload(
  decodedAddress: HexString,
  cmd: number,
  payload: HexString,
  genesisHash: string | HexString,
): Uint8Array {
  return u8aConcat(
    SUBSTRATE_ID,
    CRYPTO_SR25519,
    new Uint8Array([cmd]),
    hexToU8a(decodedAddress),
    hexToU8a(payload),
    u8aToU8a(genesisHash),
  );
}
