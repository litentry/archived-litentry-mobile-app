import {useEffect, useRef, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {mnemonicState} from './atoms';

export function useGenerateMnemonic() {
  const [{mnemonic, generate}] = useRecoilState(mnemonicState);
  const resolveRef = useRef<(mnemonic: string) => void>();

  useEffect(() => {
    if (mnemonic) {
      resolveRef.current?.(mnemonic);
    }
  }, [mnemonic]);

  const generateMnemonic = useCallback(
    () =>
      new Promise<string>((resolve) => {
        resolveRef.current = resolve;
        generate();
      }),
    [generate],
  );

  return {
    generateMnemonic,
    mnemonic,
  };
}
