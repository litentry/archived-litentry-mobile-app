import {graphql} from 'msw';

export const parachainSummaryHandler = graphql.query('getParachainsSummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainParachainsSummary: {
        __typename: 'SubstrateChainParachainsSummary',
        leasePeriod: {
          __typename: 'SubstrateChainLeasePeriod',
          currentLease: '7',
          progressPercent: 56,
          remainderParts: ['36 days', '10 hrs', '14 mins', '18 s'],
          totalPeriod: '84 days',
        },
        parachainsCount: 14,
        parathreadsCount: 14,
        proposalsCount: 0,
      },
      substrateChainParachains: [
        {
          __typename: 'SubstrateChainParachain',
          id: '1000',
          name: 'Statemint',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 20',
            blockTime: ['1130 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2000',
          name: 'Acala',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 13',
            blockTime: ['542 days', '21 hrs', '21 mins', '42 s'],
          },
        },
      ],
    }),
  );
});
