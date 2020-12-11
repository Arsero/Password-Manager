import React from 'react';
import AccountList from '../components/Account/AccountList';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return { accounts: state.accounts };
};

const AuthenticatedApp = ({ accounts }: any) => {
  return (
    <div className='container'>
      <AccountList accounts={accounts} />
    </div>
  );
};

export default connect(mapStateToProps)(AuthenticatedApp);
