import {graphql} from 'msw';

export const convictionsHandler = graphql.query('getConvictions', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainConvictions: [
        {__typename: 'SubstrateChainConviction', text: '0.1x voting balance, no lockup period', value: 0},
        {
          __typename: 'SubstrateChainConviction',
          text: '1x voting balance, locked for 1x enactment (28.00 days)',
          value: 1,
        },
      ],
    }),
  );
});
