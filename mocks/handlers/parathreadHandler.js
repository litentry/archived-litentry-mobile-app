import {graphql} from 'msw';

export const parathreadsHandler = graphql.query('getParathread', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainParathreads: [
        {
          __typename: 'SubstrateChainParathread',
          id: '2013',
          name: 'Litentry',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'Litentry',
              address: '152deMvsN7wxMbSmdApsds6LWNNNGgsJ8TTpZLTD2ipEHNg3',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Litentry',
                displayParent: null,
                email: 'info@litentry.com',
                image: null,
                legal: 'Litentry',
                pgp: null,
                riot: null,
                twitter: null,
                web: null,
                judgements: [
                  {
                    __typename: 'SubstrateChainRegistrationJudgement',
                    registrarIndex: 1,
                    judgement: {
                      __typename: 'SubstrateChainIdentityJudgement',
                      isUnknown: false,
                      isFeePaid: false,
                      isReasonable: true,
                      isKnownGood: false,
                      isOutOfDate: false,
                      isLowQuality: false,
                      isErroneous: false,
                    },
                  },
                ],
              },
              balance: {
                __typename: 'SubstrateChainAccountBalance',
                total: '17322774998750',
                formattedTotal: '1,732.2774 DOT',
                reserved: '14121430000000',
                formattedReserved: '1,412.1430 DOT',
                free: '3201344998750',
                formattedFree: '320.1344 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: {
            __typename: 'SubstrateChainLease',
            period: '9 - 16',
            blockTime: ['55 days', '19 hrs', '34 mins', '36 s'],
          },
          homepage: 'https://crowdloan.litentry.com',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2037',
          name: 'Unique Network',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'Unique Network',
              address: '14bEKMdGLwGKNTz4BtT7venXZ4RcXdGfBSdEYrJLPNoHRvoK',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Unique Network',
                displayParent: null,
                email: 'hello@unique.network',
                image: null,
                legal: null,
                pgp: null,
                riot: null,
                twitter: '@Unique_NFTchain',
                web: 'https://unique.network',
                judgements: [],
              },
              balance: {
                __typename: 'SubstrateChainAccountBalance',
                total: '14656229998682',
                formattedTotal: '1,465.6229 DOT',
                reserved: '14551480000000',
                formattedReserved: '1,455.1480 DOT',
                free: '104749998682',
                formattedFree: '10.4749 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: {
            __typename: 'SubstrateChainLease',
            period: '9 - 16',
            blockTime: ['55 days', '19 hrs', '34 mins', '36 s'],
          },
          homepage: 'https://unique.network/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2003',
          name: 'Darwinia',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'Darwinia Dev',
              address: '1EdsnniYSKNjHNAvDgvBfRNzKnSzi6kgsHQFCG4PhAyyJWH',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Darwinia Dev',
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
                total: '48260176999042',
                formattedTotal: '4,826.0176 DOT',
                reserved: '6671720000000',
                formattedReserved: '667.1720 DOT',
                free: '41588456999042',
                formattedFree: '4,158.8456 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'https://darwinia.network/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2007',
          name: 'Kapex',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'Totem Live Accounting',
              address: '16g6knFgxm386vXJuHZ58ZQC39H9RSFN7sDRPSimCDJiTHcb',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Totem Live Accounting',
                displayParent: null,
                email: 'info@totemaccounting.com',
                image: null,
                legal: 'Totem Accounting',
                pgp: null,
                riot: null,
                twitter: '@Totem_Live_',
                web: 'https://totemaccounting.com',
                judgements: [
                  {
                    __typename: 'SubstrateChainRegistrationJudgement',
                    registrarIndex: 0,
                    judgement: {
                      __typename: 'SubstrateChainIdentityJudgement',
                      isUnknown: false,
                      isFeePaid: true,
                      isReasonable: false,
                      isKnownGood: false,
                      isOutOfDate: false,
                      isLowQuality: false,
                      isErroneous: false,
                    },
                  },
                  {
                    __typename: 'SubstrateChainRegistrationJudgement',
                    registrarIndex: 1,
                    judgement: {
                      __typename: 'SubstrateChainIdentityJudgement',
                      isUnknown: false,
                      isFeePaid: false,
                      isReasonable: true,
                      isKnownGood: false,
                      isOutOfDate: false,
                      isLowQuality: false,
                      isErroneous: false,
                    },
                  },
                ],
              },
              balance: {
                __typename: 'SubstrateChainAccountBalance',
                total: '13729484998923',
                formattedTotal: '1,372.9484 DOT',
                reserved: '6888920000000',
                formattedReserved: '688.8920 DOT',
                free: '6840564998923',
                formattedFree: '684.0564 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'https://totemaccounting.com/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2008',
          name: 'Crust',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '13QRQ7XOS6BSEIVYW3XRJVI4T2IHIHXVNTRQGYHMWGTNV972',
              address: '13QrQ7Xos6bseivYW3xRjvi4T2iHihxVnTrQgyHmWGTNv972',
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
                total: '12365934999259',
                formattedTotal: '1,236.5934 DOT',
                reserved: '7326850000000',
                formattedReserved: '732.6850 DOT',
                free: '5039084999259',
                formattedFree: '503.9084 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'https://crust.network',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2017',
          name: 'SubGame Gamma',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '16RZECGXVZXXN2GEQBQQP74PW7MJSB7PKTZ29BHVZMPXBKRN',
              address: '16RzEcgXVzXXn2gEQbqqp74Pw7MJSb7PKtz29BhVZmpXBKRn',
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
                total: '11724002999107',
                formattedTotal: '1,172.4002 DOT',
                reserved: '5523730000000',
                formattedReserved: '552.3730 DOT',
                free: '6200272999107',
                formattedFree: '620.0272 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'http://subgame.org/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2018',
          name: 'SubDAO',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '13N7S6WAFJSQPPXYJFSXCPNQQV5JL7PYTXJG3GXW3RALPYBK',
              address: '13n7S6wAFjSqppxyjfSxcPNqQv5jL7PYtxjg3Gxw3RALpyBk',
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
                total: '14371125998862',
                formattedTotal: '1,437.1125 DOT',
                reserved: '6371660000000',
                formattedReserved: '637.1660 DOT',
                free: '7999465998862',
                formattedFree: '799.9465 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'https://subdao.network/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2027',
          name: 'Coinversation',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'coinversation',
              address: '14r48SVtMrJKxUWD9ijDy8aQU3asTXja8qny9mzXTutdByju',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'coinversation',
                displayParent: null,
                email: null,
                image: null,
                legal: 'paul',
                pgp: null,
                riot: null,
                twitter: '@Coinversation_',
                web: 'http://coinversation.io/',
                judgements: [],
              },
              balance: {
                __typename: 'SubstrateChainAccountBalance',
                total: '12543970998899',
                formattedTotal: '1,254.3970 DOT',
                reserved: '11415020000000',
                formattedReserved: '1,141.5020 DOT',
                free: '1128950998899',
                formattedFree: '112.8950 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'http://www.coinversation.io/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2028',
          name: 'Ares Odyssey',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '13PQT6LNK2TXZTXBIQ6PBYIKEONTI6MXKEBDQCEYR9HM6K1P',
              address: '13pQt6LnK2tXZtXbiQ6PBYikEoNTi6MXkeBdQCeyR9hm6k1p',
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
                total: '6026688999100',
                formattedTotal: '602.6688 DOT',
                reserved: '1001960000000',
                formattedReserved: '100.1960 DOT',
                free: '5024728999100',
                formattedFree: '502.4728 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'https://www.aresprotocol.io/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2038',
          name: 'Geminis',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '15STAT13QDGKJXBQLQ8MJCDYGTSPFR8HYBWIAGMRZPJNKSCK',
              address: '15STAT13QDgKjxBQLQ8mjcdYgtSpfR8HyBwiAGmRZpJNKSck',
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
                total: '19465502999393',
                formattedTotal: '1,946.5502 DOT',
                reserved: '11339830000000',
                formattedReserved: '1,133.9830 DOT',
                free: '8125672999393',
                formattedFree: '812.5672 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'https://geminis.network/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2040',
          name: 'Polkadex',
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '12JYUVKTDKEC6C4G4D5FUW9MLGUDBXVJRHMBKHEGYQARUZBQ',
              address: '12jYuVktdKEC6C4g4d5fuW9MLgUDbxvJRhMBkhEGyqarUzbQ',
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
                total: '16498913410937',
                formattedTotal: '1,649.8913 DOT',
                reserved: '14744200000000',
                formattedReserved: '1,474.4200 DOT',
                free: '1754713410937',
                formattedFree: '175.4713 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: 'https://polkadex.trade/',
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2015',
          name: null,
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'Manta Network on Polkadot',
              address: '1k9St8FDkcTVSe6HzSRQivYi3qgRuQfQp8btpVMrdTFs99S',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Manta Network on Polkadot',
                displayParent: null,
                email: 'contact@manta.network',
                image: null,
                legal: 'Manta Network',
                pgp: null,
                riot: null,
                twitter: '@mantanetwork',
                web: 'https://manta.network',
                judgements: [],
              },
              balance: {
                __typename: 'SubstrateChainAccountBalance',
                total: '27872527905853',
                formattedTotal: '2,787.2527 DOT',
                reserved: '6828650000000',
                formattedReserved: '682.8650 DOT',
                free: '21043877905853',
                formattedFree: '2,104.3877 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: null,
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2030',
          name: null,
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: 'Bifrost Foundation',
              address: '133VgJJgp1s9wxLqgCFxYx6T873hZQNchJM9tmbU6NkYaaqW',
              hasIdentity: true,
              registration: {
                __typename: 'SubstrateChainDeriveAccountRegistration',
                display: 'Bifrost Foundation',
                displayParent: null,
                email: 'hello@bifrost.finance',
                image: null,
                legal: 'BIFROST FOUNDATION',
                pgp: null,
                riot: null,
                twitter: '@bifrost_finance',
                web: 'https://bifrost.finance',
                judgements: [],
              },
              balance: {
                __typename: 'SubstrateChainAccountBalance',
                total: '20283514998738',
                formattedTotal: '2,028.3514 DOT',
                reserved: '13344620000000',
                formattedReserved: '1,334.4620 DOT',
                free: '6938894998738',
                formattedFree: '693.8894 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: null,
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2036',
          name: null,
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '12JYUVKTDKEC6C4G4D5FUW9MLGUDBXVJRHMBKHEGYQARUZBQ',
              address: '12jYuVktdKEC6C4g4d5fuW9MLgUDbxvJRhMBkhEGyqarUzbQ',
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
                total: '16498913410937',
                formattedTotal: '1,649.8913 DOT',
                reserved: '14744200000000',
                formattedReserved: '1,474.4200 DOT',
                free: '1754713410937',
                formattedFree: '175.4713 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: null,
        },
        {
          __typename: 'SubstrateChainParathread',
          id: '2043',
          name: null,
          manager: {
            account: {
              __typename: 'SubstrateChainAccount',
              display: '1R2HZGNQDCTXLHEWTHHIUN22WNXJJD5JAZ85MVJYW2BK1YZ',
              address: '1R2HzgNqDctXLhEWthHiun22WnxjJD5jaz85mVjYW2bk1yZ',
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
                total: '13530609999016',
                formattedTotal: '1,353.0609 DOT',
                reserved: '11574520000000',
                formattedReserved: '1,157.4520 DOT',
                free: '1956089999016',
                formattedFree: '195.6089 DOT',
                freeFrozen: '0',
                formattedFreeFrozen: '0.0000 DOT',
              },
            },
          },
          lease: null,
          homepage: null,
        },
      ],
    }),
  );
});
