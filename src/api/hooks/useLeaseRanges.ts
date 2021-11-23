// Copyright 2017-2021 @polkadot/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import type {u32} from '@polkadot/types';
import useApiQuery from 'src/api/hooks/useApiQuery';

const RANGES_DEFAULT: [number, number][] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 2],
  [2, 3],
  [3, 3],
];

function isU32(leasePeriodsPerSlot: unknown): leasePeriodsPerSlot is u32 {
  return !!leasePeriodsPerSlot;
}

export function useLeaseRanges() {
  return useApiQuery('lease_ranges', (api) => {
    if (isU32(api.consts.auctions?.leasePeriodsPerSlot)) {
      const ranges: [number, number][] = [];

      for (let i = 0; api.consts.auctions?.leasePeriodsPerSlot.gtn(i) ?? 0; i++) {
        for (let j = i; api.consts.auctions?.leasePeriodsPerSlot.gtn(j) ?? 0; j++) {
          ranges.push([i, j]);
        }
      }

      return ranges;
    }

    return RANGES_DEFAULT;
  });
}
