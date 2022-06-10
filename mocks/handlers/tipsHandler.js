import {graphql} from 'msw';

export const tipsHandler = graphql.query('getTips', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainTips: [
        {
          __typename: 'SubstrateChainTip',
          id: '0xe72fd92707ea62a5df6f2472e366cee5e99fbcd0a68f2940879ff9e420bbc489',
          createdAt: '2022-01-11T18:09:36.006Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'GXEnsvjHTrdX4MW3oD217pw6fiRBM3ryeqG5ZdATNwMpU5A',
            display: 'SPRIN',
          },
          reason: 'For dubbing this video in Spanish: https://www.youtube.com/watch?v=t7BmJxp90to (See PA)',
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0x7db9e42a53c018e38047e8f67218ffcb329587377b24c69dc8e52d68bbf1cf9c',
          createdAt: '2022-01-12T16:44:42.005Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'GXEnsvjHTrdX4MW3oD217pw6fiRBM3ryeqG5ZdATNwMpU5A',
            display: 'SPRIN',
          },
          reason: 'For dubbing this video in Spanish: https://www.youtube.com/watch?v=VfsE1Q3l0QI (See PA)',
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0x3dc972101062feea2f9d61950d2f64bc8c846009ff4d8df500e15764e8f9cdfc',
          createdAt: '2022-01-13T11:55:54.018Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'GXEnsvjHTrdX4MW3oD217pw6fiRBM3ryeqG5ZdATNwMpU5A',
            display: 'SPRIN',
          },
          reason: "For dubbing this Rob Habermeier's video in Spanish: https://www.youtube.com/watch?v=5B5saQtkKI8",
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0xb1e16ddff0e64c5e32b0635934dd1d7a184fc4b44d9d8ab796d2bdff8f0a4d45',
          createdAt: '2022-01-14T15:57:18.017Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'Hh8u5FZAT5iTcRJHoWiuaDRYQKGdsEGNQ9tAJ7dLuGn5Pw3',
            display: 'HH8U5FZAT5ITCRJHOWIUADRYQKGDSEGNQ9TAJ7DLUGN5PW3',
          },
          reason: 'For dubbing this video in Valencian: https://www.youtube.com/watch?v=pPFVxjtes2U',
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0x00db44ec98d76c729fe6b35f999d2884e87789b516d6bfff517cc1b684805006',
          createdAt: '2022-01-14T19:12:36.017Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'DxErsWqBducKTqxq7dwXKk2kevAzWEWaYJjwtwzqCu2r3F4',
            display: 'gtstaking',
          },
          reason:
            'For detailed tutorials on Polkadot and Kusama in French | Youtube : https://www.youtube.com/channel/UC9ITP6uEWJ-Z8nXwHvaOfqQ',
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0x75794c0b64bcb2791e4fe4fd3836fcbd20ee3761d3a8e5b016a88ce4cd1ff711',
          createdAt: '2022-01-17T13:34:42.016Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'EzVt5Z3pddR55HnS637AEqTutcxPDMKux2JzjK7pDG85Nmz',
            display: 'Crane',
          },
          reason: 'Great indepth analysis articles on SubSocial by Crane ',
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0x56023dc6a1db49e2efff341457320d1ebe9fd1807847daa961c70148cb6f64f7',
          createdAt: '2022-01-17T13:59:00.036Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'GXEnsvjHTrdX4MW3oD217pw6fiRBM3ryeqG5ZdATNwMpU5A',
            display: 'SPRIN',
          },
          reason: "For dubbing this Jutta Steiner's video in Spanish: https://www.youtube.com/watch?v=SsKiCHG0rDc",
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0xa7436a3e5a34141f63138d78281d113fde86cb18199b06a4061ee8f4891ffabb',
          createdAt: '2022-01-17T15:00:36.011Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'G2e4YrQ8CQ4yw7iy5yu9yB5vHxJjfS3q4T46ojazqsYkKjV',
            display: 'TheFVK',
          },
          reason: '15 Unique and Thought Provoking Twitter Threads.',
          status: 'Opened',
        },
        {
          __typename: 'SubstrateChainTip',
          id: '0x200fb14bdc20d38392c719a34ca76168328e3448282d074a1d4cca83acbf6937',
          createdAt: '2022-01-18T11:25:18.019Z',
          who: {
            __typename: 'SubstrateChainAccount',
            address: 'H1tAQMm3eizGcmpAhL9aA9gR844kZpQfkU7pkmMiLx9jSzE',
            display: 'turboflakes.io',
          },
          reason:
            'For the development https://github.com/turboflakes/scouty - A CLI based tool to administer substrate nodes upon event (See PA)',
          status: 'Opened',
        },
      ],
    }),
  );
});
