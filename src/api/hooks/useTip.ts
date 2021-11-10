import useApiQuery from 'src/api/hooks/useApiQuery';

export function useTip(hash: string) {
  return useApiQuery(['tip', hash], async (api) => {
    const tip = await api.query.tips.tips(hash);
    return tip.unwrap();
  });
}
