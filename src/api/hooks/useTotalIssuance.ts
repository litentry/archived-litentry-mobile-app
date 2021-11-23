import useApiQuery from 'src/api/hooks/useApiQuery';

export function useTotalIssuance() {
  return useApiQuery('total_issuance', (api) => api.query.balances.totalIssuance());
}
