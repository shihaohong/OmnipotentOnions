import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './main';
import Profile from './profile';

const Router = () => (
  <div>
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>                   
    </Switch>
  </div>
);

export default Router;

