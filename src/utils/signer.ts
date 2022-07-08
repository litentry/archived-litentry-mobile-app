import {u8aConcat, u8aToU8a} from '@polkadot/util';
import {CRYPTO_SR25519, SUBSTRATE_ID} from 'src/constants';

export function createSignPayload(
  decodedAddress: Uint8Array,
  cmd: number,
  payload: string | Uint8Array,
  genesisHash: string | Uint8Array,
): Uint8Array {
  return u8aConcat(
    SUBSTRATE_ID,
    CRYPTO_SR25519,
    new Uint8Array([cmd]),
    decodedAddress,
    u8aToU8a(payload),
    u8aToU8a(genesisHash),
  );
}
