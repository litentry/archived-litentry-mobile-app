import {graphql} from 'msw';

export const bountiesSummaryHandler = graphql.query('getBountiesSummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainBountiesSummary: {
        __typename: 'SubstrateChainBountiesSummary',
        activeBounties: '5',
        pastBounties: '12',
        bountyCount: '17',
        totalValue: '12017860800000000',
        formattedTotalValue: '1.2017  MDOT',
        timeLeft: ['17 days', '20 hrs', '47 mins', '42 s'],
        progressPercent: 25,
        bountyDepositBase: '10000000000',
        bountyValueMinimum: '100000000000',
        dataDepositPerByte: '100000000',
        maximumReasonLength: '16384',
      },
    }),
  );
});
