import Account from '../models/account';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const UPD_ACCOUNT = 'UPD_ACCOUNT';
export const DEL_ACCOUNT = 'DEL_ACCOUNT';
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';
export const COPY_PWD = 'COPY_PWD';

export const Login = (secret: string) => ({ type: LOGIN, payload: secret });

export const Register = (secret: string) => ({
  type: REGISTER,
  payload: secret,
});

export const AddAccount = (account: Account) => ({
  type: ADD_ACCOUNT,
  payload: account,
});

export const UpdateAccount = (account: Account) => ({
  type: UPD_ACCOUNT,
  payload: account,
});

export const DeleteAccount = (id: string) => ({
  type: DEL_ACCOUNT,
  payload: id,
});

export const SetSelectedAccount = (account: Account) => ({
  type: SELECT_ACCOUNT,
  payload: account,
});

export const CopyPassword = (id: string) => ({ type: COPY_PWD, payload: id });
