import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { Trash, PencilSquare, Files } from 'react-bootstrap-icons';
import { Notify } from '../../containers/notifications/Notification';
import Account from '../../models/account';
import * as actions from '../../actions/actions';
import './styles.css';

interface Props {
	accounts: Account[];
}

const AccountList: React.FC<Props> = ({ accounts }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<Container
			style={{ marginTop: '5em', width: '80%', minWidth: '800px' }}
		>
			<Table responsive hover>
				<thead>
					<tr>
						<th>Website</th>
						<th>Email address</th>
						<th>Username</th>
						<th style={{ textAlign: 'center' }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{accounts
						.sort((a: Account, b: Account) =>
							a.website < b.website ? -1 : 1
						)
						.map((account: Account) => (
							<tr key={account.id}>
								<td>{account.website}</td>
								<td>{account.email}</td>
								<td>{account.username}</td>
								<td style={{ textAlign: 'center' }}>
									<Button
										style={{
											marginRight: '10px',
											padding: '5px',
											paddingTop: '3px',
										}}
										variant='outline-dark'
										title='Copy'
										className='td-button'
										size='sm'
										onClick={() => {
											dispatch(
												actions.CopyPassword(account.id)
											);
											Notify('✔️ Password copied !');
										}}
									>
										<Files size={18} />
									</Button>
									<Button
										variant='outline-dark'
										style={{
											marginRight: '10px',
											padding: '5px',
											paddingTop: '3px',
										}}
										title='Edit'
										className='td-button'
										size='sm'
										onClick={(event) => {
											dispatch(
												actions.SelectAccount(account)
											);

											event.preventDefault();
											const location = {
												pathname: `/account`,
											};
											history.push(location);
										}}
									>
										<PencilSquare size={18} />
									</Button>
									<Button
										variant='outline-danger'
										size='sm'
										title='Delete'
										className='td-button'
										style={{
											padding: '5px',
											paddingTop: '3px',
										}}
										onClick={() => {
											dispatch(
												actions.DeleteAccount(
													account.id
												)
											);
											Notify('✔️ Account deleted !');
										}}
									>
										<Trash size={18} />
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</Container>
	);
};

export default AccountList;
