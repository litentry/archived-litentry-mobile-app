import {BN, BN_TEN} from '@polkadot/util';
import type {Registry} from 'src/api/hooks/useChainInfo';

export function getBalanceFromString(registry: Registry, input: string): BN {
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
