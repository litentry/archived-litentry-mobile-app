import {graphql} from 'msw';

export const tipDetailHandler = graphql.query('getTip', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainTip: {
        __typename: 'SubstrateChainTip',
        id: '0xe72fd92707ea62a5df6f2472e366cee5e99fbcd0a68f2940879ff9e420bbc489',
        reason: 'For dubbing this video in Spanish: https://www.youtube.com/watch?v=t7BmJxp90to (See PA)',
        status: 'Opened',
        deposit: '6233333271',
        closes: null,
        closesTime: null,
        createdAt: '2022-01-11T18:09:36.006Z',
        medianTipValue: '1000000000000',
        formattedMedianTipValue: '1.0000 KSM',
        tippersCount: 2,
        who: {
          __typename: 'SubstrateChainAccount',
          address: 'GXEnsvjHTrdX4MW3oD217pw6fiRBM3ryeqG5ZdATNwMpU5A',
          display: 'SPRIN',
        },
        finder: {
          __typename: 'SubstrateChainAccount',
          address: 'DtRgaYr63H1JuDz6UUfihiAKEGfERrHuAaWxTD1ryzx5w3Q',
          display: 'CRYPTONITAS',
        },
        tippers: [
          {
            __typename: 'SubstrateChainTipper',
            formattedBalance: '1.0000 KSM',
            account: {
              __typename: 'SubstrateChainAccount',
              address: 'DbF59HrqrrPh9L2Fi4EBd7gn4xFUSXmrE6zyMzf3pETXLvg',
              display: 'Chevdor',
              hasIdentity: true,
              registration: null,
              balance: null,
            },
          },
          {
            __typename: 'SubstrateChainTipper',
            formattedBalance: '1.0000 KSM',
            account: {
              __typename: 'SubstrateChainAccount',
              address: 'Hjuii5eGVttxjAqQrPLVN3atxBDXPc4hNpXF6cPhbwzvtis',
              display: 'TAFKAPK',
              hasIdentity: true,
              registration: null,
              balance: null,
            },
          },
        ],
      },
    }),
  );
});
