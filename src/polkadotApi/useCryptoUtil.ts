import {useRecoilValue} from 'recoil';
import {cryptoUtilState, webViewReadyState} from './atoms';

export function useCryptoUtil() {
  const isReady = useRecoilValue(webViewReadyState);
  const cryptoUtil = useRecoilValue(cryptoUtilState);

  return {isReady, ...cryptoUtil};
}
