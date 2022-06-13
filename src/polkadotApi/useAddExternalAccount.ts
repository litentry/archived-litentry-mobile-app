import {useEffect, useRef, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {externalAccountState} from './atoms';
import type {AddExternalAccountPayload} from './types';

export function useAddExternalAccount() {
  const [{account, add}] = useRecoilState(externalAccountState);
  const resolveRef = useRef<(_account: Record<string, unknown>) => void>();

  useEffect(() => {
    if (account) {
      resolveRef.current?.(account);
    }
  }, [account]);

  const addExternalAccount = useCallback(
    (payload: AddExternalAccountPayload) =>
      new Promise<Record<string, unknown>>((resolve) => {
        resolveRef.current = resolve;
        add(payload);
      }),
    [add],
  );

  return {
    addExternalAccount,
    account,
  };
}
