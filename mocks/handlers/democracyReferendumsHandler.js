import {graphql} from 'msw';

export const democracyReferendumsHandler = graphql.query('getDemocracyReferendums', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracyReferendums: [
        {
          __typename: 'SubstrateChainDemocracyReferendum',
          id: 'kusama:215',
          title: 'Removal of eighteen (18) proposals on the public referenda queue',
          date: '2022-07-18T01:07:12.041000Z',
          aye: '4185166960000000',
          formattedAye: '4,185.1669 KSM',
          nay: '0',
          formattedNay: '0.0000 KSM',
          status: 'Started',
          blockNumber: '13608000',
          updatedAt: '2022-07-18T01:07:12.041000Z',
          voteThreshold: 'SuperMajorityApprove',
          ayePercent: 100,
        },
      ],
    }),
  );
});
