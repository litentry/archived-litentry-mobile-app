import {useRecoilValue} from 'recoil';
import {keyringState} from './atoms';

export function useKeyring() {
  const keyring = useRecoilValue(keyringState);

  return keyring;
}
