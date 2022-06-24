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
      },
    }),
  );
});
