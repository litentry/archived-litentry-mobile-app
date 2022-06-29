import {trim} from 'lodash';
import {checkAddress, isEthereumChecksum} from '@polkadot/util-crypto';
import {
  ADDRESS_PREFIX_KUSAMA,
  ADDRESS_PREFIX_LITENTRY,
  ADDRESS_PREFIX_LITMUS,
  ADDRESS_PREFIX_POLKADOT,
} from 'src/constants';
import type {AccountAddressType} from 'src/types';
import type {NetworkType} from '@atoms/network';

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

export const isAddressValid = (network: NetworkType, address: string) => {
  switch (network.key) {
    case 'polkadot':
      return checkAddress(address, ADDRESS_PREFIX_POLKADOT)[0];
    case 'kusama':
      return checkAddress(address, ADDRESS_PREFIX_KUSAMA)[0];
    case 'litentry_test':
      return checkAddress(address, ADDRESS_PREFIX_LITENTRY)[0];
    case 'litmus':
      return checkAddress(address, ADDRESS_PREFIX_LITMUS)[0];
    case 'ethereum':
      return isEthereumChecksum(address); // fixme
    default:
      return false;
  }
};
