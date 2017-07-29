import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import OneGroupReducer from './reducer_group';
import GroupReducer from './reducer_groups';
import GroupsReducer from './reducer_groups';
import JoinGroupReducer from './reducer_join_group.js';
import ChannelsReducer from './reducer_channels';
import MessagesReducer from './reducer_messages';
import ProfileReducer from './reducer_profile';
import FriendsReducer from './reducer_friends';
import PendingReducer from './reducer_pending';
import FriendRequestsReducer from './reducer_requests';
import EventsReducer from './reducer_events';
import AttendanceReducer from './reducer_events';
import EventReducer from './reducer_event';

const rootReducer = combineReducers({
  form: formReducer,
  oneGroup: OneGroupReducer,
  group: GroupReducer,
  groups: GroupsReducer,
  joinGroup: JoinGroupReducer,
  channels: ChannelsReducer,
  messages: MessagesReducer,
  profile: ProfileReducer,
  friends: FriendsReducer,
  pending: PendingReducer,
  requests: FriendRequestsReducer,
  events: EventsReducer,
  attendees: AttendanceReducer,
  event: EventReducer
});

export default rootReducer;