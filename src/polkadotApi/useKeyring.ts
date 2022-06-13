import {useRecoilState} from 'recoil';
import {keyringState} from './atoms';

export function useKeyring() {
  const [keyring] = useRecoilState(keyringState);

  return {
    ...keyring,
  };
}
