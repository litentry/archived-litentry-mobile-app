import {useRecoilState} from 'recoil';
import {cryptoUtilState} from './atoms';

export function useCryptoUtil() {
  const [cryptoUtil] = useRecoilState(cryptoUtilState);

  return cryptoUtil;
}
