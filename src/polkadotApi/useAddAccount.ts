import {useEffect, useRef, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {accountState} from './atoms';
import type {AddAccountPayload} from './types';

export function useAddAccount() {
  const [{account, create}] = useRecoilState(accountState);
  const resolveRef = useRef<(_account: Record<string, unknown>) => void>();

  useEffect(() => {
    if (account) {
      resolveRef.current?.(account);
    }
  }, [account]);

  const addAccount = useCallback(
    (payload: AddAccountPayload) =>
      new Promise<Record<string, unknown>>((resolve) => {
        resolveRef.current = resolve;
        create(payload);
      }),
    [create],
  );

  return {
    addAccount,
    account,
  };
}
