import {graphql} from 'msw';

export const democracyProposalHandler = graphql.query('getDemocracyProposal', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracyProposal: {
        __typename: 'SubstrateChainDemocracyProposal',
        id: 'polkadot:16',
        proposer: {
          __typename: 'SubstrateChainAccount',
          address: '16hu63GujrmJPW9ZbGibj6gFnLFe4yW8A7gDgADmRTmpaUkf',
          display: '16HU63GUJRMJPW9ZBGIBJ6GFNLFE4YW8A7GDGADMRTMPAUKF',
          hasIdentity: false,
          registration: {
            __typename: 'SubstrateChainDeriveAccountRegistration',
            display: null,
            displayParent: null,
            email: null,
            image: null,
            legal: null,
            pgp: null,
            riot: null,
            twitter: null,
            web: null,
            judgements: [],
          },
          balance: {
            __typename: 'SubstrateChainAccountBalance',
            total: '212443596024',
            formattedTotal: '21.2443 DOT',
            reserved: '1900000000',
            formattedReserved: '0.1900 DOT',
            free: '210543596024',
            formattedFree: '21.0543 DOT',
            feeFrozen: '0',
            formattedFeeFrozen: '0.0000 DOT',
          },
        },
        blockNumber: '7656919',
        depositAmount: '2000000000000',
        formattedDepositAmount: '200.0000 DOT',
        title: 'Untitled - public proposal #16',
        description: '',
        proposalHash: '0x63eaed0a71a0650a6da9ed042b378edf06cef4208d1497a7e59f6cba05fa96e4',
        proposalIndex: 16,
        status: 'Tabled',
        tabledAtBlock: '7660800',
        date: '2021-11-11T14:32:24.002000Z',
        updatedAt: '2021-11-11T21:00:42.002000Z',
        seconds: [],
      },
    }),
  );
});
