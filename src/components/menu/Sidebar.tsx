import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Form, Row } from 'react-bootstrap';

export const Sidebar = ({ Close }: any) => {
	const history = useHistory();

	return (
		<Container style={{ width: '50%', marginTop: '90%' }}>
			<Form>
				<Row>
					<Button
						variant='outline-light'
						style={{ marginBottom: '30px', width: '100%' }}
						onClick={(event) => {
							Close();
							event.preventDefault();
							const location = {
								pathname: '/account',
							};
							history.push(location);
						}}
					>
						Add an account
					</Button>
				</Row>
				<Row>
					<Button
						variant='outline-light'
						style={{ width: '100%' }}
						onClick={(event) => {
							Close();
							event.preventDefault();
							const location = {
								pathname: '/secret',
							};
							history.push(location);
						}}
					>
						Update secret
					</Button>
				</Row>
			</Form>
		</Container>
	);
};
