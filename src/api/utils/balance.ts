import {BN, BN_TEN} from '@polkadot/util';
import type {Registry} from 'src/api/hooks/useChainInfo';
import {bnToBn} from '@polkadot/util';

/**
 * Use this method to convert unformatted string values (Balance) to BN. 
 *  e.g: amount entered in a TextInput
 */
export function getBNFromLocalInputString(registry: Registry, input: string): BN {
  const chainDecimal = registry.decimals;
  const currencyPower = new BN(chainDecimal);

  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/);
  if (isDecimalValue) {
    const integerPart = new BN(input.replace(/\.\d*$/, ''));
    const fractionalPartString = input.replace(/^\d+\./, '').substring(0, chainDecimal);
    const fractionalPart = new BN(fractionalPartString);

    return integerPart
      .mul(BN_TEN.pow(currencyPower))
      .add(fractionalPart.mul(BN_TEN.pow(new BN(chainDecimal - fractionalPartString.length))));
  }

  return new BN(input.replace(/[^\d]/g, '')).mul(BN_TEN.pow(currencyPower));
}

/**
 * use this method to get BN from string values incoming from API
 */
export function getBNFromApiString(value?: string) {
  return bnToBn(value);
}
