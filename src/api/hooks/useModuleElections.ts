import useApiQuery from 'src/api/hooks/useApiQuery';

export function useModuleElections() {
  return useApiQuery(
    'module-elections',
    (api) => {
      const moduleElections = api.tx.phragmenElection
        ? 'phragmenElection'
        : api.tx.electionsPhragmen
        ? 'electionsPhragmen'
        : api.tx.elections
        ? 'elections'
        : null;
      return {
        module: moduleElections,
        hasElections: Boolean(moduleElections),
      };
    },
    {staleTime: Infinity},
  );
}
