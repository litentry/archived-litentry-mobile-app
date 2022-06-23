import {graphql} from 'msw';

export const crowdloanHandler = graphql.query('getCrowdloan', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCrowdloanSummary: {
        __typename: 'SubstrateChainCrowdloanSummary',
        activeRaised: '41455478310580393',
        activeCap: '336800010000000000',
        totalRaised: '1313913308888288619',
        totalCap: '4926800020000000000',
        activeProgress: 0.123,
        totalProgress: 0.2666,
        totalFunds: 20,
      },
    }),
  );
});
