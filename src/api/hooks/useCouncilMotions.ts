import useApiQuery from 'src/api/hooks/useApiQuery';

export function useCouncilMotions() {
  return useApiQuery('council-motions', (api) => api.derive.council.proposals());
}
