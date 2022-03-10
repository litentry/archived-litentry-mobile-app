import {Compact} from '@polkadot/types';
import type BN from 'bn.js';
// eslint-disable-next-line no-restricted-imports
import {formatBalance} from '@polkadot/util';
import {useChainInfo, Registry} from './useChainInfo';
import {getBNFromLocalInputString as getBNFromLocalInputStringUtil} from 'src/api/utils/balance';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Balance = Compact<any> | BN | string | number;
type FormatBalanceOptions = {
  isShort?: boolean;
};

export function useFormatBalance() {
  const {data: chainInfo} = useChainInfo();

  const formatBalance = (value?: Balance, options?: FormatBalanceOptions) => {
    if (chainInfo && value) {
      return format(value, Object.assign({}, chainInfo.registry, options));
    }
  };

  const getBNFromLocalInputString = (input: string) => {
    if (chainInfo) {
      return getBNFromLocalInputStringUtil(chainInfo.registry, input);
    }
  };

  return {
    formatBalance,
    getBNFromLocalInputString,
  };
}

// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;

function format(value: Balance, options: FormatBalanceOptions & Registry): string {
  const {decimals, isShort, token} = options;
  const [prefix = '', postfix = ''] = formatBalance(value, {decimals, forceUnit: '-', withSi: false}).split('.');

  if (prefix.length > M_LENGTH) {
    const [major, rest] = formatBalance(value, {decimals, withUnit: false}).split('.');
    const minor = isShort ? '' : `.${rest?.substring(0, 4)}`;
    const unit = rest?.substring(4);

    return `${major}${minor} ${unit}${unit ? token : ' ' + token}`;
  }

  return formatDisplay(prefix, postfix, token, isShort);
}

function formatDisplay(prefix: string, postfix: string, unit: string, isShort = false): string {
  return `${prefix}${isShort ? '' : '.'}${!isShort ? ('0000' + postfix).slice(-4) : ''} ${unit}`;
}
