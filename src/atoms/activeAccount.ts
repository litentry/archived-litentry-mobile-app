import {atom, RecoilState, useRecoilState} from 'recoil';
import {persistAtom} from '@atoms/persist';
import type {KeyringAccount} from 'polkadot-api';

const activeAccountState: RecoilState<KeyringAccount> = atom({
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
