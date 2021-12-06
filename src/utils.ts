// Note: have to patch _qrcode
import _qrcode from 'qrcode-generator';

import Reactotron from 'reactotron-react-native';
import {u8aConcat} from '@polkadot/util';
import {ADDRESS_PREFIX_KUSAMA, ADDRESS_PREFIX_LITENTRY, ADDRESS_PREFIX_POLKADOT, FRAME_SIZE} from './constants';
import {checkAddress, isEthereumChecksum} from '@polkadot/util-crypto';
import {FunctionMetadataLatest} from '@polkadot/types/interfaces';
import {AccountAddressType, NetworkType} from './types';
import {trim} from 'lodash';

const MULTIPART = new Uint8Array([0]);

// A small hurdle to jump through, just to get the default/default correct (as generated)
export const QrCode: typeof _qrcode = _qrcode;

// HACK The default function take string -> number[], the Uint8array is compatible
// with that signature and the use thereof
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(QrCode as any).stringToBytes = (data: Uint8Array): Uint8Array => data;

export function encodeNumber(value: number): Uint8Array {
  // eslint-disable-next-line no-bitwise
  return new Uint8Array([value >> 8, value & 0xff]);
}

export function createFrames(input: Uint8Array): Uint8Array[] {
  const frames = [];
  let idx = 0;

  while (idx < input.length) {
    frames.push(input.subarray(idx, idx + FRAME_SIZE));

    idx += FRAME_SIZE;
  }

  return frames.map(
    (frame, index: number): Uint8Array => u8aConcat(MULTIPART, encodeNumber(frames.length), encodeNumber(index), frame),
  );
}

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {protocol: '', address: parts[0]!, name: ''};
  }

  if (parts.length !== 4) {
    throw new Error('address format wrong');
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return {protocol: parts[0], address: parts[1]!, name: parts[3]!};
}

export const ReactotronDebug = Reactotron.debug;

export const isAddressValid = (network: NetworkType, address: string) => {
  switch (network.key) {
    case 'polkadot':
      return checkAddress(address, ADDRESS_PREFIX_POLKADOT)[0];
    case 'kusama':
      return checkAddress(address, ADDRESS_PREFIX_KUSAMA)[0];
    case 'litentry_test':
      return checkAddress(address, ADDRESS_PREFIX_LITENTRY)[0];
    case 'ethereum':
      return isEthereumChecksum(address); // fixme
    default:
      return false;
  }
};
export const WHITESPACE = [' ', '\t'];

export function validateFormField(
  hasValue: boolean,
  value: string | null | undefined,
  minLength: number,
  includes: string[],
  excludes: string[],
  starting: string[],
  notStarting: string[] = WHITESPACE,
  notEnding: string[] = WHITESPACE,
): boolean {
  return (
    !hasValue ||
    (!!value &&
      value.length >= minLength &&
      includes.reduce((hasIncludes: boolean, check) => hasIncludes && value.includes(check), true) &&
      (!starting.length || starting.some((check) => value.startsWith(check))) &&
      !excludes.some((check) => value.includes(check)) &&
      !notStarting.some((check) => value.startsWith(check)) &&
      !notEnding.some((check) => value.endsWith(check)))
  );
}

// useful for removing empty values from an array using filter
// the types after the filter would not include the empty values
export function notEmpty<TValue>(value: TValue | null | undefined | ''): value is TValue {
  return value !== null && value !== undefined && value !== '';
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * functions below help extract useful data
 * from each motion object. they are mostly loosely copied from
 * https://github.com/polkadot-js/apps/blob/master/packages/react-components/src/Call.tsx
 */

export function formatCallMeta(meta?: FunctionMetadataLatest): string {
  if (!meta || !meta.docs.length) {
    return '';
  }

  const strings = meta.docs.map((doc) => doc.toString().trim());
  const firstEmpty = strings.findIndex((doc) => !doc.length);
  const combined = (firstEmpty === -1 ? strings : strings.slice(0, firstEmpty))
    .join(' ')
    .replace(/#(<weight>| <weight>).*<\/weight>/, '');
  const parts = splitParts(combined.replace(/\\/g, '').replace(/`/g, ''));

  return parts.join(' ');
}

function splitSingle(value: string[], sep: string): string[] {
  return value.reduce((result: string[], _value: string): string[] => {
    return _value.split(sep).reduce((_result: string[], __value: string) => _result.concat(__value), result);
  }, []);
}

function splitParts(value: string): string[] {
  return ['[', ']'].reduce((result: string[], sep) => splitSingle(result, sep), [value]);
}
