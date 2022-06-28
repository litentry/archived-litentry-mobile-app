import {graphql} from 'msw';

export const moduleElectionHandler = graphql.query('getModuleElection', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainModuleElection: {
        module: 'phragmenElection',
        hasElections: true,
        votingBondBase: '200640000000',
        votingBondFactor: '320000000',
        candidacyBond: '1000000000000',
      },
    }),
  );
});
