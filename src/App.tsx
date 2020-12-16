import * as React from 'react';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';
import State from './models/state';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';

const App = () => {
  const isLogged = useSelector((state: State) => state.isLogged);

  return <div>{isLogged ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
};

export default hot(module)(App);
