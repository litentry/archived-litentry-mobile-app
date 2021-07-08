import BN from 'bn.js';
import {useApi} from 'context/ChainApiContext';
import {useBlockTime} from 'src/hook/useBlockTime';
import {BN_THOUSAND} from '@polkadot/util';

const CONVICTIONS: [number, number, BN][] = [1, 2, 4, 8, 16, 32].map((lock, index) => [index + 1, lock, new BN(lock)]);
const SEC_DAY = 60 * 60 * 24;

export function useConvictions(): {text: string; value: number}[] {
  const {api} = useApi();
  const {blockTime} = useBlockTime();

  return [
    {text: '0.1x voting balance, no lockup period', value: 0},
    ...(api
      ? CONVICTIONS.map(([value, lock, bnLock]): {text: string; value: number} => {
          const period = (
            bnLock.mul(api.consts.democracy.enactmentPeriod.muln(blockTime).div(BN_THOUSAND)).toNumber() / SEC_DAY
          ).toFixed(2);
          return {
            text: `${value}x voting balance, locked for ${lock}x enactment (${period} days)`,
            value,
          };
        })
      : []),
  ];
}
