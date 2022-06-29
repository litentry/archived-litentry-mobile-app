import {atom, RecoilState, useRecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import type {Account} from '@polkadotApi/types';

const activeAccountState: RecoilState<Account> = atom({
  key: 'activeAccount',
  default: {},
  effects: [persistAtom],
});

export function useActiveAccount() {
  const [activeAccount, selectActiveAccount] = useRecoilState(activeAccountState);

  return {
    activeAccount,
    selectActiveAccount,
  };
}
