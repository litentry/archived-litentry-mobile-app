import {graphql} from 'msw';

export const crowdloansHandler = graphql.query('getCrowdloans', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCrowdloans: [
        {
          __typename: 'SubstrateChainCrowdloan',
          paraId: '2013',
          name: 'Litentry',
          formattedRaised: '943,842.0909 DOT',
          formattedCap: '3.0000  MDOT',
          homepage: 'https://crowdloan.litentry.com',
          raisedPercentage: '0.3146',
        },
        {
          __typename: 'SubstrateChainCrowdloan',
          paraId: '2038',
          name: 'Geminis',
          formattedRaised: '24,613.9104 DOT',
          formattedCap: '3.0000  MDOT',
          homepage: 'https://geminis.network/',
          raisedPercentage: '0.0082',
        },
      ],
    }),
  );
});
