import {Compact} from '@polkadot/types';
// eslint-disable-next-line no-restricted-imports
import {formatBalance as formatBalancePolkaUtil, BN} from '@polkadot/util';
import {useChainInfo, Registry} from './useChainInfo';
import {stringToBn as stringToBnUtil} from 'src/api/utils/balance';

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

  const stringToBn = (input: string) => {
    if (chainInfo) {
      return stringToBnUtil(chainInfo.registry, input);
    }
  };

  return {
    formatBalance,
    stringToBn,
  };
}

// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;

function format(value: Balance, options: FormatBalanceOptions & Registry): string {
  const {decimals, isShort, token} = options;
  const [prefix = '', postfix = ''] = formatBalancePolkaUtil(value, {decimals, forceUnit: '-', withSi: false}).split(
    '.',
  );

  if (prefix.length > M_LENGTH) {
    const [major, rest] = formatBalancePolkaUtil(value, {decimals, withUnit: false}).split('.');
    const minor = isShort ? '' : `.${rest?.substring(0, 4)}`;
    const unit = rest?.substring(4);

    return `${major}${minor} ${unit}${unit ? token : ' ' + token}`;
  }

  return formatDisplay(prefix, postfix, token, isShort);
}

function formatDisplay(prefix: string, postfix: string, unit: string, isShort = false): string {
  return `${prefix}${isShort ? '' : '.'}${!isShort ? ('0000' + postfix).slice(-4) : ''} ${unit}`;
}
