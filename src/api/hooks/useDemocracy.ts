import useApiQuery from 'src/api/hooks/useApiQuery';

export function useDemocracy() {
  return useApiQuery(['democracy'], async (api) => {
    const [referndums, activeProposals, publicPropCount, referendumTotal] = await Promise.all([
      api.derive.democracy.referendums(),
      api.derive.democracy.proposals(),
      api.query.democracy.publicPropCount(),
      api.query.democracy.referendumCount(),
    ]);

    return {
      activeProposals,
      publicPropCount,
      referendumTotal,
      referndums,
      launchPeriod: api.consts.democracy.launchPeriod,
    };
  });
}
