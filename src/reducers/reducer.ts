import * as actions from '../actions/actions';
import ServiceAccount from '../db/ServiceAccount';
import Account from '../models/account';
import State from '../models/state';

const initialState: State = {
  email: '',
  secret: '',
  serviceAccount: new ServiceAccount(),
  accounts: [],
  isLogged: false,
  selectedAccount: null,
  isDataExists: new ServiceAccount().DataExist(),
};

const update = (state: State, mutations: any) =>
  Object.assign({}, state, mutations);

const reducer = (state: State = initialState, action: any) => {
  const serviceAccount = state.serviceAccount;
  let accounts: Account[];

  switch (action.type) {
    case actions.LOGIN:
      let isLogged;

      try {
        serviceAccount.secret = action.payload.secret;
        serviceAccount.email = action.payload.email;
        accounts = serviceAccount.Load(
          action.payload.email,
          action.payload.secret
        );

        isLogged = true;
      } catch (error) {
        accounts = [];
        isLogged = false;
      }

      state = update(state, {
        isLogged: isLogged,
        email: action.payload.email,
        secret: action.payload.secret,
        accounts: accounts,
      });

      break;

    case actions.REGISTER:
      serviceAccount.email = action.payload.email;
      serviceAccount.secret = action.payload.secret;
      serviceAccount.Commit();

      state = update(state, {
        ...state,
        isLogged: true,
        email: action.payload.email,
        secret: action.payload.secret,
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
