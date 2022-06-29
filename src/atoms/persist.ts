import {recoilPersist} from 'recoil-persist';
import * as Storage from 'src/service/PersistedObjectStorage';

export const {persistAtom} = recoilPersist({
  key: 'recoil-persist',
  storage: Storage,
});
