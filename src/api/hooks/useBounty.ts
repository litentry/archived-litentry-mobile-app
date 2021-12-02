import {useBounties} from 'src/api/hooks/useBounties';

export function useBounty(index: string) {
  const bountiesResult = useBounties();

  return bountiesResult.data?.[index];
}
