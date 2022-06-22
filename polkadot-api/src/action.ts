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
  TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
  VERIFY_CREDENTIALS = 'VERIFY_CREDENTIALS',
  SIGN = 'SIGN',
}

type Action = {
  getAction: (payload?: WebViewActionPayload) => string;
  type: ACTION_TYPES;
  resultType: `${ACTION_TYPES}_RESULT`;
};

const createAction = (type: ACTION_TYPES): Action => ({
  getAction: (payload?: WebViewActionPayload) => JSON.stringify({type, payload}),
  type,
  resultType: `${type}_RESULT`,
});

export const initStore = createAction(ACTION_TYPES.INIT_STORE);
export const initKeyring = createAction(ACTION_TYPES.INIT_KEYRING);
export const setSS58Format = createAction(ACTION_TYPES.SET_SS58_FORMAT);
export const generateMnemonic = createAction(ACTION_TYPES.GENERATE_MNEMONIC);
export const validateMnemonic = createAction(ACTION_TYPES.VALIDATE_MNEMONIC);
export const getAccounts = createAction(ACTION_TYPES.GET_ACCOUNTS);
export const getAccount = createAction(ACTION_TYPES.GET_ACCOUNT);
export const createAccount = createAction(ACTION_TYPES.CREATE_ACCOUNT);
export const addAccount = createAction(ACTION_TYPES.ADD_ACCOUNT);
export const restoreAccount = createAction(ACTION_TYPES.RESTORE_ACCOUNT);
export const exportAccount = createAction(ACTION_TYPES.EXPORT_ACCOUNT);
export const addExternalAccount = createAction(ACTION_TYPES.ADD_EXTERNAL_ACCOUNT);
export const forgetAccount = createAction(ACTION_TYPES.FORGET_ACCOUNT);
export const toggleFavorite = createAction(ACTION_TYPES.TOGGLE_FAVORITE);
export const verifyCredentials = createAction(ACTION_TYPES.VERIFY_CREDENTIALS);
export const sign = createAction(ACTION_TYPES.SIGN);
