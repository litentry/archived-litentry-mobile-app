import {useContext} from 'react';
import {ChainApiContext} from 'context/ChainApiContext';
import {Registry} from '@polkadot/types/types';
import {Compact} from '@polkadot/types';
import type BN from 'bn.js';
// eslint-disable-next-line no-restricted-imports
import {formatBalance} from '@polkadot/util';

/**
 * Everything here is a loose copy of
 * https://github.com/polkadot-js/apps/blob/bd78840d2142df121d182e8700b20308880dde0a/packages/react-query/src/FormatBalance.tsx
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Balance = Compact<any> | BN | string | number;
type FormatBalanceOptions = {
  isShort?: boolean;
};

export function useFormatBalance() {
  const {api} = useContext(ChainApiContext);
  const registry = api?.registry;

  const formatInfo = registry && getFormat(registry);

  return (value: Balance, options?: FormatBalanceOptions) => {
    if (!formatInfo) {
      return undefined;
    }

    return format(value, Object.assign({}, formatInfo, options));
  };
}

function getFormat(registry: Registry) {
  const decimals = registry.chainDecimals[0] ?? 0;
  const token = registry.chainTokens[0] ?? '';

  return {decimals, token};
}

// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;

function format(value: Balance, options: FormatBalanceOptions & {decimals: number; token: string}): string {
  const {decimals, isShort, token} = options;
  const [prefix = '', postfix = ''] = formatBalance(value, {decimals, forceUnit: '-', withSi: false}).split('.');

  if (prefix.length > M_LENGTH) {
    const [major, rest] = formatBalance(value, {decimals, withUnit: false}).split('.');
    const minor = isShort ? '' : `.${rest?.substr(0, 4)}`;
    const unit = rest?.substr(4);

    return `${major}${minor} ${unit}${unit ? token : ' ' + token}`;
  }

  return formatDisplay(prefix, postfix, token, isShort);
}

function formatDisplay(prefix: string, postfix: string, unit: string, isShort = false): string {
  return `${prefix}${isShort ? '' : '.'}${!isShort ? ('0000' + postfix).slice(-4) : ''} ${unit}`;
}
