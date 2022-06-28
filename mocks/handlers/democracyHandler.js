import {graphql} from 'msw';

export const democracyHandler = graphql.query('getDemocracy', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainDemocracyProposals: [
        {
          __typename: 'SubstrateChainDemocracyProposal',
          index: '73',
          balance: '10000000000',
          formattedBalance: '0.0100 KSM',
          seconds: [
            {
              __typename: 'SubstrateChainAccountInfo',
              account: {
                __typename: 'SubstrateChainAccount',
                address: 'EPPNDdGn4kEPeHzdGPzJ3seYw3AmKENpuVzpT2JyD87FCPA',
                display: 'Shiden Network',
                hasIdentity: true,
                registration: {
                  __typename: 'SubstrateChainDeriveAccountRegistration',
                  display: 'Shiden Network',
                  displayParent: null,
                  email: 'admin@stake.co.jp',
                  image: null,
                  legal: null,
                  pgp: null,
                  riot: null,
                  twitter: '@ShidenNetwork',
                  web: 'https://shiden.astar.network/',
                  judgements: [],
                },
                balance: {
                  __typename: 'SubstrateChainAccountBalance',
                  total: '63807505269504',
                  formattedTotal: '63.8075 KSM',
                  reserved: '59508729798536',
                  formattedReserved: '59.5087 KSM',
                  free: '4298775470968',
                  formattedFree: '4.2987 KSM',
                  feeFrozen: '0',
                  formattedFeeFrozen: '0.0000 KSM',
                },
              },
            },
          ],
          meta: 'Send a batch of dispatch calls.',
          method: 'batch',
          section: 'utility',
          hash: '0x66cb3ecc23fd2ef262f8f451e4f0e0dfcfd2e276b3438dc800522df4863659db',
          proposer: {
            __typename: 'SubstrateChainAccountInfo',
            account: {
              __typename: 'SubstrateChainAccount',
              address: 'EPPNDdGn4kEPeHzdGPzJ3seYw3AmKENpuVzpT2JyD87FCPA',
              display: 'Shiden Network',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Shiden Network',
                displayParent: null,
                email: 'admin@stake.co.jp',
                image: null,
                legal: null,
                pgp: null,
                riot: null,
                twitter: '@ShidenNetwork',
                web: 'https://shiden.astar.network/',
                judgements: [],
              },
              balance: {
                __typename: 'SubstrateChainAccountBalance',
                total: '63807505269504',
                formattedTotal: '63.8075 KSM',
                reserved: '59508729798536',
                formattedReserved: '59.5087 KSM',
                free: '4298775470968',
                formattedFree: '4.2987 KSM',
                feeFrozen: '0',
                formattedFeeFrozen: '0.0000 KSM',
              },
            },
          },
          args: [
            {
              __typename: 'SubstrateChainProposalArg',
              name: 'calls',
              type: 'Vec<Call>',
              value: 'SubCalls',
              subCalls: [
                {
                  __typename: 'SubstrateChainProposalSubCall',
                  meta: 'Exactly as transfer, except the origin must be root and the source account may be specified. ',
                  method: 'forceTransfer',
                  section: 'balances',
                  args: [
                    {
                      __typename: 'SubstrateChainProposalArg',
                      name: 'source',
                      type: 'MultiAddress',
                      value: 'F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29',
                    },
                    {
                      __typename: 'SubstrateChainProposalArg',
                      name: 'dest',
                      type: 'MultiAddress',
                      value: 'F7fq1jSNVTPfJmaHaXCMtatT1EZefCUsa7rRiQVNR5efcah',
                    },
                    {
                      __typename: 'SubstrateChainProposalArg',
                      name: 'value',
                      type: 'Compact<u128>',
                      value: '1000000000000',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      substrateChainDemocracyReferendums: [
        {
          __typename: 'SubstrateChainDemocracyReferendum',
          index: '211',
          meta: 'Set the storage for the current parachain head data immediately.',
          method: 'forceSetCurrentHead',
          section: 'paras',
          hash: '0x3ad9336915ecedeca1a1e491ea9f83c678f15b52b75923c3bc155505e0cdba66',
          imageHash: '0x3ad9336915ecedeca1a1e491ea9f83c678f15b52b75923c3bc155505e0cdba66',
          endPeriod: ['5 days', '5 hrs', '48 mins', '36 s'],
          activatePeriod: ['13 days', '5 hrs', '48 mins', '42 s'],
          votedAye: '1010670480000000',
          formattedVotedAye: '1,010.6704 KSM',
          votedNay: '9110299331849423',
          formattedVotedNay: '9,110.2993 KSM',
          voteCountAye: '112',
          voteCountNay: '628',
          ayePercent: 9.94,
          args: [
            {__typename: 'SubstrateChainProposalArg', name: 'para', type: 'u32', value: '2102', subCalls: []},
            {
              __typename: 'SubstrateChainProposalArg',
              name: 'newHead',
              type: 'Bytes',
              value: '0x00000000000000000000000000000000…b157e78786d8c082f29dcf4c11131400',
              subCalls: [],
            },
          ],
        },
      ],
    }),
  );
});
