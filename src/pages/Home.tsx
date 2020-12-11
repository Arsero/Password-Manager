import React from 'react';
import { AccountList } from '../components/Account/AccountList';
import Account from '../models/account';

export const Home = () => {
  return (
    <div className='container'>
      <AccountList accounts={accounts} />
    </div>
  );
};
