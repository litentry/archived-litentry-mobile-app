import {graphql} from 'msw';

export const accountHandler = graphql.query('getAccount', (req, res, ctx) => {
  const address = req.variables.address;
  return res(
    ctx.data({
      substrateChainAccount: {
        __typename: 'SubstrateChainAccount',
        subAccounts: [],
        address,
        display: 'PureStake/01',
        hasIdentity: true,
        registration: {
          __typename: 'SubstrateChainDeriveAccountRegistration',
          display: '01',
          displayParent: 'PureStake',
          email: 'info@purestake.com',
          image: null,
          legal: 'Raul Romanutti',
          pgp: null,
          riot: '@raul.rtti:matrix.parity.io',
          twitter: '@nachortti',
          web: 'www.nachortti.com',
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
          total: '200009333233899',
          formattedTotal: '20,000.9333 DOT',
          reserved: '200410000000',
          formattedReserved: '20.0410 DOT',
          free: '199808923233899',
          formattedFree: '19,980.8923 DOT',
          feeFrozen: '198480993716691',
          formattedFeeFrozen: '19,848.0993 DOT',
        },
        subAccounts: [
          {
            __typename: 'SubstrateChainAccountInfo',
            account: {
              __typename: 'SubstrateChainAccount',
              address: '14ghKTz5mjZPgGYvgVC9VnFw1HYZmmsnYvSSHFgFTJfMvwQS',
              display: 'pos.dog/0',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: '0',
                displayParent: 'pos.dog',
                email: 'polkadot@pos.dog',
                image: null,
                legal: null,
                pgp: null,
                riot: '@maoyu:matrix.org',
                twitter: null,
                web: 'https://pos.dog',
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
                total: '344461185939',
                formattedTotal: '34.4461 DOT',
                reserved: '0',
                formattedReserved: '0.0000 DOT',
                free: '344461185939',
                formattedFree: '34.4461 DOT',
                feeFrozen: '30000000000',
                formattedFeeFrozen: '3.0000 DOT',
              },
            },
          },
        ],
      },
    }),
  );
});
