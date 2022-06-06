import {graphql} from 'msw';

export const accountHandler = graphql.query('getAccount', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainAccount: {
        address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
        display: 'PureStake/01',
        hasIdentity: true,
        registration: {
          display: '01',
          displayParent: 'PureStake',
          email: 'info@purestake.com',
          image: null,
          legal: 'PureStake Ltd',
          pgp: null,
          riot: null,
          twitter: '@purestakeco',
          web: 'https://www.purestake.com/',
          judgements: [
            {
              registrarIndex: 1,
              judgement: {
                isUnknown: false,
                isFeePaid: false,
                isReasonable: true,
                isKnownGood: false,
                isOutOfDate: false,
                isLowQuality: false,
                isErroneous: false,
              },
            },
          ],
        },
        balance: {
          total: '182675396161976',
          formattedTotal: '18,267.5396 DOT',
          reserved: '200410000000',
          formattedReserved: '20.0410 DOT',
          free: '182474986161976',
          formattedFree: '18,247.4986 DOT',
          freeFrozen: '181215680471934',
          formattedFreeFrozen: '18,121.5680 DOT',
        },
      },
    }),
  );
});
