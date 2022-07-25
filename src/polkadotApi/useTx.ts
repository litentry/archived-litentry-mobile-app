import {useRecoilValue} from 'recoil';
import {txState} from './atoms';

export function useTx() {
  return useRecoilValue(txState);
}
