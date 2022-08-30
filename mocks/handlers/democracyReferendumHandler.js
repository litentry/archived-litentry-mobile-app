import {graphql} from 'msw';

export const democracyReferendumHandler = graphql.query('getDemocracyReferendum', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracyReferendum: {
        __typename: 'SubstrateChainDemocracyReferendum',
        id: 'polkadot:69',
        title: 'Polkadot Runtime Upgrade to v0.9.25',
        description:
          "The proposal to upgrade Polkadot's runtime to [v9250](https://github.com/paritytech/polkadot/releases/tag/v0.9.25) is now up for vote!\n\nRelease notes, runtime changes and proposal hash can be found [HERE](https://github.com/paritytech/polkadot/releases/tag/v0.9.25). Feel free to use srtool yourself to check the proposal hash. If passed by the Council, this proposal should be voted by the community and enacted after. \n\nMake sure to vote at your convenience!\n\nProposal hash: `0x73a9fe9a8dcced92ad7eb36963f64d7b49a4f66a2c5e626a812e5b6cd0e56d42`\n",
        date: '2022-07-19T07:45:48.007000Z',
        aye: '713458910100000',
        formattedAye: '71,345.8910 DOT',
        nay: '10324000000',
        formattedNay: '1.0324 DOT',
        status: 'Executed',
        blockNumber: '11228084',
        updatedAt: '2022-07-26T09:42:00.007000Z',
        voteThreshold: 'SimpleMajority',
        ayePercent: 99,
        votes: [
          {
            __typename: 'SubstrateChainDemocracyReferendumVote',
            id: 'polkadot:11228087:2',
            aye: '1000000000000',
            formattedAye: '100.0000 DOT',
            nay: '0',
            formattedNay: '0.0000 DOT',
            voter: '1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL',
            blockNumber: '11228087',
            date: '2022-07-19T07:46:06.011000Z',
          },
          {
            __typename: 'SubstrateChainDemocracyReferendumVote',
            id: 'polkadot:11228100:2',
            aye: '10000000000',
            formattedAye: '1.0000 DOT',
            nay: '0',
            formattedNay: '0.0000 DOT',
            voter: '1eGtATyy4ayn77dsrhdW8N3Vs1yjqjzJcintksNmScqy31j',
            blockNumber: '11228100',
            date: '2022-07-19T07:47:24.006000Z',
          },
        ],
      },
    }),
  );
});
