import {graphql} from 'msw';

export const chainInfoHandler = graphql.query('getChainInfo', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainChainInfo: {
        __typename: 'SubstrateChainChainInfo',
        auctionsLeasePeriodSlot: '8',
        chain: 'Polkadot',
        crowdloanMinContribution: '50000000000',
        democracyEnactmentPeriod: '403200',
        democracyMinimumDeposit: '1000000000000',
        existentialDeposit: '10000000000',
        formattedExistentialDeposit: '1.0000 DOT',
        nodeName: 'Parity Polkadot',
        nodeVersion: '0.9.20-8bd543d65cd',
        registry: {__typename: 'SubstrateChainRegistry', decimals: 10, token: 'DOT'},
        slotsLeasePeriod: '1209600',
      },
    }),
  );
});
