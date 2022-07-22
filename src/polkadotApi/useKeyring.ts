import {useRecoilValue} from 'recoil';
import {keyringState, webViewReadyState} from './atoms';

export function useKeyring() {
  const isReady = useRecoilValue(webViewReadyState);
  const keyring = useRecoilValue(keyringState);

  return {isReady, ...keyring};
}
