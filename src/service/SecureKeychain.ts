import {Platform} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {encrypt, decrypt} from 'src/service/Encryptor';
import {mmkvStorage} from 'src/service/MMKVStorage';

const SALT = '878adee00edb0a46c2ba33a7c8feaa2a40389f1c';
const SELECTED_ACCESS_CONTROL = 'selected_access_control';

const accessControlTypes = {
  BIOMETRICS: 'BIOMETRICS',
  PASSCODE: 'PASSCODE',
  REMEMBER_ME: 'REMEMBER_ME',
};

const defaultOptions = {
  service: 'com.litentry',
  authenticationPromptTitle: 'Authentication required',
  authenticationPrompt: {title: 'Please authenticate in order to use Litentry App'},
  authenticationPromptDesc: 'Please authenticate in order to use Litentry App',
  fingerprintPromptTitle: 'Authentication required',
  fingerprintPromptDesc: 'Use your fingerprint to unlock Litentry App',
  fingerprintPromptCancel: 'Cancel',
};

function encryptPassword(password: string) {
  return encrypt(SALT, {password});
}

function decryptPassword(password: string) {
  return decrypt<{password: string}>(SALT, password);
}

async function getSupportedBiometryType() {
  return Keychain.getSupportedBiometryType();
}

async function resetGenericPassword() {
  mmkvStorage.delete(SELECTED_ACCESS_CONTROL);

  return Keychain.resetGenericPassword({service: defaultOptions.service});
}

async function getGenericPassword() {
  const userCredentials = await Keychain.getGenericPassword();

  if (!userCredentials) {
    return null;
  }

  const {password} = await decryptPassword(userCredentials.password);
  userCredentials.password = password;

  return userCredentials;
}

async function setGenericPassword(password: string, type: keyof typeof accessControlTypes) {
  const authOptions: Keychain.Options = {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  };

  if (type === accessControlTypes.BIOMETRICS) {
    authOptions.accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET;
  } else if (type === accessControlTypes.PASSCODE) {
    authOptions.accessControl = Keychain.ACCESS_CONTROL.DEVICE_PASSCODE;
  } else if (type === accessControlTypes.REMEMBER_ME) {
    //Don't need to add any parameter
  } else {
    // Setting a password without a type does not save it
    return await resetGenericPassword();
  }

  const encryptedPassword = await encryptPassword(password);
  await Keychain.setGenericPassword('litentry-user', encryptedPassword, {...defaultOptions, ...authOptions});

  if (type === accessControlTypes.BIOMETRICS) {
    mmkvStorage.set(SELECTED_ACCESS_CONTROL, accessControlTypes.BIOMETRICS);
    // If the user enables biometrics, we're trying to read the password
    // immediately so we get the permission prompt
    if (Platform.OS === 'ios') {
      await getGenericPassword();
    }
  } else if (type === accessControlTypes.PASSCODE) {
    mmkvStorage.set(SELECTED_ACCESS_CONTROL, accessControlTypes.PASSCODE);
  } else if (type === accessControlTypes.REMEMBER_ME) {
    mmkvStorage.set(SELECTED_ACCESS_CONTROL, accessControlTypes.REMEMBER_ME);
  }
}

export const SecureKeychain = {
  getSupportedBiometryType,
  resetGenericPassword,
  getGenericPassword,
  setGenericPassword,
};
