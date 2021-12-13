import {trim} from 'lodash';
import {checkAddress, isEthereumChecksum} from '@polkadot/util-crypto';
import {ADDRESS_PREFIX_KUSAMA, ADDRESS_PREFIX_LITENTRY, ADDRESS_PREFIX_POLKADOT} from 'src/constants';
import {AccountAddressType, NetworkType} from 'src/types';

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
