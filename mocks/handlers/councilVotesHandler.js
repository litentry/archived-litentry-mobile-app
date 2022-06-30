import {graphql} from 'msw';

export const councilVotesHandler = graphql.query('getCouncilVote', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCouncilVote: {
        __typename: 'SubstrateChainCouncilVote',
        stake: '0',
        formattedStake: '0.0000 KSM',
        votes: [],
      },
    }),
  );
});
