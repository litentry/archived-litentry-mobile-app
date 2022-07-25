import {useRecoilValue} from 'recoil';
import {apiStatusState} from './atoms';

export function usePolkadotApiStatus() {
  return useRecoilValue(apiStatusState);
}
