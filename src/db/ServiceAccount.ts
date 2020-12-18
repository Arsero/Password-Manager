import Account from './../models/account';
import { SaveDB, LoadDB, ExistDB } from './db';
import { appPath } from '../constants/appPath';
import { v4 as uuid } from 'uuid';

class ServiceAccount {
  email: string;
  secret: string;
  accounts: Account[];

  constructor(email: string = '', secret: string = '') {
    this.accounts = [];
    this.email = email;
    this.secret = secret;
  }

  DataExist() {
    return ExistDB(appPath);
  }

  Load(email: string, secret: string) {
    this.email = email;
    this.secret = secret;
    this.accounts = LoadDB(appPath, email, secret);
    return this.accounts;
  }

  Commit() {
    SaveDB(this.accounts, appPath, this.email, this.secret);
  }

  Add(account: Account) {
    let newAccount = { ...account, id: uuid() };
    this.accounts.push(newAccount);
    this.Commit();

    return this.accounts;
  }

  Update(account: Account) {
    this.accounts = this.accounts.filter((a) => a.id !== account.id);
    this.accounts.push(account);

    this.Commit();
    return this.accounts;
  }

  Delete(id: string) {
    this.accounts = this.accounts.filter((a) => a.id !== id);
    this.Commit();
    return this.accounts;
  }

  Get(id: string) {
    return this.accounts.find((a) => a.id === id);
  }
}

export default ServiceAccount;
