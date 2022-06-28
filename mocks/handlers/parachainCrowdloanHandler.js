import {graphql} from 'msw';

export const parachainCrowdloanHandler = graphql.query('getParachainCrowdloan', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCrowdloan: {
        __typename: 'SubstrateChainCrowdloan',
        paraId: '2013',
        name: 'Litentry',
        homepage: 'https://crowdloan.litentry.com',
        ending: ['28 days', '26 mins', '12 s'],
        status: 'Past',
        firstPeriod: '8',
        lastPeriod: '15',
        formattedRaised: '943,842.0909 DOT',
        formattedCap: '3.0000  MDOT',
        contribution: {__typename: 'SubstrateChainCrowdloanContribution', contributorsCount: '3,463'},
        depositor: {
          __typename: 'SubstrateChainAccountInfo',
          account: {
            __typename: 'SubstrateChainAccount',
            address: '152deMvsN7wxMbSmdApsds6LWNNNGgsJ8TTpZLTD2ipEHNg3',
            display: 'Litentry',
            registration: {
              __typename: 'SubstrateChainDeriveAccountRegistration',
              displayParent: null,
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
          },
        },
      },
    }),
  );
});
