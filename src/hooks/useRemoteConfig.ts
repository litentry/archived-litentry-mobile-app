import {useCallback, useEffect} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

type ConfigKey = 'token_bridge_test'; // | 'other_config_keys'

export function useRemoteConfig() {
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        token_bridge_test: '',
      })
      .then(() => remoteConfig().fetchAndActivate());
  }, []);

  const getValue = useCallback((configKey: ConfigKey) => {
    return remoteConfig().getValue(configKey);
  }, []);

  return {
    getValue,
  };
}
