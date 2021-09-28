import {ApiPromise} from '@polkadot/api';
import {useEffect, useRef} from 'react';
import {useQueryClient} from 'react-query';
import type {BlockNumber} from '@polkadot/types/interfaces';
import type BN from 'bn.js';
import useApiQuery from 'src/api/hooks/useApiQuery';
import {useBestNumber} from 'src/api/hooks/useBestNumber';

interface LeasePeriod {
  currentPeriod: BN;
  length: BN;
  progress: BN;
  remainder: BN;
}

export function useParachainsLeasePeriod() {
  const bestNumber = useBestNumber();
  const bestNumberRef = useRef(bestNumber);
  const queryClient = useQueryClient();

  useEffect(() => {
    bestNumberRef.current = bestNumber;
    queryClient.invalidateQueries('parachains_lease_period');
  }, [bestNumber, queryClient]);

  return useApiQuery('parachains_lease_period', async (api: ApiPromise) => {
    if (!api.consts.slots?.leasePeriod || !bestNumberRef.current) {
      return;
    }
    const length = api.consts.slots.leasePeriod as BlockNumber;
    const progress = bestNumberRef.current.mod(length);

    const leasePeriod: LeasePeriod = {
      currentPeriod: bestNumberRef.current.div(length),
      length,
      progress,
      remainder: length.sub(progress),
    };

    return leasePeriod;
  });
}
