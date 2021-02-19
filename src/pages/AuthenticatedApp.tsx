import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import AccountList from '../components/accounts/AccountList';
import AccountForm from '../components/accounts/AccountForm';
import { useSelector } from 'react-redux';
import { Menu } from '../containers/menu/Menu';
import Register from './Login/Register';
import { Notify } from '../containers/notifications/Notification';
import State from '../models/state';

const AuthenticatedApp = () => {
	const accounts = useSelector((state: State) => state.accounts);

	useEffect(() => {
		Notify('✔️ Connected !');
	}, []);

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

export default AuthenticatedApp;
