import {useEffect, useRef, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {addressState} from './atoms';

export function useCreateAddress() {
  const [{address, generate}] = useRecoilState(addressState);
  const resolveRef = useRef<(address: string) => void>();

  useEffect(() => {
    if (address) {
      resolveRef.current?.(address);
    }
  }, [address]);

  const generateAddress = useCallback(
    (mnemonic: string) =>
      new Promise<string>((resolve) => {
        resolveRef.current = resolve;
        generate(mnemonic);
      }),
    [generate],
  );

  return {
    generateAddress,
    address,
  };
}
