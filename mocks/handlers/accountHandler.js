import {graphql} from 'msw';

export const accountHandler = graphql.query('getAccount', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainAccount: {
        __typename: 'SubstrateChainAccount',
        address: '1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL',
        display: 'RTTI-5220 (POLKADOT)',
        hasIdentity: true,
        registration: {
          __typename: 'SubstrateChainDeriveAccountRegistration',
          display: 'RTTI-5220 (POLKADOT)',
          displayParent: null,
          email: 'raul@justopensource.io',
          image: null,
          legal: 'Raul Romanutti',
          pgp: null,
          riot: '@raul.rtti:matrix.parity.io',
          twitter: '@nachortti',
          web: null,
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
          total: '4896993298073',
          formattedTotal: '489.6993 DOT',
          reserved: '2609060000000',
          formattedReserved: '260.9060 DOT',
          free: '2287933298073',
          formattedFree: '228.7933 DOT',
          feeFrozen: '500000000000',
          formattedFeeFrozen: '50.0000 DOT',
        },
      },
    }),
  );
});
