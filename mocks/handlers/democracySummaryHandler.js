import {graphql} from 'msw';

export const democracySummaryHandler = graphql.query('getDemocracySummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracySummary: {
        __typename: 'SubstrateChainDemocracySummary',
        activeProposals: 0,
        proposals: '17',
        referendums: '60',
        activeReferendums: 1,
        launchPeriodInfo: {
          progressPercent: 87,
          timeLeft: '3 days 10 hrs',
          timeLeftParts: ['3 days', '10 hrs', '53 mins', '6 s'],
        },
      },
    }),
  );
});
