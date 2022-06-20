import {useRecoilValue} from 'recoil';
import {cryptoUtilState} from './atoms';

export function useCryptoUtil() {
  const cryptoUtil = useRecoilValue(cryptoUtilState);

  return cryptoUtil;
}
