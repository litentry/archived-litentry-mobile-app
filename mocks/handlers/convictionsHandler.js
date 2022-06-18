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
        {
          __typename: 'SubstrateChainConviction',
          text: '2x voting balance, locked for 2x enactment (56.00 days)',
          value: 2,
        },
        {
          __typename: 'SubstrateChainConviction',
          text: '3x voting balance, locked for 4x enactment (112.00 days)',
          value: 3,
        },
        {
          __typename: 'SubstrateChainConviction',
          text: '4x voting balance, locked for 8x enactment (224.00 days)',
          value: 4,
        },
        {
          __typename: 'SubstrateChainConviction',
          text: '5x voting balance, locked for 16x enactment (448.00 days)',
          value: 5,
        },
        {
          __typename: 'SubstrateChainConviction',
          text: '6x voting balance, locked for 32x enactment (896.00 days)',
          value: 6,
        },
      ],
    }),
  );
});
