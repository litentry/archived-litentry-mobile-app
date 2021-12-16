// Note: have to patch _qrcode
import _qrcode from 'qrcode-generator';

import {u8aConcat} from '@polkadot/util';
import {FRAME_SIZE} from 'src/constants';

const MULTIPART = new Uint8Array([0]);

// A small hurdle to jump through, just to get the default/default correct (as generated)
export const QrCode: typeof _qrcode = _qrcode;

// HACK The default function take string -> number[], the Uint8array is compatible
// with that signature and the use thereof
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(QrCode as any).stringToBytes = (data: Uint8Array): Uint8Array => data;

function encodeNumber(value: number): Uint8Array {
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
