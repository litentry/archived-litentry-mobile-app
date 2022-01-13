import {Aes} from 'react-native-aes-crypto';

interface EncryptedData {
  cipher: string;
  iv: string;
  salt: string;
}

async function generateSalt() {
  return Aes.randomKey(32);
}

async function generateKeyFromPassword(password: string, salt: string) {
  return Aes.pbkdf2(password, salt, 5000, 256);
}

async function encryptWithKey(text: string, key: string) {
  const iv = await Aes.randomKey(16);
  const encryptedData = await Aes.encrypt(text, key, iv, 'aes-256-cbc');

  return {cipher: encryptedData, iv};
}

async function decryptWithKey(encryptedData: EncryptedData, key: string) {
  return Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');
}

/**
 * Encrypts an object using a password (AES encryption with native libraries)
 *
 * @example
 * const encryptedData = await encrypt('secret', { data: 'data' });
 *
 */
export async function encrypt(password: string, data: Record<string, unknown>) {
  const salt = await generateSalt();
  const key = await generateKeyFromPassword(password, salt);
  const result = await encryptWithKey(JSON.stringify(data), key);

  return JSON.stringify({...result, salt});
}

/**
 * Decrypts an encrypted object (encryptedString) using a password (AES decryption with native libraries)
 */
export async function decrypt<Data>(password: string, encryptedString: string): Promise<Data> {
  const encryptedData = JSON.parse(encryptedString);

  if ('salt' in encryptedData && 'cipher' in encryptedData && 'iv' in encryptedData) {
    const key = await generateKeyFromPassword(password, encryptedData.salt);
    const data = await decryptWithKey(encryptedData, key);

    return JSON.parse(data);
  }

  throw new Error('The data cannot be decrypted');
}
