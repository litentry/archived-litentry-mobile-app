import {graphql} from 'msw';

export const accountHandler = graphql.query('getAccount', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainAccount: {
        __typename: 'SubstrateChainAccount',
        subAccounts: [],
        address: '14yx4vPAACZRhoDQm1dyvXD3QdRQyCRRCe5tj1zPomhhS29a',
        display: 'PureStake/01',
        hasIdentity: true,
        registration: {
          __typename: 'SubstrateChainDeriveAccountRegistration',
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
              __typename: 'SubstrateChainRegistrationJudgement',
              registrarIndex: 1,
              judgement: {
                __typename: 'SubstrateChainIdentityJudgement',
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
          __typename: 'SubstrateChainAccountBalance',
          total: '196506492123851',
          formattedTotal: '19,650.6492 DOT',
          reserved: '200410000000',
          formattedReserved: '20.0410 DOT',
          free: '196306082123851',
          formattedFree: '19,630.6082 DOT',
          feeFrozen: '194996884114259',
          formattedFeeFrozen: '19,499.6884 DOT',
        },
      },
    }),
  );
});
