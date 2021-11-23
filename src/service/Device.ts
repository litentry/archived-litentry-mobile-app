import {Platform} from 'react-native';
import Device from 'react-native-device-info';
import {DeviceType} from 'src/types';

export const create = (userId: number, token: string, enableNotification = true): DeviceType => {
  const device = {
    firebase_token: token,
    device_model: Device.getDeviceId(),
    device_identifier: Device.getUniqueId(),
    owner: userId,
    notifications_enabled: enableNotification,
    operating_system: Platform.OS === 'ios' ? 2 : 1,
    operating_system_version: Platform.OS ? 'ios' : 'android',
    app_version: Device.getReadableVersion(),
    app_bundle_id: Device.getBundleId(),
  };

  return device;
};

export const getDeviceId = () => Device.getUniqueId();
export const getReadableVersion = () => {
  const code = Platform.OS === 'ios' ? ` (${Device.getBuildNumber()})` : '';
  return `${Device.getVersion()}${code}`;
};

export const appVersion = () => `${Device.getVersion()} [${Device.getBuildNumber()}]`;
