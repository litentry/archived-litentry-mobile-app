import {graphql} from 'msw';

export const parachainSummaryHandler = graphql.query('getParachainsSummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainParachainsSummary: {
        __typename: 'SubstrateChainParachainsSummary',
        parachainsCount: 14,
        parathreadsCount: 14,
        proposalsCount: 0,
        leasePeriod: {
          __typename: 'SubstrateChainLeasePeriod',
          currentLease: '7',
          totalPeriod: '84 days',
          progressPercent: 53,
          remainder: '38 days 21 hrs',
        },
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
        {
          __typename: 'SubstrateChainParachain',
          id: '2002',
          name: 'Clover',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 13',
            blockTime: ['542 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2004',
          name: 'Moonbeam',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 13',
            blockTime: ['542 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2006',
          name: 'Astar',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 13',
            blockTime: ['542 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2011',
          name: 'Equilibrium',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2012',
          name: 'Parallel',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 13',
            blockTime: ['542 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2019',
          name: 'Composable Finance',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2021',
          name: 'Efinity',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2026',
          name: 'Nodle',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2031',
          name: 'Centrifuge',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2032',
          name: 'Interlay',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2034',
          name: 'HydraDX',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
        {
          __typename: 'SubstrateChainParachain',
          id: '2035',
          name: 'Phala Network',
          lease: {
            __typename: 'SubstrateChainLease',
            period: '7 - 14',
            blockTime: ['626 days', '21 hrs', '21 mins', '42 s'],
          },
        },
      ],
    }),
  );
});
