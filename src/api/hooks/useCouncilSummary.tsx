import {BlockNumber} from '@polkadot/types/interfaces';
import {bnToBn, formatNumber} from '@polkadot/util';
import BN from 'bn.js';
import useApiQuery from 'src/api/hooks/useApiQuery';

function getTermLeft(termDuration: BN, bestNumber: BlockNumber) {
  const total = termDuration;
  const value = bestNumber.mod(termDuration);
  const angle = total.gtn(0)
    ? bnToBn(value || 0)
        .muln(36000)
        .div(total)
        .toNumber() / 100
    : 0;
  const percentage = Math.floor((angle * 100) / 360);

  return {
    termLeft: total.sub(value),
    percentage,
  };
}

export function useCouncilSummary() {
  return useApiQuery('council-summary', async (api) => {
    const [electionsInfo, bestNumber, primeMember] = await Promise.all([
      api.derive.elections.info(),
      api.derive.chain.bestNumber(),
      api.query.council.prime(),
    ]);

    const {termLeft, percentage} = getTermLeft(bnToBn(electionsInfo.termDuration || 0), bestNumber);

    return {
      seats: `${electionsInfo.members.length}/${formatNumber(electionsInfo.desiredSeats)}`,
      runnersUp: `${electionsInfo.runnersUp.length}/${formatNumber(electionsInfo.desiredRunnersUp)}`,
      prime: primeMember.unwrapOr(undefined)?.toString(),
      termProgress: {
        termDuration: electionsInfo.termDuration,
        termLeft,
        percentage,
      },
    };
  });
}
