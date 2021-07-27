import useApiQuery from 'src/api/hooks/useApiQuery';

export function useDemocracy() {
  return useApiQuery(['democracy'], async (api) => {
    const [referendums, activeProposals, publicPropCount, referendumTotal] = await Promise.all([
      api.derive.democracy.referendums(),
      api.derive.democracy.proposals(),
      api.query.democracy.publicPropCount(),
      api.query.democracy.referendumCount(),
    ]);

    return {
      activeProposals,
      publicPropCount,
      referendumTotal,
      referendums,
      launchPeriod: api.consts.democracy.launchPeriod,
    };
  });
}
