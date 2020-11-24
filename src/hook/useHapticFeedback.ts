import ReactNativeHapticFeedback, {
  HapticFeedbackTypes as RNHapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import {HapticFeedbackType} from 'src/types';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const internalTypeMap = {
  success: 'notificationSuccess',
  warn: 'notificationWarning',
  error: 'notificationError',
};

function useHapticFeedback() {
  function trigger(type: HapticFeedbackType) {
    const hapticType = internalTypeMap[type] as RNHapticFeedbackTypes;
    ReactNativeHapticFeedback.trigger(hapticType, options);
  }

  return trigger;
}

export default useHapticFeedback;
