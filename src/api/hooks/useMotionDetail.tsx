import useApiQuery from 'src/api/hooks/useApiQuery';

export function useMotionDetail({hash}: {hash: string}) {
  return useApiQuery('motion-detail', async (api) => {
    return api.derive.council.proposal(hash);
  });
}
