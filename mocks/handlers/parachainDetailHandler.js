import {graphql} from 'msw';

export const parachainDetailHandler = graphql.query('getParaChainById', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainParachain: {
        __typename: 'SubstrateChainParachain',
        id: '2004',
        name: 'Moonbeam',
        lease: {__typename: 'SubstrateChainLease', period: '7 - 13', blockTime: ['512 days', '30 mins', '18 s']},
        lifecycle: 'Parachain',
        lastIncludedBlock: '',
        lastBackedBlock: '10482897',
        homepage: 'https://moonbeam.network/networks/moonbeam/',
        validators: {__typename: 'SubstrateChainValidatorsGroup', groupIndex: null, validators: []},
        nonVoters: [
          {
            __typename: 'SubstrateChainAccount',
            address: '111B8CxcmnWbuDLyGvgUmRezDCK1brRZmvUuQ6SrFdMyc3S',
            display: '111B8CXCMNWBUDLYGVGUMREZDCK1BRRZMVUUQ6SRFDMYC3S',
          },
        ],
      },
    }),
  );
});
