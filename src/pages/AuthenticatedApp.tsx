import React from 'react';
import { Route } from 'react-router-dom';
import AccountList from '../components/accounts/AccountList';
import AccountForm from '../components/accounts/AccountForm';
import { connect } from 'react-redux';
import { Menu } from '../containers/menu/Menu';
import Register from './Login/Register';

const mapStateToProps = (state: any) => {
  return { accounts: state.accounts };
};

const AuthenticatedApp = ({ accounts }: any) => {
  return (
    <div>
      <Route
        exact
        path='/'
        render={() => (
          <div>
            <Menu />
            <AccountList accounts={accounts} />
          </div>
        )}
      />

      <Route path='/secret' render={() => <Register />} />
      <Route path={'/account'} render={() => <AccountForm />} />
    </div>
  );
};

export default connect(mapStateToProps)(AuthenticatedApp);
