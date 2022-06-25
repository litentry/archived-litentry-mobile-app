import {graphql} from 'msw';

export const auctionsHandler = graphql.query('getAuctionsSummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainAuctionsSummary: {
        __typename: 'SubstrateChainAuctionsSummary',
        auctionsInfo: {__typename: 'SubstrateChainAuctionsInfo', numAuctions: '41', active: true},
        latestAuction: {
          __typename: 'SubstrateChainAuction',
          leasePeriod: {__typename: 'SubstrateChainAuctionLeasePeriod', first: '22', last: '29'},
          endingPeriod: {
            __typename: 'SubstrateChainAuctionEndingPeriod',
            endingIn: ['5 days'],
            remaining: ['1 day', '2 hrs', '16 mins', '30 s'],
            remainingPercent: 78.1,
          },
          raised: '1749000000000000',
          raisedPercent: 0.01,
          winningBid: {
            __typename: 'SubstrateChainAuctionBid',
            blockNumber: '13231800',
            projectId: '2122',
            projectName: '',
            amount: '1,749.0000 KSM',
            isCrowdloan: false,
            firstSlot: '22',
            lastSlot: '29',
          },
        },
      },
    }),
  );
});
