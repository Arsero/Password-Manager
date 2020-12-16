import { SetSelectedAccount } from './../actions/actions';
import * as actions from '../actions/actions';
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

const update = (state, mutations) => Object.assign({}, state, mutations);

const reducer = (state: State = initialState, action: any) => {
  const serviceAccount = state.serviceAccount;
  let accounts: Account[];

  switch (action.type) {
    case actions.LOGIN:
      let isLogged;

      try {
        serviceAccount.secret = action.payload;
        accounts = serviceAccount.Load(action.payload);
        isLogged = true;
      } catch (error) {
        accounts = [];
        isLogged = false;
      }

      state = update(state, {
        isLogged: isLogged,
        secret: action.payload,
        accounts: accounts,
      });

      break;

    case actions.REGISTER:
      serviceAccount.secret = action.payload;
      serviceAccount.Commit();

      state = update(state, {
        ...state,
        isLogged: true,
        secret: action.payload,
      });

      break;

    case actions.ADD_ACCOUNT:
      accounts = serviceAccount.Add(action.payload);
      state = update(state, { accounts: accounts });
      break;

    case actions.UPD_ACCOUNT:
      accounts = serviceAccount.Update(action.payload);
      state = update(state, { accounts: accounts, selectedAccount: null });
      break;

    case actions.DEL_ACCOUNT:
      accounts = serviceAccount.Delete(action.payload);
      state = update(state, { accounts: accounts });
      break;

    case actions.SELECT_ACCOUNT:
      state = update(state, { selectedAccount: action.payload });
      return {
        ...state,
        selectedAccount: action.payload,
      };
      break;

    case actions.COPY_PWD:
      let pwd = state.accounts.find((a) => a.id === action.payload).password;
      if (pwd !== undefined) {
        navigator.clipboard.writeText(pwd);
      }

      return state;

    default:
  }

  return state;
};

export default reducer;
