import React from 'react';
import { Route } from 'react-router-dom';
import AccountList from '../components/Account/AccountList';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return { accounts: state.accounts };
};

const AuthenticatedApp = ({ accounts }: any) => {
  return (
    <div className='container'>
      <Route
        path='/accounts'
        render={() => (
          <AccountList
            accounts={accounts}
            deleteAccount={handleDeleteAccount}
            copyPassword={handleCopyPassword}
            selectAccount={handleSelectAccount}
          />
        )}
      />

      <Route
        path={['/createAccount', '/manage/:id']}
        render={() => (
          <AccountForm
            createAccount={handleCreateAccount}
            editAccount={handleEditAccount}
            account={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
        )}
      />
    </div>
  );
};

export default connect(mapStateToProps)(AuthenticatedApp);
