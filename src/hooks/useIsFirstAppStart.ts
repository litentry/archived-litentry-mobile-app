import {useQuery} from 'react-query';
import * as Storage from 'src/service/PersistedObjectStorage';

// Check if it's the first time the app is launched
export function useIsFirstAppStart() {
  return useQuery('is_first_app_start', async () => Storage.getItem('is_first_app_start', true), {
    onSuccess: async (data) => {
      if (data) {
        Storage.setItem('is_first_app_start', false);
      }
    },
  });
}
