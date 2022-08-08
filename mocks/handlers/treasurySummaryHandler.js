import {graphql} from 'msw';

export const treasurySummaryHandler = graphql.query('getTreasurySummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainTreasurySummary: {
        __typename: 'SubstrateChainTreasurySummary',
        activeProposals: 0,
        totalProposals: 160,
        approvedProposals: 0,
        spendPeriod: {
          __typename: 'SubstrateChainSpendPeriod',
          percentage: 95,
          termLeft: '6 hrs 30 mins',
          period: '6 days',
          termLeftParts: ['6 hrs', '30 mins', '48 s'],
        },
        treasuryBalance: {__typename: 'SubstrateChainTreasuryBalance', freeBalance: '533,177.7358 KSM'},
        nextBurn: '1,066 KSM',
      },
    }),
  );
});
