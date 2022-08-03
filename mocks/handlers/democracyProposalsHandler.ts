import {graphql} from 'msw';

export const democracyProposalsHandler = graphql.query('getDemocracyProposals', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracyProposals: [
        {
          __typename: 'SubstrateChainDemocracyProposal',
          id: 'kusama:96',
          proposer: {
            __typename: 'SubstrateChainAccount',
            address: 'GS8cNk9ysUwoBp2ibWYNzjDvR9R4f9iyKoYdnDBbdP1ZDbn',
            display: 'BrhnKcby61',
            hasIdentity: true,
            registration: {
              __typename: 'SubstrateChainDeriveAccountRegistration',
              display: 'BrhnKcby61',
              displayParent: null,
              email: null,
              image: null,
              legal: null,
              pgp: null,
              riot: null,
              twitter: '@BrhnKcby61',
              web: null,
              judgements: [],
            },
            balance: {
              __typename: 'SubstrateChainAccountBalance',
              total: '107985838837',
              formattedTotal: '0.1079 KSM',
              reserved: '38819994800',
              formattedReserved: '0.0388 KSM',
              free: '69165844037',
              formattedFree: '0.0691 KSM',
              feeFrozen: '0',
              formattedFeeFrozen: '0.0000 KSM',
            },
          },
          blockNumber: '13487621',
          depositAmount: '5000000000',
          formattedDepositAmount: '0.0050 KSM',
          title: 'Untitled - public proposal #96',
          proposalHash: '0xf5e48b783ae1c3711d95340a971d61e435c2642ad06d88e2367e9ac6c85103a6',
          proposalIndex: 96,
          status: 'Proposed',
          tabledAtBlock: null,
          date: '2022-07-09T16:14:24.026000Z',
          updatedAt: '2022-07-09T16:14:24.026000Z',
        },
      ],
    }),
  );
});
