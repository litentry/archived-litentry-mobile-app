import type {AuctionIndex, BlockNumber, LeasePeriodOf} from '@polkadot/types/interfaces';
import type {ITuple} from '@polkadot/types/types';
import type {Option} from '@polkadot/types';
import useApiQuery from 'src/api/hooks/useApiQuery';

export function useAuctionInfo() {
  return useApiQuery('auction_info', async (api) => {
    const [numAuctions, optInfo, leasePeriodsPerSlot] = await Promise.all([
      api.query.auctions?.auctionCounter?.<AuctionIndex>(),
      api.query.auctions?.auctionInfo?.<Option<ITuple<[LeasePeriodOf, BlockNumber]>>>(),
      api.consts.auctions?.leasePeriodsPerSlot,
    ]);
    const [leasePeriod, endBlock] = optInfo?.unwrapOr([null, null]) ?? [null, null];

    return {endBlock, leasePeriod, numAuctions, leasePeriodsPerSlot};
  });
}
