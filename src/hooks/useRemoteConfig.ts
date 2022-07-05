import {useState, useEffect, useCallback} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

type ConfigKey = 'token_bridge_test'; // | 'other_config_keys'

export function useRemoteConfig() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const activateFirebaseConfig = async () => {
      await remoteConfig().setDefaults({token_bridge_test: ''});
      await remoteConfig().fetchAndActivate();
      setIsActive(true);
    };

    activateFirebaseConfig().catch(console.error);
  }, []);

  const getValue = useCallback(
    (configKey: ConfigKey) => {
      if (isActive) {
        return JSON.parse(remoteConfig().getValue(configKey).asString());
      }
    },
    [isActive],
  );

  return {
    getValue,
  };
}
