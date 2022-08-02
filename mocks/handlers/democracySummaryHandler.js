import {graphql} from 'msw';

export const democracySummaryHandler = graphql.query('getDemocracySummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracySummary: {
        __typename: 'SubstrateChainDemocracySummary',
        activeProposals: 0,
        activeReferendums: 1,
        launchPeriod: {
          __typename: 'SubstrateChainLaunchPeriodInfo',
          progressPercent: 26,
          timeLeft: '20 days 11 hrs',
          timeLeftParts: ['20 days', '11 hrs', '22 mins', '36 s'],
        },
        proposals: '17',
        referendums: '62',
      },
    }),
  );
});
