import {useRecoilValue} from 'recoil';
import {apiState} from './atoms';

export function usePolkadotApiState() {
  return useRecoilValue(apiState);
}
