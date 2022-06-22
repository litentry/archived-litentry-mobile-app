import {graphql} from 'msw';

export const councilMotionDetailsHandler = graphql.query('getSubstrateChainCouncilMotionDetail', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCouncilMotionDetail: {},
    }),
  );
});
