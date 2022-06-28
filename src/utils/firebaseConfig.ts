import {useEffect} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

type ConfigKey = 'token_bridge_test'; // | 'other_config_keys'

export function useActivateFirebaseConfig() {
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        token_bridge_test: '',
      })
      .then(() => {
        remoteConfig().fetchAndActivate();
      });
  }, []);
}

export function getRemoteConfig(configKey: ConfigKey) {
  return JSON.parse(remoteConfig().getValue(configKey).asString());
}
