import {trim} from 'lodash';
import type {AccountAddressType} from 'src/types';

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

export function toShortAddress(address: string) {
  return address.length > 13 ? `${address.slice(0, 6)}…${address.slice(-6)}` : address;
}
