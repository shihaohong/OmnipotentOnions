import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

import Router from './components/router';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => (
  <Provider store={createStoreWithMiddleware(reducers, {}, enhancers)}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
