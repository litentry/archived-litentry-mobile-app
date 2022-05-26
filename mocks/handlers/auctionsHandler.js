import {graphql} from 'msw';

export const auctionsHandler = graphql.query('getAuctionsSummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainAuctionsSummary: {
        __typename: 'SubstrateChainAuctionsSummary',
        auctionsInfo: {__typename: 'SubstrateChainAuctionsInfo', numAuctions: '18', active: true},
        latestAuction: {
          __typename: 'SubstrateChainAuction',
          leasePeriod: {__typename: 'SubstrateChainAuctionLeasePeriod', first: '8', last: '15'},
          endingPeriod: {
            __typename: 'SubstrateChainAuctionEndingPeriod',
            endingIn: ['5 days'],
            remaining: ['4 days', '36 mins', '6 s'],
            remainingPercent: 19.49,
          },
          raised: '399,696.5211 DOT',
          raisedPercent: 0.03,
          winningBid: {
            __typename: 'SubstrateChainAuctionBid',
            blockNumber: '10464483',
            projectId: '2030',
            projectName: '',
            amount: '399,696.5211 DOT',
            isCrowdloan: true,
            firstSlot: '8',
            lastSlot: '15',
          },
        },
      },
    }),
  );
});
