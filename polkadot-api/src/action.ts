type WebViewActionPayload = Record<string, unknown>;

export enum ACTION_TYPES {
  INIT_STORE = 'INIT_STORE',
  INIT_KEYRING = 'INIT_KEYRING',
  SET_SS58_FORMAT = 'SET_SS58_FORMAT',
  GENERATE_MNEMONIC = 'GENERATE_MNEMONIC',
  VALIDATE_MNEMONIC = 'VALIDATE_MNEMONIC',
  GET_ACCOUNTS = 'GET_ACCOUNTS',
  GET_ACCOUNT = 'GET_ACCOUNT',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  ADD_ACCOUNT = 'ADD_ACCOUNT',
  RESTORE_ACCOUNT = 'RESTORE_ACCOUNT',
  EXPORT_ACCOUNT = 'EXPORT_ACCOUNT',
  ADD_EXTERNAL_ACCOUNT = 'ADD_EXTERNAL_ACCOUNT',
  FORGET_ACCOUNT = 'FORGET_ACCOUNT',
  VERIFY_CREDENTIALS = 'VERIFY_CREDENTIALS',
  SIGN = 'SIGN',
}

export const getResultType = (type: ACTION_TYPES): `${ACTION_TYPES}_RESULT` => `${type}_RESULT`;

export const initStore = (payload: WebViewActionPayload) => JSON.stringify({type: ACTION_TYPES.INIT_STORE, payload});
export const initKeyring = () => JSON.stringify({type: ACTION_TYPES.INIT_KEYRING});
export const setSS58Format = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.SET_SS58_FORMAT, payload});
export const generateMnemonic = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.GENERATE_MNEMONIC, payload});
export const validateMnemonic = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.VALIDATE_MNEMONIC, payload});
export const getAccounts = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.GET_ACCOUNTS, payload});
export const getAccount = (payload: WebViewActionPayload) => JSON.stringify({type: ACTION_TYPES.GET_ACCOUNT, payload});
export const createAccount = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.CREATE_ACCOUNT, payload});
export const addAccount = (payload: WebViewActionPayload) => JSON.stringify({type: ACTION_TYPES.ADD_ACCOUNT, payload});
export const restoreAccount = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.RESTORE_ACCOUNT, payload});
export const exportAccount = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.EXPORT_ACCOUNT, payload});
export const addExternalAccount = (payload: WebViewActionPayload) =>
  JSON.stringify({
    type: ACTION_TYPES.ADD_EXTERNAL_ACCOUNT,
    payload,
  });
export const forgetAccount = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.FORGET_ACCOUNT, payload});
export const verifyCredentials = (payload: WebViewActionPayload) =>
  JSON.stringify({type: ACTION_TYPES.VERIFY_CREDENTIALS, payload});
export const sign = (payload: WebViewActionPayload) => JSON.stringify({type: ACTION_TYPES.SIGN, payload});
