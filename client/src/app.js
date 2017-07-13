import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Login from './components/Login/index.js';
import Main from './components/Main/index.js';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login}/>
      <Route path="/Main" component={Main} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<Routes />, document.getElementById('App'));
