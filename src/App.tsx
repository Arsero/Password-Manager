import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';

const mapStateToProps = (state: any) => {
  return { isLogged: state.isLogged };
};

const App = ({ isLogged }: any) => {
  return <div>{isLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
};

export default hot(module)(connect(mapStateToProps)(App));
