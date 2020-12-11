import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { Header } from './components/Header/Header';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Header />
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
