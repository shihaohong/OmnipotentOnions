import React from 'react';
import ReactDOM from 'react-dom';

import { Segment } from 'semantic-ui-react';

import Groups from '../containers/groups';
import Channels from '../containers/channels';
import Messages from '../containers/messages';

const Main = ({}) => (
  <div>
    <h1>Welcome to Connect, user</h1>
    <Segment.Group horizontal>
      <Segment><Groups /></Segment>
      <Segment><Channels /></Segment>
      <Segment><Messages /></Segment>
    </Segment.Group>
  </div>
);

export default Main;