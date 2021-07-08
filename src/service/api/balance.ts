import {ApiPromise} from '@polkadot/api';
import {BN, BN_TEN} from '@polkadot/util';

export function getBalanceFromString(api: ApiPromise, input: string): BN {
  const isDecimalValue = input.match(/^(\d+)\.(\d+)$/);

  let result;

  const siPower = BN_TEN;

  if (isDecimalValue) {
    const div = new BN(input.replace(/\.\d*$/, ''));
    const modString = input.replace(/^\d+\./, '').substr(0, api.registry.chainDecimals[0]);
    const mod = new BN(modString);

    result = div.mul(BN_TEN.pow(siPower)).add(mod.mul(BN_TEN.pow(new BN(siPower.toNumber() - modString.length))));
  } else {
    result = new BN(input.replace(/[^\d]/g, '')).mul(BN_TEN.pow(BN_TEN));
  }

  return result;
}
