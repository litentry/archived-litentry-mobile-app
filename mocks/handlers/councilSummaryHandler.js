import {graphql} from 'msw';

export const councilSummaryHandler = graphql.query('getCouncilSummary', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCouncil: {
        __typename: 'SubstrateChainCouncil',
        primeMember: {
          __typename: 'SubstrateChainCouncilMember',
          account: {
            __typename: 'SubstrateChainAccount',
            address: 'FcxNWVy5RESDsErjwyZmPCW6Z8Y3fbfLzmou34YZTrbcraL',
            display: '🍺 Gav 🥃',
          },
        },
        desiredSeats: 19,
        totalMembers: 19,
        totalRunnersUp: 13,
        totalCandidates: 0,
        desiredRunnersUp: 19,
        termProgress: {
          __typename: 'SubstrateChainTermProgress',
          termDurationParts: ['1 day'],
          termLeftParts: ['6 hrs', '53 mins', '12 s'],
          percentage: 71,
        },
      },
    }),
  );
});
