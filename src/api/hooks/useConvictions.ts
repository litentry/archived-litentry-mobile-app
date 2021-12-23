import BN from 'bn.js';
import {useApi} from 'context/ChainApiContext';
import {useBlockTime} from 'src/api/hooks/useBlockTime';
import {BN_THOUSAND} from '@polkadot/util';

/**
 * Similar to https://github.com/polkadot-js/apps/blob/master/packages/react-components/src/ConvictionDropdown.tsx
 */

const CONVICTIONS: number[] = [1, 2, 4, 8, 16, 32];
const SEC_DAY = 60 * 60 * 24;

export type Conviction = {
  text: string;
  value: number;
};

export function useConvictions(): Conviction[] {
  const {api} = useApi();
  const {blockTime} = useBlockTime();

  if (!api) {
    return [];
  }

  return [
    {text: '0.1x voting balance, no lockup period', value: 0},

    ...CONVICTIONS.map((lock, index): {text: string; value: number} => {
      const value = index + 1;
      const bnLock = new BN(lock);
      const period = (
        bnLock.mul(api.consts.democracy.enactmentPeriod.muln(blockTime).div(BN_THOUSAND)).toNumber() / SEC_DAY
      ).toFixed(2);
      return {
        text: `${value}x voting balance, locked for ${lock}x enactment (${period} days)`,
        value,
      };
    }),
  ];
}
