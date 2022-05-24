import {graphql} from 'msw';

export const bountiesHandler = graphql.query('getBounties', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainBounties: [
        {
          index: '13',
          description: 'ORML Security Bounty',
          formattedFee: '0.0000 DOT',
          formattedCuratorDeposit: '0.0000 DOT',
          formattedValue: '100,000.0000 DOT',
          formattedBond: '1.2000 DOT',
          proposer: {
            account: {
              display: 'Acala Foundation',
            },
          },
          bountyStatus: {
            beneficiary: null,
            status: 'Active',
            curator: {
              account: {
                display: 'ORML Security Bounty Curator',
              },
            },
            unlockAt: null,
            unlockAtTime: null,
            updateDue: '10743134',
            updateDueTime: ['34 days', '13 hrs', '47 mins', '54 s'],
          },
        },
        {
          index: '16',
          description: 'go',
          formattedFee: '0.0000 DOT',
          formattedCuratorDeposit: '0.0000 DOT',
          formattedValue: '1,000.0000 DOT',
          formattedBond: '1.0200 DOT',
          proposer: {
            account: {
              display: '16AE6C2WBPHFGNU1XKNPMPVBG3HHXKO6UAVEDHEOWX1GMHDT',
            },
          },
          bountyStatus: {
            beneficiary: null,
            status: 'Proposed',
            curator: null,
            unlockAt: null,
            unlockAtTime: null,
            updateDue: null,
            updateDueTime: null,
          },
        },
        {
          index: '15',
          description: 'Polkascan Foundation Budget | Common Good Organization',
          formattedFee: '0.0000 DOT',
          formattedCuratorDeposit: '0.0000 DOT',
          formattedValue: '100,000.0000 DOT',
          formattedBond: '1.5400 DOT',
          proposer: {
            account: {
              display: '1HBSVXBKZWMAGYTBPFCTCQ5NTZWGQTDSW6L8SDAJNPRJJ7Z',
            },
          },
          bountyStatus: {
            beneficiary: null,
            status: 'Proposed',
            curator: null,
            unlockAt: null,
            unlockAtTime: null,
            updateDue: null,
            updateDueTime: null,
          },
        },
        {
          index: '10',
          description: 'Polkadot Pioneers Prize, an Incentive Prize Program',
          formattedFee: '0.0000 DOT',
          formattedCuratorDeposit: '0.0000 DOT',
          formattedValue: '993,286.0800 DOT',
          formattedBond: '1.5100 DOT',
          proposer: {
            account: {
              display: 'Parity Technologies GmbH',
            },
          },
          bountyStatus: {
            beneficiary: null,
            status: 'Active',
            curator: {
              account: {
                display: 'Polkadot Pioneers Prize Curator',
              },
            },
            unlockAt: null,
            unlockAtTime: null,
            updateDue: '11529079',
            updateDueTime: ['89 days', '3 hrs', '42 mins', '24 s'],
          },
        },
        {
          index: '11',
          description: 'Anti-Scam Bounty',
          formattedFee: '0.0000 DOT',
          formattedCuratorDeposit: '0.0000 DOT',
          formattedValue: '7,500.0000 DOT',
          formattedBond: '1.1600 DOT',
          proposer: {
            account: {
              display: 'michalis',
            },
          },
          bountyStatus: {
            beneficiary: null,
            status: 'Active',
            curator: {
              account: {
                display: 'Anti-Scam Bounty General Curator',
              },
            },
            unlockAt: null,
            unlockAtTime: null,
            updateDue: '11427657',
            updateDueTime: ['82 days', '2 hrs', '40 mins', '12 s'],
          },
        },
      ],
    }),
  );
});
