import {graphql} from 'msw';

export const parathreadsHandler = graphql.query('getParathread', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainParathreads: [
        {
          __typename: 'SubstrateChainParathread',
          id: '2013',
          name: 'Litentry',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'Litentry',
              address: '152deMvsN7wxMbSmdApsds6LWNNNGgsJ8TTpZLTD2ipEHNg3',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Litentry',
                displayParent: null,
                email: 'info@litentry.com',
                image: null,
                legal: 'Litentry',
                pgp: null,
                riot: null,
                twitter: null,
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
                total: '17322774998750',
                formattedTotal: '1,732.2774 DOT',
                reserved: '14121430000000',
                formattedReserved: '1,412.1430 DOT',
                free: '3201344998750',
                formattedFree: '320.1344 DOT',
                feeFrozen: '0',
                formattedFeeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: {
            __typename: 'SubstrateChainLease',
            period: '9 - 16',
            blockTime: ['55 days', '19 hrs', '34 mins', '36 s'],
          },
          homepage: 'https://crowdloan.litentry.com',
        },
      ],
    }),
  );
});
