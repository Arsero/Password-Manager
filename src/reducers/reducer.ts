import {
  LOGIN,
  REGISTER,
  ADD_ACCOUNT,
  DEL_ACCOUNT,
  UPD_ACCOUNT,
  SELECT_ACCOUNT,
  GET_ACCOUNT,
  COPY_PWD,
} from '../actions/actions';
import ServiceAccount from '../db/ServiceAccount';
import Account from '../models/account';

interface State {
  secret: string;
  serviceAccount: ServiceAccount;
  accounts: Account[];
  isLogged: boolean;
  selectedAccount: Account;
}

const initialState: State = {
  secret: '',
  serviceAccount: new ServiceAccount(),
  accounts: [],
  isLogged: false,
  selectedAccount: null,
};

const reducer = (state: State = initialState, action: any) => {
  const serviceAccount = state.serviceAccount;
  let accounts: Account[];

  switch (action.type) {
    case LOGIN:
      let isLogged;

      try {
        serviceAccount.secret = action.payload;
        accounts = serviceAccount.Load(action.payload);
        isLogged = true;
      } catch (error) {
        accounts = [];
        isLogged = false;
      }

      return {
        ...state,
        isLogged: isLogged,
        secret: action.payload,
        accounts: accounts,
      };
      break;

    case REGISTER:
      serviceAccount.secret = action.payload;
      serviceAccount.Commit();
      return {
        ...state,
        isLogged: true,
        secret: action.payload,
      };
      break;

    case ADD_ACCOUNT:
      accounts = serviceAccount.Add(action.payload);
      return {
        ...state,
        accounts: accounts,
      };
      break;

    case UPD_ACCOUNT:
      accounts = serviceAccount.Update(action.payload);
      return {
        ...state,
        accounts: accounts,
        selectedAccount: null,
      };
      break;

    case DEL_ACCOUNT:
      accounts = serviceAccount.Delete(action.payload);
      return {
        ...state,
        accounts: accounts,
      };
      break;

    case SELECT_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload,
      };
      break;

    case GET_ACCOUNT:
      return {
        ...state,
        account: serviceAccount.Get(action.payload),
      };
      break;

    case COPY_PWD:
      let pwd = accounts.find((a) => a.id === action.payload).password;
      if (pwd !== undefined) {
        navigator.clipboard.writeText(pwd);
      }
      return state;
      break;

    default:
      return state;
  }
};

export default reducer;
