import useApiQuery from 'src/api/hooks/useApiQuery';

export function useDemocracy() {
  return useApiQuery(['democracy'], async (api) => {
    const [referendums, activeProposals] = await Promise.all([
      api.derive.democracy.referendums(),
      api.derive.democracy.proposals(),
    ]);

    return {
      activeProposals,
      referendums,
    };
  });
}
