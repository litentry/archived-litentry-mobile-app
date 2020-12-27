// Note: have to patch _qrcode
import _qrcode from 'qrcode-generator';

import {logger} from 'react-native-logs';
import {ansiColorConsoleSync} from 'react-native-logs/dist/transports/ansiColorConsoleSync';
import Reactotron from 'reactotron-react-native';
import {u8aConcat, u8aToU8a} from '@polkadot/util';
import {FRAME_SIZE, SUBSTRATE_ID, CRYPTO_SR25519} from './constants';
import {decodeAddress, blake2AsU8a} from '@polkadot/util-crypto';
import {SignerPayloadJSON} from '@polkadot/types/types';
import {ExtrinsicPayload} from '@polkadot/types/interfaces';
import registry from 'src/typeRegistry';
import {AccountAddressType} from './types';
import {trim} from 'lodash';

const MULTIPART = new Uint8Array([0]);

// A small hurdle to jump through, just to get the default/default correct (as generated)
export const QrCode: typeof _qrcode = _qrcode;

// HACK The default function take string -> number[], the Uint8array is compatible
// with that signature and the use thereof
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
(QrCode as any).stringToBytes = (data: Uint8Array): Uint8Array => data;

export function encodeNumber(value: number): Uint8Array {
  // eslint-disable-next-line no-bitwise
  return new Uint8Array([value >> 8, value & 0xff]);
}

export const createLogger = (name: string) => {
  const log = logger.createLogger({
    transport: ansiColorConsoleSync,
    transportOptions: {hideDate: true, loggerName: name},
  });

  if (__DEV__) {
    log.setSeverity('debug');
  } else {
    log.setSeverity('error');
  }

  return log;
};

export function createFrames(input: Uint8Array): Uint8Array[] {
  const frames = [];
  let idx = 0;

  while (idx < input.length) {
    frames.push(input.subarray(idx, idx + FRAME_SIZE));

    idx += FRAME_SIZE;
  }

  return frames.map(
    (frame, index: number): Uint8Array =>
      u8aConcat(
        MULTIPART,
        encodeNumber(frames.length),
        encodeNumber(index),
        frame,
      ),
  );
}

export function createSignPayload(
  address: string,
  cmd: number,
  payload: string | Uint8Array,
  genesisHash: string | Uint8Array,
): Uint8Array {
  return u8aConcat(
    SUBSTRATE_ID,
    CRYPTO_SR25519,
    new Uint8Array([cmd]),
    decodeAddress(address),
    u8aToU8a(payload),
    u8aToU8a(genesisHash),
  );
}

export const toSignPayload = (payload: SignerPayloadJSON) => {
  // limit size of the transaction
  const isQrHashed = payload.method.length > 5000;
  console.log('ExtrinsicPayload', payload);
  const wrapper: ExtrinsicPayload = registry.createType(
    'ExtrinsicPayload',
    payload,
    {
      version: payload.version,
    },
  );

  const qrPayload = isQrHashed
    ? blake2AsU8a(wrapper.toU8a(true))
    : wrapper.toU8a(true);

  return {
    isQrHashed,
    qrAddress: payload.address,
    qrPayload,
  };
};

/*
 * @return strippedData: the rawBytes from react-native-camera, stripped of the ec11 padding to fill the frame size. See: decoders.js
 * N.B. Substrate oversized/multipart payloads will already be hashed at this point.
 */
export function rawDataToU8A(rawData: string): Uint8Array | null {
  if (!rawData) {
    return null;
  }

  // Strip filler bytes padding at the end
  if (rawData.substr(-2) === 'ec') {
    rawData = rawData.substr(0, rawData.length - 2);
  }

  while (rawData.substr(-4) === 'ec11') {
    rawData = rawData.substr(0, rawData.length - 4);
  }

  // Verify that the QR encoding is binary and it's ending with a proper terminator
  if (rawData.substr(0, 1) !== '4' || rawData.substr(-1) !== '0') {
    return null;
  }

  // Strip the encoding indicator and terminator for ease of reading
  rawData = rawData.substr(1, rawData.length - 2);

  const length8 = parseInt(rawData.substr(0, 2), 16) || 0;
  const length16 = parseInt(rawData.substr(0, 4), 16) || 0;
  let length = 0;

  // Strip length prefix
  if (length8 * 2 + 2 === rawData.length) {
    rawData = rawData.substr(2);
    length = length8;
  } else if (length16 * 2 + 4 === rawData.length) {
    rawData = rawData.substr(4);
    length = length16;
  } else {
    return null;
  }

  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = parseInt(rawData.substr(i * 2, 2), 16);
  }

  return bytes;
}

export function parseAddress(payload: string): AccountAddressType {
  const parts = trim(payload).split(':').filter(Boolean);

  if (parts.length === 1) {
    return {protocol: '', address: parts[0], name: ''};
  }

  if (parts.length !== 4) {
    throw new Error('address format wrong');
  }

  return {protocol: parts[0], address: parts[1], name: parts[3]};
}

export const ReactotronDebug = Reactotron.debug;
