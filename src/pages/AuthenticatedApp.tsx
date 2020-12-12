import React from 'react';
import { Route } from 'react-router-dom';
import AccountList from '../components/accounts/AccountList';
import AccountForm from '../components/accounts/AccountForm';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return { accounts: state.accounts };
};

const AuthenticatedApp = ({ accounts }: any) => {
  return (
    <div className='container'>
      <Route path='/' render={() => <AccountList accounts={accounts} />} />

      <Route path={['/account']} render={() => <AccountForm />} />
    </div>
  );
};

export default connect(mapStateToProps)(AuthenticatedApp);
