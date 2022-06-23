type WebViewActionPayload = Record<string, unknown>;

export enum ACTION_TYPE {
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
  TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
  VERIFY_CREDENTIALS = 'VERIFY_CREDENTIALS',
  SIGN = 'SIGN',
}

type Action = {
  getAction: (payload?: WebViewActionPayload) => string;
  type: ACTION_TYPE;
  resultType: `${ACTION_TYPE}_RESULT`;
};

const createAction = (type: ACTION_TYPE): Action => ({
  getAction: (payload?: WebViewActionPayload) => JSON.stringify({type, payload}),
  type,
  resultType: `${type}_RESULT`,
});

export const initStore = createAction(ACTION_TYPE.INIT_STORE);
export const initKeyring = createAction(ACTION_TYPE.INIT_KEYRING);
export const setSS58Format = createAction(ACTION_TYPE.SET_SS58_FORMAT);
export const generateMnemonic = createAction(ACTION_TYPE.GENERATE_MNEMONIC);
export const validateMnemonic = createAction(ACTION_TYPE.VALIDATE_MNEMONIC);
export const getAccounts = createAction(ACTION_TYPE.GET_ACCOUNTS);
export const getAccount = createAction(ACTION_TYPE.GET_ACCOUNT);
export const createAccount = createAction(ACTION_TYPE.CREATE_ACCOUNT);
export const addAccount = createAction(ACTION_TYPE.ADD_ACCOUNT);
export const restoreAccount = createAction(ACTION_TYPE.RESTORE_ACCOUNT);
export const exportAccount = createAction(ACTION_TYPE.EXPORT_ACCOUNT);
export const addExternalAccount = createAction(ACTION_TYPE.ADD_EXTERNAL_ACCOUNT);
export const forgetAccount = createAction(ACTION_TYPE.FORGET_ACCOUNT);
export const toggleFavorite = createAction(ACTION_TYPE.TOGGLE_FAVORITE);
export const verifyCredentials = createAction(ACTION_TYPE.VERIFY_CREDENTIALS);
export const sign = createAction(ACTION_TYPE.SIGN);
