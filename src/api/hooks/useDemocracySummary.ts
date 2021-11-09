import useApiQuery from 'src/api/hooks/useApiQuery';

export function useDemocracySummary() {
  return useApiQuery(['democracy_summary'], async (api) => {
    const [referendumIds, activeProposals, publicPropCount, referendumTotal] = await Promise.all([
      api.derive.democracy.referendumIds(),
      api.derive.democracy.proposals(),
      api.query.democracy.publicPropCount(),
      api.query.democracy.referendumCount(),
    ]);

    return {
      activeProposalsCount: activeProposals.length,
      publicPropCount,
      referendumTotal,
      referenda: referendumIds.length,
      launchPeriod: api.consts.democracy.launchPeriod,
    };
  });
}
