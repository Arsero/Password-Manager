import {
  LOGIN,
  REGISTER,
  ADD_ACCOUNT,
  DEL_ACCOUNT,
  UPD_ACCOUNT,
  SELECT_ACCOUNT,
  GET_ACCOUNT,
} from '../actions/actions';
import ServiceAccount from '../db/ServiceAccount';
import Account from '../models/account';

interface State {
  secret: string;
  serviceAccount: ServiceAccount;
  accounts: Account[];
  isLogged: boolean;
  selectedAccount: string;
  account: Account;
}

const initialState: State = {
  secret: '',
  serviceAccount: new ServiceAccount(),
  accounts: [],
  isLogged: false,
  selectedAccount: '',
  account: null,
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
        console.log(error);
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
      accounts = serviceAccount.Update(action.payload.id, action.payload.value);
      return {
        ...state,
        accounts: accounts,
      };
      break;

    case DEL_ACCOUNT:
      accounts = serviceAccount.Remove(action.payload);
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

    default:
      return state;
  }
};

export default reducer;
