import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import OneGroupReducer from './reducer_groups';
import GroupsReducer from './reducer_groups';
import JoinGroupReducer from './reducer_join_group.js';
import ChannelsReducer from './reducer_channels';
import MessagesReducer from './reducer_messages';
import ProfileReducer from './reducer_profile';
import FriendsReducer from './reducer_friends';
import PendingReducer from './reducer_pending';
import FriendRequestsReducer from './reducer_requests';
import EventsReducer from './reducer_events';

const rootReducer = combineReducers({
  form: formReducer,
  group: OneGroupReducer,
  groups: GroupsReducer,
  joinGroup: JoinGroupReducer,
  channels: ChannelsReducer,
  messages: MessagesReducer,
  profile: ProfileReducer,
  friends: FriendsReducer,
  pending: PendingReducer,
  requests: FriendRequestsReducer,
  events: EventsReducer
});

export default rootReducer;