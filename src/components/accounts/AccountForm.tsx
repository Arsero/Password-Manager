import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/actions';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { Notify } from '../../containers/notifications/Notification';
import CryptUtils from '../../utils/CryptUtils';
import Account from '../../models/account';
import State from '../../models/state';
import './styles.css';

const AccountForm = () => {
	const history = useHistory();
	const selectedAccount: Account = useSelector(
		(state: State) => state.selectedAccount
	);
	const dispatch = useDispatch();

	const initializeForm = () => {
		if (selectedAccount) return selectedAccount;
		else {
			return {
				id: '',
				website: '',
				email: '',
				username: '',
				password: '',
				comment: '',
			};
		}
	};

	const [account, setAccount] = useState<Account>(initializeForm);

	const handleSubmit = (event) => {
		if (selectedAccount) {
			dispatch(actions.UpdateAccount(account));
			Notify('✔️ Account updated !');
		} else {
			dispatch(actions.AddAccount(account));
			Notify('✔️ Account added !');
		}

		event.preventDefault();
		const location = {
			pathname: '/',
		};
		history.push(location);
	};

	const handleInputChange = (event: any) => {
		const { name, value } = event.currentTarget;
		setAccount({ ...account, [name]: value });
	};

	return (
		<Container
			style={{ marginTop: '5em', width: '70%', maxWidth: '800px' }}
		>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='website'>
					<Form.Label>Website</Form.Label>
					<Form.Control
						type='text'
						name='website'
						placeholder='Enter a website'
						onChange={handleInputChange}
						value={account.website}
						required
					/>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						name='email'
						placeholder='name@example.com'
						onChange={handleInputChange}
						value={account.email}
						required
					/>
				</Form.Group>
				<Form.Group controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						name='username'
						placeholder='Enter a username'
						onChange={handleInputChange}
						value={account.username}
						required
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Row>
						<Col>
							<Form.Control
								type='password'
								name='password'
								placeholder='Enter a password'
								onChange={handleInputChange}
								value={account.password}
								required
							/>
						</Col>
						<Col>
							<Button
								type='button'
								variant='outline-dark'
								block
								onClick={() => {
									setAccount({
										...account,
										password: CryptUtils.generatePassword(
											10
										),
									});
								}}
							>
								Generate password
							</Button>
						</Col>
					</Row>
				</Form.Group>
				<Row style={{ marginTop: '30px' }}>
					<Col>
						<Button type='submit' variant='dark' block>
							{selectedAccount ? (
								<span>Edit account</span>
							) : (
								<span>Add account</span>
							)}
						</Button>
					</Col>
					<Col>
						<Button
							variant='outline-danger'
							type='button'
							block
							onClick={(event) => {
								dispatch(actions.SelectAccount(null));

								event.preventDefault();
								const location = {
									pathname: '/',
								};
								history.push(location);
							}}
						>
							Cancel
						</Button>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default AccountForm;
