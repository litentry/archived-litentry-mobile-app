import {BN, BN_ONE, formatNumber} from '@polkadot/util';

export function getLeasePeriodString(currentPeriod: BN, leases: number[]): string {
  return leases
    .reduce((all: [BN, BN][], _period): [BN, BN][] => {
      const bnp = currentPeriod.addn(_period);

      if (!all.length || all[all.length - 1]?.[1].add(BN_ONE).lt(bnp)) {
        all.push([bnp, bnp]);
      } else {
        const bn = all[all.length - 1];
        bn ? (bn[1] = bnp) : null;
      }

      return all;
    }, [])
    .map(([a, b]) => (a.eq(b) ? formatNumber(a) : `${formatNumber(a)} - ${formatNumber(b)}`))
    .join(', ');
}
