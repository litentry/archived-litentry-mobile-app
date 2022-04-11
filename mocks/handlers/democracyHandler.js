import {graphql} from 'msw';

export const democracyHandler = graphql.query('getDemocracy', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracyReferendums: [
        {
          __typename: 'SubstrateChainDemocracyReferendum',
          index: '56',
          meta: 'Set the storage for the parachain validation code immediately.',
          method: 'forceSetCurrentCode',
          section: 'paras',
          hash: '0xad2813b46b52fe8f38cb5af7da9c7f0f66416900070b949daa62cf92bbdc6fd7',
          endPeriod: ['5 days', '20 hrs', '32 mins', '42 s'],
          activatePeriod: ['5 days', '21 hrs', '2 mins', '48 s'],
          votedAye: '1354861114902400',
          formattedVotedAye: '135,486.1114 DOT',
          votedNay: '0',
          formattedVotedNay: '0.0000 DOT',
          voteCountAye: '128',
          voteCountNay: '0',
          ayePercent: 104.51,
          args: [
            {
              name: 'para',
              type: 'u32',
              value: '2019',
              subCalls: [],
            },
            {
              name: 'newCode',
              type: 'Bytes',
              value: '0x52bc537646db8e0528b52ffd0058d491…f4a87be408f2f1430ae825a28f1d0901',
              subCalls: [],
            },
          ],
        },
        {
          __typename: 'SubstrateChainDemocracyReferendum',
          index: '56',
          meta: 'Set the storage for the parachain validation code immediately.',
          method: 'forceSetCurrentCode',
          section: 'paras',
          hash: '0xad2813b46b52fe8f38cb5af7da9c7f0f66416900070b949daa62cf92bbdc6fd7',
          endPeriod: ['5 days', '20 hrs', '32 mins', '42 s'],
          activatePeriod: ['5 days', '21 hrs', '2 mins', '48 s'],
          votedAye: '1354861114902400',
          formattedVotedAye: '135,486.1114 DOT',
          votedNay: '0',
          formattedVotedNay: '0.0000 DOT',
          voteCountAye: '128',
          voteCountNay: '0',
          ayePercent: 104.51,
          args: [
            {
              name: 'para',
              type: 'u32',
              value: '2019',
              subCalls: [],
            },
            {
              name: 'newCode',
              type: 'Bytes',
              value: '0x52bc537646db8e0528b52ffd0058d491…f4a87be408f2f1430ae825a28f1d0901',
              subCalls: [],
            },
          ],
        },
      ],
      substrateChainDemocracyProposals: [
        {
          __typename: 'SubstrateChainDemocracyReferendum',
          index: '56',
          meta: 'Set the storage for the parachain validation code immediately.',
          method: 'forceSetCurrentCode',
          section: 'paras',
          hash: '0xad2813b46b52fe8f38cb5af7da9c7f0f66416900070b949daa62cf92bbdc6fd7',
          endPeriod: ['5 days', '20 hrs', '32 mins', '42 s'],
          activatePeriod: ['5 days', '21 hrs', '2 mins', '48 s'],
          votedAye: '1354861114902400',
          formattedVotedAye: '135,486.1114 DOT',
          votedNay: '0',
          formattedVotedNay: '0.0000 DOT',
          voteCountAye: '128',
          voteCountNay: '0',
          ayePercent: 104.51,
          args: [
            {
              name: 'para',
              type: 'u32',
              value: '2019',
              subCalls: [],
            },
            {
              name: 'newCode',
              type: 'Bytes',
              value: '0x52bc537646db8e0528b52ffd0058d491…f4a87be408f2f1430ae825a28f1d0901',
              subCalls: [],
            },
          ],
        },
        {
          __typename: 'SubstrateChainDemocracyReferendum',
          index: '56',
          meta: 'Set the storage for the parachain validation code immediately.',
          method: 'forceSetCurrentCode',
          section: 'paras',
          hash: '0xad2813b46b52fe8f38cb5af7da9c7f0f66416900070b949daa62cf92bbdc6fd7',
          endPeriod: ['5 days', '20 hrs', '32 mins', '42 s'],
          activatePeriod: ['5 days', '21 hrs', '2 mins', '48 s'],
          votedAye: '1354861114902400',
          formattedVotedAye: '135,486.1114 DOT',
          votedNay: '0',
          formattedVotedNay: '0.0000 DOT',
          voteCountAye: '128',
          voteCountNay: '0',
          ayePercent: 104.51,
          args: [
            {
              name: 'para',
              type: 'u32',
              value: '2019',
              subCalls: [],
            },
            {
              name: 'newCode',
              type: 'Bytes',
              value: '0x52bc537646db8e0528b52ffd0058d491…f4a87be408f2f1430ae825a28f1d0901',
              subCalls: [],
            },
          ],
        },
      ],
    }),
  );
});
