import {graphql} from 'msw';

export const councilHandler = graphql.query('getCouncil', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCouncil: {
        __typename: 'SubstrateChainCouncil',
        members: [
          {
            __typename: 'SubstrateChainCouncilMember',
            account: {
              __typename: 'SubstrateChainAccount',
              address: '1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL',
              display: 'RTTI-5220 (POLKADOT)',
            },
            backing: '217343856918926861',
            formattedBacking: '21.7343  MDOT',
            voters: ['15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo'],
          },
          {
            __typename: 'SubstrateChainCouncilMember',
            account: {
              __typename: 'SubstrateChainAccount',
              address: '12m16pNVG4QKDsr3d9hA1TMjNhSxdQaztqZ5jMC86HLba1Qw',
              display: 'lucasvo',
            },
            backing: '170566716067027827',
            formattedBacking: '17.0566  MDOT',
            voters: [
              '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
              '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
            ],
          },
        ],
        runnersUp: [
          {
            __typename: 'SubstrateChainCouncilMember',
            account: {
              __typename: 'SubstrateChainAccount',
              address: '13Gdmw7xZQVbVoojUCwnW2usEikF2a71y7aocbgZcptUtiX9',
              display: 'ROB',
            },
            backing: '128105548693344614',
            formattedBacking: '12.8105  MDOT',
            voters: ['136GehDWrz4tqL7ivAT53VeS3PweRZDSHyrbnWLdWJpchW8M'],
          },
          {
            __typename: 'SubstrateChainCouncilMember',
            account: {
              __typename: 'SubstrateChainAccount',
              address: '12RYJb5gG4hfoWPK3owEYtmWoko8G6zwYpvDYTyXFVSfJr8Y',
              display: '12RYJB5GG4HFOWPK3OWEYTMWOKO8G6ZWYPVDYTYXFVSFJR8Y',
            },
            backing: '105384371069834295',
            formattedBacking: '10.5384  MDOT',
            voters: [
              '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
              '13Hp4FEF7z7famvakw8cgioHqDxcnhnyQkvd1jF4dxn7cayG',
            ],
          },
        ],
        candidates: [],
        totalCandidates: 0,
        primeMember: {
          __typename: 'SubstrateChainCouncilMember',
          account: {
            __typename: 'SubstrateChainAccount',
            address: '13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2',
            display: '🍺 Gav 🥃/🏛 Council 🏛',
          },
          backing: '136018208470749931',
          formattedBacking: '13.6018  MDOT',
          voters: [],
        },
        desiredSeats: 13,
        totalMembers: 13,
        desiredRunnersUp: 20,
        totalRunnersUp: 17,
        termProgress: {
          __typename: 'SubstrateChainTermProgress',
          termDuration: '7 days',
          termDurationParts: ['7 days'],
          termLeft: '3 days 2 hrs',
          termLeftParts: ['3 days', '2 hrs', '31 mins', '24 s'],
          percentage: 55,
        },
      },
    }),
  );
});
