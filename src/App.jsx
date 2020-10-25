import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Header } from './components/Header/Header';

const App = () => (
  <div>
    <Header />
  </div>
);

export default hot(module)(App);
