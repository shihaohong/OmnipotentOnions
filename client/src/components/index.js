import React from 'react';

import Groups from '../containers/groups';
import Channels from '../containers/channels';
import Messages from '../containers/messages';

const Main = ({}) => (
  <div>
    <h1>Welcome to Connect, user</h1>
    <Groups />
    <Channels />
    <Messages />
  </div>
);

export default Main;