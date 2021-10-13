import {Platform} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {encrypt, decrypt} from 'src/service/Encryptor';
import {mmkvStorage} from 'src/service/MMKVStorage';

const SALT = 'secret_phrase';
const BIOMETRY_CHOICE = 'biometry_choice';
const BIOMETRY_CHOICE_DISABLED = 'biometry_choice_disabled';
const PASSCODE_CHOICE = 'passcode_choice';
const PASSCODE_DISABLED = 'passcode_choice_disabled';
const TYPES = {
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
  mmkvStorage.delete(BIOMETRY_CHOICE);
  mmkvStorage.delete(PASSCODE_CHOICE);

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

async function setGenericPassword(password: string, type: keyof typeof TYPES) {
  const authOptions: Keychain.Options = {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  };

  if (type === TYPES.BIOMETRICS) {
    authOptions.accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET;
  } else if (type === TYPES.PASSCODE) {
    authOptions.accessControl = Keychain.ACCESS_CONTROL.DEVICE_PASSCODE;
  } else if (type === TYPES.REMEMBER_ME) {
    //Don't need to add any parameter
  } else {
    // Setting a password without a type does not save it
    return await resetGenericPassword();
  }

  const encryptedPassword = await encryptPassword(password);
  await Keychain.setGenericPassword('litentry-user', encryptedPassword, {...defaultOptions, ...authOptions});

  if (type === TYPES.BIOMETRICS) {
    mmkvStorage.set(BIOMETRY_CHOICE, true);
    mmkvStorage.set(PASSCODE_DISABLED, true);
    mmkvStorage.delete(PASSCODE_CHOICE);
    mmkvStorage.delete(BIOMETRY_CHOICE_DISABLED);

    // If the user enables biometrics, we're trying to read the password
    // immediately so we get the permission prompt
    if (Platform.OS === 'ios') {
      await getGenericPassword();
    }
  } else if (type === TYPES.PASSCODE) {
    mmkvStorage.delete(BIOMETRY_CHOICE);
    mmkvStorage.delete(PASSCODE_DISABLED);
    mmkvStorage.set(PASSCODE_CHOICE, true);
    mmkvStorage.set(BIOMETRY_CHOICE_DISABLED, true);
  } else if (type === TYPES.REMEMBER_ME) {
    mmkvStorage.delete(BIOMETRY_CHOICE);
    mmkvStorage.delete(PASSCODE_CHOICE);
    mmkvStorage.set(PASSCODE_DISABLED, true);
    mmkvStorage.set(BIOMETRY_CHOICE_DISABLED, true);
  }
}

export const SecureKeychain = {
  getSupportedBiometryType,
  resetGenericPassword,
  getGenericPassword,
  setGenericPassword,
};
