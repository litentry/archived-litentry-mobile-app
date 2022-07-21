import {graphql} from 'msw';

export const crowdloanSummaryHandler = graphql.query('getCrowdloan', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCrowdloanSummary: {
        __typename: 'SubstrateChainCrowdloanSummary',
        activeRaised: '72270271902526052',
        activeCap: '590000000000000000',
        totalRaised: '2110102954015596952',
        totalCap: '6771290216000000000',
        activeProgress: 0.1224,
        totalProgress: 0.3116,
        totalFunds: 33,
      },
    }),
  );
});
