import Account from './account';
import ServiceAccount from '../db/ServiceAccount';

export default interface State {
  secret: string;
  serviceAccount: ServiceAccount;
  accounts: Account[];
  isLogged: boolean;
  selectedAccount: Account;
}
